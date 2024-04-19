import pandas as pd
import pymysql
import json
from langchain.agents import *
from typing import Union
from langchain import PromptTemplate
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
class INWorder:
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

    def inworder(self):
        sys_msg = """
        Begin!

                Relevant pieces of previous conversation:
                input information: {plant}, {asset_id},{corrosion_type}
                (You do not need to use these pieces of information if not relevant)
        Thought:
                Yor are a helpful Corrosion Resolution recommendation assistant.
                Help the company find the best resolution to apply given what the Industry is looking for.
                You should answer in a descriptive manner, that knows how to resolve the corrosion/issue.
                A helpful source that can give you details on corrosion types and resolutions in corrosion_details table, 
                which you must use while generating all your recommendations.
                If you are asked GENERAL questions on CORROSION TOPIC or ENERGY INDUSTRY TOPIC, use your general knowledge to answer the question.
                example: 
                        Question: what is corrosion?
                        Answer: Corrosion is a natural process that occurs when certain metals or materials react with their 
                        environment and undergo chemical or electrochemical degradation. It is a gradual and destructive process 
                        that can lead to the deterioration of metal structures, equipment, or materials over time.

                Some help about the details of the concerned database from where you will fetch the data
                Please use only the following two tables for fetching the answers
                - Name of the table : Columns in the database
                - asset_data : ActionsTaken,ApprovalBy,AssetID,CorrosionType,    Cost,Description,Downtime,IncidentDate,InspectionReport,MaintenanceTeam,MaterialsUsed,my_row_id,PreventiveMeasures,RootCauseAnalysis,Severity,ShortDescription,Status,WorkOrderNumber
                - equipment: my_row_id,PlantID,AssetID,Asset,Fluid,InstallationDate,Size,Material,CoatingType,OperatingPressure,LastInspectionDate
                
                If the Corrosion type and plant are given in user question please use them in the query, if blank then please ignore.
                When question is asked by user , you can use the data from the above tables.
                At some point you may have to fetch data from multiple tables and will have to join the tables for getting the results.

                #details required for creating the workorder table
                We require the workorder number from the table for the given asset id.
                the incident date for the raised workorder for the given asset id.
                The corrosion type for the given workdorder.
                The severity for the given workdorder.
                Description for the given workdorder.
                ActionsTaken for the given workdorder.
                Cost associated for the given workdorder.
                Downtime associated for the given workorder.


                ###Remember these fundamental steps:###

                1. always start by checking the data of equipment and asset_data table
                2. for general details regarding corrosion , please first search for information in asset_data table , then try searching other tables.
                3. always remember to check valid values for each field with a  SELECT DISTINCT type of query before using them as a filter in WHERE clause.
                4. Always remember to add the NOT NULL (Not Blank if it is a string) condition on the selected columns in the query, so the output does not contain any empty values.
                5. For any GROUP BY, ORDER BY, FILTER, WINDOW or AGGREGATION condition in the SQLQuery generated, add the GROUP BY, ORDER BY, FILTER, WINDOW column names to the SELECT list query.
                6. If you get any syntax error while using the SQL tool, do not respond with the same error, instead politely ask them to install or correct the relevant package/library/method.
                7. Do not display any COLUMN NAMES or TABLE DETAILS in your final Answer/Response.
                8. Remember to give a final answer with valid parsing format as mentioned above.
                9.Please use the limit keyword to limit the answer to top 10 entries after sorting the answer in descending order , latest entries on top , give the complete output containing all rentries matching the query output.


                ##  MUST DO while displaying FINAL ANSWER: Keep your Answers short, crisp and to the point ##
                Please present the requested details in answer in form of JSON output.
                Please present the requested details in answer in form of JSON output.
                Please present answer in format of the below example answer
                ###EXAMPLE ANSWER###
                {{
                            "WorkOrderDetails": [
                                {{
                                  "ActionsTaken": "No action taken.",
                                  "ApprovalBy": "Jane Doe",
                                  "CorrosionType": "N/A",
                                  "Cost": 0.0,
                                  "Description": "Routine inspection indicates no immediate corrosion concerns. Continual vigilance in monitoring is crucial.",
                                  "Downtime": "0 days",
                                  "IncidentDate": "2023-09-01",
                                  "InspectionReport": "Inspection Report #2197",
                                  "MaintenanceTeam": "John Smith",
                                  "MaterialsUsed": "N/A",
                                  "PreventiveMeasures": "Regular inspection",
                                  "RootCauseAnalysis": "No corrosion observed.",
                                  "Severity": "N/A",
                                  "Status": "Completed",
                                  "WorkOrderNumber": "WO20230102"
                                }}]}}
                Here is the question.
                Question: {question}
                Answer: 
        """
        prompt = PromptTemplate(template=sys_msg, input_variables=["plant", "asset_id", "corrosion_type", "question"])
        ques = 'can you present me the details for workorder table present in the database for given asset id. Please check if the given input parameters are present, if not present then do not use it or assume their values'
        plant = ''
        ans = self.db_chain.run(prompt.format_prompt(question=ques, plant=self.plant, asset_id=self.asset_id, corrosion_type=self.corrosion_type))
        ans=json.loads(ans)
        logger.info(f"workorder {ans}")
        return ans