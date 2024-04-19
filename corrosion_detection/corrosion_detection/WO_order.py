import ast
import math

from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType
from langchain.tools import BaseTool
from langchain.llms import OpenAI
import pandas as pd
from typing import Union
import requests


class Severity_MW_table(BaseTool):
    name = "Severity Maintenance window table"
    description = "use this tool when you need to check the maintenance window for the corresponding severity value "

    def _run(self, severity_value: Union[int, float]):
        # severity_percentage = self.calculate_severity_percentage()
        # severity_maintenance_data = pd.read_excel("C:\Users\Shruthi.Chinnasamy\Downloads\Corrosion - Severity.xlsx")
        xls = pd.ExcelFile("C:/Users/shivani.madipeddi/Downloads/severity-maintenance.xlsx")
        severity_maintenance_data = pd.read_excel(xls, 'Severity-Maintenance Window')
        maintenance_window = None
        for index, row in severity_maintenance_data.iterrows():
            print(severity_value)
            if row["Lower Bound"] <= severity_value <= row["Upper Bound"]:
                maintenance_window = row["Maintenance Window"]
        return maintenance_window

    def _arun(self, name):
        raise NotImplementedError("This tool does not support async")
    