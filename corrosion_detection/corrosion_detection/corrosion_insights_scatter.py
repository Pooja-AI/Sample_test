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
class IScatter:
    def __init__(self,plant_id,asset_id,corrosion_type):
        
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

    def iscatter(self):
        sys_msg = """
                    Begin!

                            Relevant pieces of previous conversation:
                            input information: {plant}, {asset_id},{corrosion_type}
                            (You do not need to use these pieces of information if not relevant)
                    Thought:
                            Yor are a helpful Corrosion Resolution recommendation assistant.
                            
                            Some help about the details of the concerned database from where you will fetch the data
                            Please use only the following two tables for fetching the answers
                            - Name of the table : Columns in the database
                            - asset_data : ActionsTaken,ApprovalBy,AssetID,CorrosionType,    Cost,Description,Downtime,IncidentDate,InspectionReport,MaintenanceTeam,MaterialsUsed,my_row_id,PreventiveMeasures,RootCauseAnalysis,Severity,ShortDescription,Status,WorkOrderNumber
                            - equipment: my_row_id,PlantID,AssetID,Asset,Fluid,InstallationDate,Size,Material,CoatingType,OperatingPressure,LastInspectionDate

                            If the Corrosion type and plant are given in user question please use them in the query, if blank then please ignore.
                            When question is asked by user , you can use the data from the above tables.
                            
                            ###Details required for creating the scatter chart###
                            Type of graph : Scatter Chart
                            X-Axis : Downtime values from asset_data table
                            Y-Axis : Cost from asset_data table.
                            Please fetch the following details from asset_data table for creating scatter chart graph:
                            Rename the corrosion types based on the following :
                                        Atmospheric Corrosion : Atmospheric Corrosion,General Rust, Localized Rust , Surface Rust 
                                        Pitting Corrosion : Pitting Corrosion ,Localized Pitting,  Pitting
                                        Erosion Corrosion : Erosion Corrosion, Erosion
                                        Fatigue Corrosion : Fatigue Corrosion,Fatigue
                                        Stress Corrosion : Stress Corrosion, Stress , Routine Inspection
                            Rename the Severity types based on the following :
                                        High : High
                                        Low : Low
                                        Moderate : Moderate
                                        - : No Severity
                            ###Details required for creating the scatter chart ###
                                Please fetch the following details from asset_data table for creating corrosion severity impact:
                                    For plotting this scatter chart , we will have the downtime on X-axis and cost on Y-axis.
                                    The downtime values will be fetched from the table
                                    We need the cost occurring over the given period of time.
                                    Please include the severity from the asset_data table for the given corrosion in the output.
                                    Please group the data by Severity column and calculate the sum for the downtime and the cost for given severity type.
                                    Please use the suitable type of aggregation for the above data when presenting the output.
                                    Please do not LIMIT the answer to top entries , present full output.
                                    Please present answer only for the given corrosion type.
                                    If the Severity, Downtime and Cost are same , then print them only once in the output.
                                    
                            ###Additional details required for analysis###
                            You also need to write down 6-7 lines about the analysis you will make regarding the data you just fetched.
                            The analysis may be analytical analysis or maybe related to any technical details that you observe in the fetched data.
                            In technical details about the corrosion , you may try to relate the cost and the downtime days.
                            Please include analysis on the varying degree of severity over years and the cost associated with it.
                            You may also try to include statistical analysis.
                            You may also try to relate the type of corrosion and the cost over the years.
                            Try using table details majorly focusing on columns downtime,cost and year.
                            Please present this answer in form of bullet points at the end of the the JSON answer that you primarily provide.
                            

                            ##  MUST DO while displaying FINAL ANSWER: Keep your Answers short, crisp and to the point ##
                            Please present the requested details in answer in form of JSON output as follows: 
                            User should not get any error when using the JSON or during JSON serializing.
                            Please present answer in format of the below example answer.
                                Be consistent with the output format for JSON.
                                The total downtime should always be an float value.
                                ###EXAMPLE ANSWER###
                                    {{
                                        "Scatter Chart Data": [
                                        {{
                                                "Corrosion Type": "Pitting Corrosion",
                                                "Severity": "Moderate",
                                                "Total Cost": "22300.00",
                                                "Total Downtime": 10.0
                                        }}
                                    ],"Analysis": [ ]}}
                            Please present confidence score in percentage denoting your surity about the answer you gave.
                            Here is the question.
                            Question: {question}
                            Answer: 
                """
        prompt = PromptTemplate(template=sys_msg, input_variables=["plant", "asset_id", "corrosion_type", "question"])
        ques = 'can you present me the details for plotting a scatter chart for given asset id and analysis for it.'
        plant = ''
        try:
           ans = self.db_chain.run(prompt.format_prompt(question=ques, plant=plant, asset_id=self.asset_id, corrosion_type=self.corrosion_type))
           logger.info(f"after llm scatter {ans}")
           ans=json.loads(ans)
           logger.info(f"after jsonloads scatter {ans}")
           return ans
        except Exception as e:
            ans=e
            return ans
