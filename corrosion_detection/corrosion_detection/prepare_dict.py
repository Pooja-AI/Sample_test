import pandas as pd
import pymysql
import json
from langchain.agents import *
from typing import Union
from langchain import PromptTemplate
from langchain_experimental.sql import SQLDatabaseChain
from langchain.tools import BaseTool
from corrosion_severity import severity
from WO_order import Severity_MW_table
from langchain.sql_database import SQLDatabase
from langchain.chat_models import ChatOpenAI, AzureChatOpenAI
import urllib.parse

Severity_MW_instance = Severity_MW_table()

class dict:
    def __init__(self,plant_id,asset_id,corrosion_type):
        with open("global_config.json","r")as fb:
            self.global_config=json.load(fb)
        with open("config.json","r")as f:
            self.path=json.load(f)
        self.db_user = self.global_config['db_user']
        self.db_password = self.global_config['db_password']
        self.encoded_password = urllib.parse.quote_plus(self.db_password)
        self.db_host = self.global_config['db_host']
        self.db_name = self.global_config['db_name']
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
        # sql_tool = Tool(
        #     name="Corrosion Details",
        #     func=self.db_chain.run,
        #     description="""Use this tool to prepare the dictionary. Use the given plant_id, asset_id,corrosion_type and query the sql database and fill the follwoing template dictionary with those values."
        #                 template_dict:{
        #                             "assetID": "",
        #                             "plant": "",
        #                             "equipmentInstallationDate": "",
        #                             "workOrderRasisedDate": "",
        #                             "assetType": "",
        #                             "name":"admin",
        #                             "failureProbability":"",
        #                             "lastMaintainanceDate": "",
        #                             "history":"",
        #                             "lastInspectionDate": "",
        #                             "lastInspectionComment": ",
        #                             "workOrderComment": "",
        #                             "typeofWorkOrder": "",
        #                             "resolutionComment": "",
        #                             "productionLoss": "",
        #                             "productionLossAv": "",
        #                             "authorisedBy":"Shruthi Chinnaswamy"
        #                         }
        #                         return dictionary only"""
        # )
        # tools = [
        #    sql_tool
        # ]
        # self.agent = initialize_agent(
        #     agent_type='chat-conversational-react-description',
        #     tools=tools,
        #     llm=self.llm,
        #     verbose=True,
        #     max_iterations=3,
        #     early_stopping_method='generate',
        #     handle_parsing_errors=True)

        # uri = f"mysql+pymysql://{db_user}:{encoded_password}@{db_host}/{db_name}"
        # print(uri)
    
    # def dict_prep(self,ques):
    #     ans=self.agent.run(ques)
    #     #ans="generate workorder"
    #     return ans
    def parse_result_string(self,result_string):
        # Split the result_string by double quotes
        result_items = result_string.split('"')[1::2]
        # Return the list of items extracted from the double quotes
        return result_items
    def dict_prep(self,ques):
        # Assuming self.db_chain.run can execute SQL queries
        query = """
        SELECT asset_id, plant, equipmentInstallationDate, workOrderRasiedDate, assetType, name, failureProbability,
        lastMaintainanceDate, history, lastInspectionDate, lastInspectionComment, workOrderComment, typeofWorkOrder,
        resolutionComment, productionLoss, productionLossAv, authorisedBy
        FROM corrosion_details
        WHERE asset_id , plant AND corrosion_type
        input information: {plant}, {asset_id},{corrosion_type}
        return the above selected values in same order. If no value found, add empty string and append all values in list and respond FINAL ANSWER with list
        mention all the values in the list in double quotes.
        give only the values not along with header.
        Even if the value is integer, please give in the double quotes.
        """
        prompt = PromptTemplate(template=query,
                                    input_variables=["asset_id","plant","corrosion_type"]
                                    )
        # Execute the SQL query and fetch the result
        result_list=self.db_chain.run(prompt.format_prompt(asset_id=self.asset_id,plant=self.plant,corrosion_type=self.corrosion_type))
        #result = self.db_chain.run(query)
        print(result_list)
        result = self.parse_result_string(result_list)
        # Prepare the dictionary using the fetched values
        if result:
            print(result[0])
            print(result[14])
            template_dict = {
                "assetID": result[0],
                "plant": result[1],
                "equipmentInstallationDate": result[2],
                "workOrderRasiedDate": result[3],
                "assetType": result[4],
                "name": "admin",
                "failureProbability": result[6],
                "lastMaintainanceDate": result[7],
                "history": result[8],
                "lastInspectionDate": result[9],
                "lastInspectionComment": result[10],
                "workOrderComment": result[11],
                "typeofWorkOrder": result[12],
                "resolutionComment": result[13],
                "productionLoss": result[14],
                "productionLossAv": result[15],
                "authorisedBy": "Shruthi Chinnaswamy"
            }
            print(template_dict)
            return template_dict
        else:
            return None  # If no result found for the given inputs


    
