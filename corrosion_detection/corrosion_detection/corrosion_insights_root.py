import pandas as pd
import pymysql
import json
from langchain.agents import *
from typing import Union
from langchain import PromptTemplate  # , SQLDatabaseChain
from langchain_experimental.sql import SQLDatabaseChain
from langchain.tools import BaseTool
# from corrosion_severity import severity
# from WO_order import Severity_MW_table
from langchain.sql_database import SQLDatabase
from langchain.chat_models import ChatOpenAI, AzureChatOpenAI
import urllib.parse
import os
from log import LoggerFactory

logger = LoggerFactory.get_logger(__name__, log_level="INFO")
class IRoot:
    def __init__(self,asset_id,plant_id,corrosion_type):
        
        with open("global_config.json","r")as fb:
            self.global_config=json.load(fb)
        with open("config.json","r")as f:
            self.path=json.load(f)
        self.db_user = self.global_config['db_user']
        self.db_password = self.global_config['db_password']
        self.encoded_password = urllib.parse.quote_plus(self.db_password)
        self.db_host = self.global_config['db_host']
        self.db_name = 'corrosion_2'
        self.ssl_ca = self.path['cert_path']
        print(self.ssl_ca)
        self.llm = AzureChatOpenAI(deployment_name=self.global_config['model_name'],
                      model_name=self.global_config['model_name'],
                      openai_api_base=self.global_config['openai_api_base'],
                      openai_api_version=self.global_config['openai_api_version'],
                      openai_api_key=self.global_config['openai_api_key'],
                      temperature=0)
       
        self.plant=plant_id
        print(self.plant)
        self.asset_id=asset_id
        print(self.asset_id)
        self.corrosion_type=corrosion_type
        print(self.corrosion_type)
        
        self.db = SQLDatabase.from_uri(database_uri=f"mysql+pymysql://{self.db_user}:{self.db_password}@{self.db_host}/{self.db_name}?ssl_ca={self.ssl_ca}")
        self.db_chain = SQLDatabaseChain.from_llm(self.llm, self.db, verbose=True)
        self.TOKEN_FILE_NAME = 'token_count.json'
        self.TOKEN_COST_PER_K = 0.002

    def iroot(self):
        sys_msg = """Assistant is a helpful Corrosion Resolution recommendation assistant.
        Some help about the details of the concerned database from where you will fetch the data
        Please use only the following two tables for fetching the answers
        - Name of the table : Columns in the database
        - asset_data : ActionsTaken,ApprovalBy,AssetID,CorrosionType,    
        Cost,Description,Downtime,IncidentDate,InspectionReport,MaintenanceTeam,MaterialsUsed,my_row_id,
        PreventiveMeasures,RootCauseAnalysis,Severity,ShortDescription,Status,WorkOrderNumber
        - equipment: my_row_id,PlantID,AssetID,Asset,Fluid,InstallationDate,Size,Material,CoatingType,
        OperatingPressure,LastInspectionDate

        Question: Based on the {asset_id}, {plant} and {corrosion_type}
        Provide the Root cause analysis in the form of bullet points,
        Also provide the Preventive measure in the form of bullet points.
        User should not get any error when using the JSON or during JSON serializing.
        Please present answer in format of the below example answer.
        Be consistent with the output format for JSON. 
        ###EXAMPLE ANSWER###
            {{"Root Case Analysis": ["Atmospheric corrosion",
            "- High moisture content in teh environment,leading to internal corrosion",
            "-improper chemical composition in the transported fluid, causing internal corrosion"],
            "Remedial Measures": ["Atmospheric corrosion",
            "- implement corrosion-resistent coating on the interior and exterior of the pipes",
            "- Maintain a low moisture content environment for the pipeline to prevent internal corrosion"]
            }}
        You should answer in a descriptive manner.
        Answer: 
        """
        prompt = PromptTemplate(template=sys_msg, input_variables=["plant", "asset_id", "corrosion_type"])
        ques = 'can you present me the details for plotting a scatter chart for given asset id and also present the analysis of it'
        try:
           plant = ''
           ans = self.db_chain.run(prompt.format_prompt( plant=plant, asset_id=self.asset_id, corrosion_type=self.corrosion_type))
           logger.info(f"after llm rootcause {ans}")
           ans=json.loads(ans)
           logger.info(f"after jsonload rootcause {ans}")
           return ans
        except Exception as e:
            ans=e
            return ans
