from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
# from langchain_community.chat_models import AzureChatOpenAI
from langchain.chat_models import ChatOpenAI, AzureChatOpenAI
import json

class pdfGenerator:
    def __init__(self):
        with open("global_config.json", "r") as fb:
            self.global_config = json.load(fb)

        self.llm = AzureChatOpenAI(
            deployment_name=self.global_config['model_name'],
            model_name=self.global_config['model_name'],
            openai_api_base=self.global_config['openai_api_base'],
            openai_api_version=self.global_config['openai_api_version'],
            openai_api_key=self.global_config['openai_api_key'],
            temperature=0
        )

        # self.input_data = {
        #     "asset_name": "S0007",
        #     "asset_type": "Gas pipeline",
        #     "location": "Manufacturing Plant C",
        #     "area_of_corrosion": "External piping",
        #     "incident_type": "surface corrosion identification",
        #     "impact_on_operations": "Minimal at the moment, but potential safety and integrity concerns",
        #     "recommended_actions": "Welding and Coating"
        # }

        # self.input_variables = list(self.input_data.keys())

    def generate_pdf_draft(self, plant, asset_id, asset_type, location, incident_type, urgency, date_and_time, date, position, contact_number, email, impact_on_operations, safety_concerns, recommended_actions, approval_supervisor, date_of_approval):
    # Your function code here

        input_data = {
    "plant": plant,
    "asset_id": asset_id,
    "asset_type": asset_type,
    "location": location,
    "incident_type": incident_type,
    "urgency": urgency,
    "date_and_time": date_and_time,
    "date": date,
    "position": position,
    "contact_number": contact_number,
    "email": email,
    "impact_on_operations": impact_on_operations,
    "safety_concerns": safety_concerns,
    "recommended_actions": recommended_actions,
    "approval_supervisor": approval_supervisor,
    "date_of_approval": date_of_approval
        }
        input_variables = list(input_data.keys())
        sys_msg = """
        You are a helpful assistant to generate an automated PDF content based on input parameters for detected corrosion.
        while creating pdf template content you should follow give below instructions:
        fill the respective field values with the inputs given by user

                                            Work Order Form:
        ------------------------------------------------------------------------------------------------
        - Maintenance Department
            - Name: generate value based on {plant}                  - Date: {date}
            - Position: generate value based on {position}            - Contact Number: {contact_number}
            - Email: {email}
        
        - Incident Details
            - Asset ID: {asset_id}   - Asset Type: {asset_type}   - Location: {location}
             - Incident Type: {incident_type}   - Urgency: {urgency}
             - Date and Time of Identification: {date_and_time}
 
        - Description of Corrosion 
            - Write a few points based on the incident details
        
        - Impact on Operations
            - Generate 2 lines script based on: {impact_on_operations}
        - Safety Concerns
            - {safety_concerns}
        - Recommended Actions
            - {recommended_actions}
        - Description of work order required
            - Generate 4 to 5 lines of description based on the parameters
        - Ending by Approver Sign and All Details
            - Approval Supervisor: {approval_supervisor}
            - Date of Approval: {date_of_approval}
            
        Remember this point to separate each subheading by a line, and each subheading should generate in bold.
        """

        prompt = PromptTemplate(template=sys_msg, input_variables=input_variables)
        llm_chain = LLMChain(llm=self.llm, prompt=prompt)

        generated_pdf = llm_chain.run(input_data)

        # # Extract subject and body from the generated email
        # subject, *body = generated_email.split('\n', 1)
        # body = '\n'.join(body)

        return generated_pdf
