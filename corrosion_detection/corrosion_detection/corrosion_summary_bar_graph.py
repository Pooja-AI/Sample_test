import pandas as pd
import pymysql
import ast
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


class Bar:
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

    def bar(self):
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
                                Type of graph : Bar Chart , Line Chart
                                X-Axis : Based on Year value from IncidentDate column from asset_data table
                                Y-Axis : Cost column from asset_data table.
                                Rename the corrosion types based on the following :
                                    Atmospheric Corrosion : Atmospheric Corrosion,General Rust, Localized Rust , Surface Rust 
                                    Pitting Corrosion : Pitting Corrosion ,Localized Pitting,  Pitting
                                    Erosion Corrosion : Erosion Corrosion, Erosion
                                    Fatigue Corrosion : Fatigue Corrosion,Fatigue
                                    Stress Corrosion : Stress Corrosion, Stress , Routine Inspection
                                We need to get only the incident year from the IncidentDate column of this table
                                We need the corrosion types occurring over the given period of time.
                                For a given year , we need to group the data by corrosion type excluding N/A values.
                                Please use the suitable type of aggregation for the above data when presenting the output.
                                Please use only the year while aggregating the data.
                                Please do not apply any LIMIT while querying the data
                                Please give answer only for the corrosion type mentioned by the user.
                                Please do not mention any other corrosion types other than given by the user.
                            ###  MUST DO while displaying FINAL ANSWER:  ###
                                Please present the answer in the form of two different JSON formatted outputs for Bar chart and Line chart respectively.

                            Here is the question.
                            Question: {question}
                            Answer: 

        """
        prompt = PromptTemplate(template=sys_msg, input_variables=["plant", "asset_id", "corrosion_type", "question"])
        ques = 'Can you give me a bar and line chart to represent the maintenance cost for given corrosion type across all the years.'
        plant=''
        ans = self.db_chain.run(prompt.format_prompt(question=ques, plant=plant, asset_id=self.asset_id, corrosion_type=self.corrosion_type))
        ans = ast.literal_eval(ans)
        print(ans)
        return ans
