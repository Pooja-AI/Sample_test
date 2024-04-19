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
import os

Severity_MW_instance = Severity_MW_table()

class ChatBot:
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
        sql_tool = Tool(
            name="Corrosion Details",
            func=self.db_chain.run,
            description="Use this tool to fetch the work order details using given meaintenance window"
                        "fetch the maintenance window with the other tool"
                        "Compare the maintenance window with next palnned maintenance window and if both are near to atleast 1 week, then fetch the respective WO order other wise respond with generate workorder."
        )
        tools = [
            Tool(
                name="severityMaintenanceWindow",
                func=Severity_MW_instance.run,
                            description="use this tool to fetch the maintenance window"
            )
        ]
        self.agent = initialize_agent(
            agent_type='chat-conversational-react-description',
            tools=tools,
            llm=self.llm,
            verbose=True,
            max_iterations=3,
            early_stopping_method='generate',
            handle_parsing_errors=True)

        # uri = f"mysql+pymysql://{db_user}:{encoded_password}@{db_host}/{db_name}"
        # print(uri)
        
    def chatBot(self,ques):
        sys_msg = """Begin!
        Relevant pieces of previous conversation:
        input information: {plant}, {asset_id},{corrosion_type}
        (You do not need to use these pieces of information if not relevant)

        Thought:
        Please use only the following two tables for fetching the answers
        - Name of the table : Columns in the database
        - asset_data : ActionsTaken,ApprovalBy,AssetID,CorrosionType,Cost,Description,Downtime,IncidentDate,InspectionReport,MaintenanceTeam,MaterialsUsed,PreventiveMeasures,RootCauseAnalysis,Severity,ShortDescription,Status,WorkOrderNumber
        - equipment: PlantID,AssetID,Asset,Fluid,InstallationDate,Size,Material,CoatingType,OperatingPressure,LastInspectionDate

        Help the company find the best resolution to apply given what the Industry is looking for.
        You should answer in a descriptive manner, that knows how to resolve the corrosion/issue.
        A helpful source that can give you details on corrosion types and resolutions in asset_data table, 
        which you must use while generating all your recommendations.
        If you are asked GENERAL questions on CORROSION TOPIC or ENERGY INDUSTRY TOPIC, use your general knowledge to answer the question.
        example: 
            Question: what is corrosion?
            Answer: Corrosion is a natural process that occurs when certain metals or materials react with their 
            environment and undergo chemical or electrochemical degradation. It is a gradual and destructive process 
            that can lead to the deterioration of metal structures, equipment, or materials over time.

        ###Remember these fundamental steps:###

        1. Always start by checking the metadata of asset_data table
        2. Aways remember to check valid values for each field with a  SELECT DISTINCT type of query before using them as a filter in WHERE clause.
        3. Always limit search queries for relevant information to return at most n rows with LIMIT
        4. Always remember to add the NOT NULL (Not Blank if it is a string) condition on the selected columns in the query, so the output does not contain any empty values.
        5. For any GROUP BY, ORDER BY, FILTER, WINDOW or AGGREGATION condition in the SQLQuery generated, add the GROUP BY, ORDER BY, FILTER, WINDOW column names to the SELECT list query.
        6. If you get any syntax error while using the SQL tool, do not respond with the same error, instead politely ask them to install or correct the relevant package/library/method.
        7. Do not display any COLUMN NAMES or TABLE DETAILS in your final Answer/Response.
        8. Remember to give a final answer with valid parsing format as mentioned above.


        ##  MUST DO while displaying FINAL ANSWER: Keep your Answers short, crisp and to the point ##
        << OUTPUT (remember to include the ```json)>>


        Here is the question.
        Question: {question}
        Answer: 
        """

        prompt = PromptTemplate(template=sys_msg,
                                    input_variables=["plant" ,"asset_id","corrosion_type", "question"]
                                    )
        try:
            ans=self.db_chain.run(prompt.format_prompt(question=ques,plant=self.plant,asset_id=self.asset_id,corrosion_type=self.corrosion_type))
            #ans="wo order details"
            print("chatbot answer:", ans)
            return ans
        except Exception as e:
            print(e)
            ans=e
            return ans

    def chart(self,query,plant,asset_id,corrosion_type):
        #corr= r"app\Final_2_1 (1).csv"
        corr = os.path.join(os.path.dirname(__file__),"Final_2_1.csv")
        df_corr= pd.read_csv(corr)
        chart_agent= create_pandas_dataframe_agent(self.llm, df_corr, verbose=True)
        # def ask_agent(model, query):
        #       # Prepare the prompt with query guidelines and formatting
        prompt = (
                """
               ##Generate JSON-Formatted Chart Output##
                ##Description:##
                You need assistance in automatically generating JSON-formatted chart data in Python. The goal is to take a generic question, extract the relevant columns from the question, determine the most appropriate chart type based on logic, and generate structured JSON output for plotting.

                ##Instructions:##
                1. ##Column Extraction:##
                    - Filter Dataframe df_corr,df_m_ser on {corrosion_type} provided.
                    - Create a new Dataframe by JOINING both the dataframes ON {corrosion_type}.
                    - Identify and extract the column names mentioned in the input question. These columns are essential for generating the chart.           

                    - Even if question doesnt ask for the Chart, based on the {question}, filter the columns based on the  {corrosion_type}, pick the appropriate columns and give the parameters to construct a bar and pie chart. Dont struggle in contrucing harts. I only need parameters in the form of below mentioned example.
                    Let me give you some key words on how to pick the columns if that key word comes in the question.
                    1. maintenance window: asset id and Next Planned Manitenance Date.
                    2. Resolution: asset id, Rate of Corrosion (mpy)
                    3. corrosion: Asset id, Rate of Corrosion (mpy)
                    4. Work order: asset id, Rate of Corrosion (mpy)

                3. ##Data Preparation:##
                    - Prepare the data required for the selected chart type. This includes extracting data from the dataset or generating sample data if not provided in the question.

                5. ##JSON Output:##
                    - Generate and provide the JSON output based on the selected chart type, columns, and data.
                    - The final answer should be a JSON format representation of the chart data.

                ##Example Output:##

                For the given input question, the model should determine the appropriate chart type and generate JSON-formatted data like this:
                Note:1. DONT FORGOT to filter the dataframe based on the {corrosion_type} pick the needed columns only after filtering the dataframe with {corrosion_type}
                     2. Even question dont ask for charts or chart is not needed, still you have to specify proper plots using key words.
                     3. Refer below as just example. dont always take asset id and Next Planned Manitenance Date. based on the abov mentoned set of key words, pick the columns.
                 answer: "asset id":["AS0002", "AS0007", "AS0008"], "Rate of Corrosion (mpy)":[ "12", "07", "21"]
                Here is your question:
                {question}
                """

        )

        # Run the prompt through the agent and capture the response.
        try:
            question = prompt.format(question=query,plant=plant, asset_id=asset_id, corrosion_type=corrosion_type)
            response = chart_agent.run(question)
            print("hiiiiiiiiiiiiiii",response)
            #output = '''The final answer to the original input question "show me the next maintenance window" is: {dfg} the rest of the text you want to extract.'''
            start_index = response.find("{") # Find the first '{' and add 1 to exclude it
            extracted_text = response[start_index:]
            split_index = extracted_text.find('],')

           # Split the data into two parts
            data_part1 = extracted_text[:split_index+1]
            data_part1 = data_part1.strip()
            data_part1 = data_part1.lstrip('{')
            print(data_part1)
            data_part2 = extracted_text[split_index + 1:]
            data_part2 = data_part2.lstrip(',')
            start_index = data_part1.find("[") # Find the first '{' and add 1 to exclude it
            asset = data_part1[start_index:]
            start_index = data_part2.find("[") # Find the first '{' and add 1 to exclude it
            maintenance = data_part2[start_index:]
            start_index = maintenance.find("}") # Find the first '{' and add 1 to exclude it
            maintenance = maintenance[:start_index]
            # Add ']' back to data_part2 if needed
              # Remove any leading ',' to avoid JSON parsing issues
            
            print(asset)
            print(maintenance)
            return asset, maintenance
        except ValueError as e:
            response = str(e)
            if not response.startswith("Could not parse LLM output: `"):
                raise e
            response = response.removeprefix("Could not parse LLM output: `").removesuffix("`")
            print("ans",response)
            start_index = response.find("{")  # Find the first '{' and add 1 to exclude it
            extracted_text = response[start_index:]
            split_index = extracted_text.find('],')

            # Split the data into two parts
            data_part1 = extracted_text[:split_index+1]
            data_part1 = data_part1.strip()
            data_part1 = data_part1.lstrip('{')
            print(data_part1)
            data_part2 = extracted_text[split_index + 1:]
            data_part2 = data_part2.lstrip(',')
            start_index = data_part1.find("[") # Find the first '{' and add 1 to exclude it
            asset = data_part1[start_index:]
            start_index = data_part2.find("[") # Find the first '{' and add 1 to exclude it
            maintenance = data_part2[start_index:]
            start_index = maintenance.find("}") # Find the first '{' and add 1 to exclude it
            maintenance = maintenance[:start_index]
            # Add ']' back to data_part2 if needed
              # Remove any leading ',' to avoid JSON parsing issues
            #asset=["AS0002", "AS0007", "AS0008"]
            #maintenance=[ "12", "07", "21"]
            print(asset)
            print(maintenance)
            return asset, maintenance
    
    # def WO_order(self,ques):
    #     db_chain = SQLDatabaseChain.from_llm(self.llm, self.db, verbose=True)
    #     questionn="calculate the severity"
    #     a=severity(self.corrosion_type)
    #     severity_value=a.chatBot(questionn)
    #     #ans=self.agent.run(ques)
    #     ans="generate workorder"
    #     return ans