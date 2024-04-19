from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chat_models import AzureChatOpenAI
import json

class EmailGenerator:
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

    def generate_email_draft(self,asset_name,asset_type,location,area_of_corrosion,incident_type,impact_on_operations,recommended_actions):
        input_data = {
            "asset_name":asset_name,
            "asset_type": asset_type,
            "location": location,
            "area_of_corrosion": area_of_corrosion,
            "incident_type": incident_type,
            "impact_on_operations": impact_on_operations,
            "recommended_actions": recommended_actions
        }
        input_variables = list(input_data.keys())
        sys_msg = """
        Compose an email regarding the detected asset corrosion issue. The details to be included are as follows:

        Asset: {asset_name}
        Asset Type: {asset_type}
        Location: {location}
        Corrosion Area: {area_of_corrosion}
        Incident Type: {incident_type}
        Impact on Operations: {impact_on_operations}
        Recommended Actions: {recommended_actions}

        These below instructions must follow:
        - Mention the subject clearly
        - Change the context each time when the user is not satisfied with the email draft generated. LLM chain is needed to pick a random email draft.
        - Utilize synonym replacement, paraphrasing, and sentence restructuring to generate diverse drafts while preserving essential information. Keep the context unchanged, but modify the content to introduce fresh phrasing and expressions.
        - Please ensure to follow all the required steps and generate a new email with the same content. Include 'Dear Supervisor,' at the beginning and 'Best Regards, Admin' at the end automatically.
        - Each time when running the LLM chain, you should generate a new email draft with similar content but sentence structuring should be changed.
        """

        prompt = PromptTemplate(template=sys_msg, input_variables=input_variables)
        llm_chain = LLMChain(llm=self.llm, prompt=prompt)

        generated_email = llm_chain.run(input_data)

        # Extract subject and body from the generated email
        subject, *body = generated_email.split('\n', 1)
        body = '\n'.join(body)

        return subject.strip(), body.strip()
