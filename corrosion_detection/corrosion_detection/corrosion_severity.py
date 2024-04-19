import pymysql
import json
from langchain.agents import *
from langchain import PromptTemplate
from langchain_experimental.sql import SQLDatabaseChain
from WO_order import Severity_MW_table
from langchain.sql_database import SQLDatabase
from langchain.chat_models import ChatOpenAI, AzureChatOpenAI
import urllib.parse

Severity_MW_instance = Severity_MW_table()

class severity:
    def __init__(self,plant,asset_id,corrosion_type):
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
        self.plant=plant
        print(self.plant)
        self.asset_id=asset_id
        print(self.asset_id)
        self.corrosion_type=corrosion_type
        print(self.corrosion_type)
        tools = [
            Tool(
                name="severityMaintenanceWindow",
                func=Severity_MW_instance.run,
                description="use this tool to get the severity maintenance window"
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
        self.db = SQLDatabase.from_uri(database_uri=f"mysql+pymysql://{self.db_user}:{self.db_password}@{self.db_host}/{self.db_name}?ssl_ca={self.ssl_ca}")
    def chatBot(self,ques):
        db_chain = SQLDatabaseChain.from_llm(self.llm, self.db, verbose=True)
        print(ques)

        sys_msg ="""Assistant is a large language model which is used to calculate the severity and maintenance window value
         for the {corrosion_type}.
        Thought: I should query the schema of the most relevant tables.

        Based on {corrosion_type}.
        
        Help calculate the severity of the corrosion type given.

        ### Steps to calculate the Severity_value of given corrosion type ###
        1. Start by filtering the row in the table based on the given {corrosion_type} provided by the user.
        - Use: `selected_row = df[df['CorrosionType'] == corrosion_type]`
        2. Retrieve the severity formula from the selected row.
        - Extract the severity formula from the "SeverityFormula" column in the selected row.
        3. Identify the attributes mentioned in the formula and fetch their corresponding values from the row.
        - For each attribute mentioned in the formula, retrieve its value from the corresponding column in the selected row. If the value is NULL, skip it.
        4. Calculate the severity by multiplying all the non-null attribute values obtained in step 3 according to the severity formula.
        - Use the formula: `severity = attribute1 * attribute2 * ... * attributeN`
        5. Return the calculated severity as a response.
        Example Usage:
        - Response: "The severity for 'Erosion' is calculated as follows: Severity = (Erosion Rate in mm/yr) * (Material Hardness in HRC) = 0.05 * 50 = 2.5"
        Ensure that the response includes the calculated severity value based on the attributes and formula for the specified corrosion type.
        Always display the product of attribute values as the final answer.
        FOLLOW ALL THE THREE STEPS ABOVE BEFORE GIVING THE FINAL ANSWER FOR SEVERITY VALUE. 
        
        
        Based on the Asset ID, Plant and Type of corrosion details.
        Help fetch the Maintenance window from severity_mwindow and corrosion_details table using the below steps.
        
        ### Steps to FETCH the  MAINTENANCE WINDOW  ###
        1. Calculate the Severity_value for the given Corrosion Type.
        2. For the given Corrosion Type and Equipment type,Check under which Severity Ranking does the severity_value lie based on the 
        Severity Lowerbound and Severity Upbound column values in table Severity_MWindow.
        eg: SELECT CorrosionType, EquipmentType, SeverityCriteria, SeverityRanking FROM Severity_MWindow
            WHERE
        corrosion_type = 'YourCorrosionType' -- Replace 'YourCorrosionType' with the actual corrosion type.
        AND equipment_type = 'YourEquipmentType' -- Replace 'YourEquipmentType' with the actual equipment type.
        AND severity_value >= SeverityLowerbound
        AND severity_value <= SeverityUpbound;

        3. Based on the Severity Ranking for the given Corrosion Type and Equipment type, fetch the Maintenance Window value from Severity_MWindow table
        4. Generate a MaintenanceWindowStart and MaintenanceWindowEnd date based on the  duration mentioned in Maintenance Window.
        5. Fetch the Next Planned Maintenance Date column value from table corrosion_details for the given corrosion type and Asset ID, Plant
        6. Check if the Next Planned Maintenance Date for the corrosion type is within the Maintenance Window fetched from Severity_MWindow table.
        7.  If the Next Planned Maintenance Date is within the MaintenanceWindowStart AND MaintenanceWindowEnd,then
                Give Summary of Word Order details:Work Order Rasised Date, Work Order Comment (WO),Type of Work Order (WO),
                Resolution Comment     Timeline (in hrs) and Next planned Maintainance for the Asset ID and corrosion type.
            Else 
                Answer: "There is no Existing WO for this ASSET ID. To genearte a new WO click on the below generate workorder option"

                FOLLOW ALL THE THREE STEPS ABOVE BEFORE GIVING THE FINAL ANSWER FOR MAINTENANCE WINDOW

        If you are asked GENERAL questions on CORROSION TOPIC or ENERGY INDUSTRY TOPIC, use your general knowledge to answer the question.
        example": "Question: what is corrosion?
                    Answer: Corrosion is a natural process that occurs when certain metals or materials react with their 
                    environment and undergo chemical or electrochemical degradation. It is a gradual and destructive process 
                    that can lead to the deterioration of metal structures, equipment, or materials over time."

        Remember these fundamental steps:

        1. Always start by checking the metadata of corrosion_details table
        2. Always remember to check valid values for each field with a  SELECT DISTINCT type of query before using them as a filter in WHERE clause.
        3. Always limit search queries for relevant information to return at most n rows with LIMIT
        4. Always remember to add the NOT NULL (Not Blank if it is a string) condition on the selected columns in the query, so the output does not contain any empty values.
        5. For any GROUP BY, ORDER BY, FILTER, WINDOW or AGGREGATION condition in the SQLQuery generated, add the GROUP BY, ORDER BY, FILTER, WINDOW column names to the SELECT list query.
        6. If you get any syntax error while using the SQL tool, do not respond with the same error, instead politely ask them to install or correct the relevant package/library/method.
        7.Remember to give a final answer with valid parsing format as mentioned above.

        Here is the question.
        Asset ID: {asset_id}
        Plant: {plant}
        Corrosion_Type: {corrosion_type}
        Question: {question}
        Answer: 
        """
        prompt = PromptTemplate(template=sys_msg,
                                    input_variables=["plant" ,"asset_id","corrosion_type", "question"]
                                    )
        try:
            ans=db_chain.run(prompt.format_prompt(question=ques,plant=self.plant,asset_id=self.asset_id,corrosion_type=self.corrosion_type))
            #ans="wo order details"
            
            print("ans",ans)
            return str(ans)
        except Exception as e:
            ans=e
 
# a=severity(plant="A",asset_id="AS0001",corrosion_type="Erosion")
# b=a.chatBot("Fetch the maintenance window for the given Asset id?") 