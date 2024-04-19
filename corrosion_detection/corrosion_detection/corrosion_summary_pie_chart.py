import pandas as pd
import pymysql
import json
import ast
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
class Pie:
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

    def pie(self):
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

                When question is asked by user , you can use the data from the above tables.

               ###Details required for creating the graph###
                Type of graph : Pie Chart
                The cost values will be fetched from the asset_data table.
                Rename the corrosion types based on the following :
                    Atmospheric Corrosion : General Rust, Localized Rust , Surface Rust , Atmospheric Corrosion
                    Pitting Corrosion : Localized Pitting, Pitting Corrosion , Pitting
                    Erosion Corrosion : Erosion Corrosion, Erosion
                    Fatigue Corrosion : Fatigue, Fatigue Corrosion
                    Stress Corrosion : Stress Corrosion, Stress , Routine Inspection
                We need the corrosion types occurring over the given period of time.
                Please use the suitable type of aggregation for the above data when presenting the output.
                Please convert the maintenance cost values into percentages for plotting a pie chart.
                Please do not apply any LIMIT while querying the data
                
                ##  MUST DO while displaying FINAL ANSWER: Keep your Answers short, crisp and to the point ##
                Please present the requested details in answer in form of JSON output:
                Here is the question.
                Question: {question}
                Answer: 
        """

        prompt = PromptTemplate(template=sys_msg, input_variables=["plant", "asset_id", "corrosion_type", "question"])
        ques = 'Can you give me a pie chart to represent the percentage of maintenance cost for different corrosion types across all the years.'
        plant=''
        corrosion_type=''
        ans = self.db_chain.run(prompt.format_prompt(question=ques, plant=plant, asset_id=self.asset_id, corrosion_type=corrosion_type))
        ans = ast.literal_eval(ans)
        print(ans)
        return ans
