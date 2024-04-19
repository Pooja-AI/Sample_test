from flask import Blueprint, request, send_file
import json
from flask import jsonify
from flask import Flask, send_file
from prepare_dict import dict
import pandas as pd
from corrosion_severity import severity
from corrosion_summary_table import Table
from corrosion_summary_bar_graph import Bar
from corrosion_summary_pie_chart import Pie
from corrosion_insights_bar_graph import IBar
from corrosion_insights_scatter import IScatter
from corrosion_workorder import INWorder
from corrosion_insights_root import IRoot
from flask import Flask, render_template
from map import map
from corrosion_detection_chat_be import ChatBot
from image_detection_model_be import gen
from flask import Flask, jsonify,request
from email_generator import EmailGenerator
from corrosion_pdf_generate import pdfGenerator
import json
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, landscape

with open("config.json","r")as f:
    path=json.load(f)
genAI = Blueprint('genAI', __name__)


@genAI.route("/plantId", methods=['GET','POST'])
def plantId():
    data = path['Dataset_path']
    xls=pd.ExcelFile(data)
    df = pd.read_excel(xls, 'Final')
    plant_ids = df["Plant"].unique()
    plant_ids_list=plant_ids.tolist()
    print(jsonify(plant_ids_list))
    return jsonify(plant_ids_list)

@genAI.route("/assetId", methods=['GET','POST'])
def assetId():
     #if request.method == 'POST':
    plant_id = request.args.get('plantId')
    print(plant_id)
    data = path['Dataset_path']
    if plant_id is not None:
        xls=pd.ExcelFile(data)
        df = pd.read_excel(xls, 'Final')
        filtered_df = df[df["Plant"] == plant_id]
        asset_ids=filtered_df["Asset ID"].unique()
        asset_ids_list=asset_ids.tolist()
        print(asset_ids_list)
        return jsonify(asset_ids_list)

@genAI.route("/map_data", methods=['GET','POST'])
def map_data():
    asset_id = request.args.get('assetId')
    obj=map()
    obj.asset_map(asset_id)
    return {"status":"ok"}

@genAI.route("/imageGen", methods=['GET','POST'])
def process_image():
    image = request.files['image']
    image_data = image.read()  
    res = gen.image_gen(image_data) 
    print(res)
    return res
   
@genAI.route("/chatBot", methods=['GET','POST'])
def chatbot():
    if request.method == 'POST':
        user_input = request.get_json()['userInput']
        print("question",user_input)
        plant_id = request.get_json().get('plantId', '')
        asset_id = request.get_json().get('assetId', '')
        corrosion_type = request.get_json().get('detectedCorrosionType', '')
        a=ChatBot(plant_id,asset_id,corrosion_type)
        chatbot_response = a.chatBot(user_input)
        print("chatbot",chatbot_response)
        # Return the chatbot response as a JSON object
        result = {
            'response': chatbot_response
        }
        return jsonify(result)

    
@genAI.route("/calculateSeverity", methods=['GET','POST'])
def calculateSeverity():
    if request.method == 'POST':
        user_input = "calculate the severity"
        plant_id = request.get_json().get('plantId', '')
        asset_id = request.get_json().get('assetId', '')
        corrosion_type = request.get_json().get('detectedCorrosionType', '')
        print("dfgh",corrosion_type)
        a=severity(plant_id,asset_id,corrosion_type)
        severity_response = a.chatBot(user_input)
        
        # Return the chatbot response as a JSON object
        result = {
            'response': severity_response
        }
        print("response",jsonify(result))
        return jsonify(result)
    
@genAI.route("/checkForWorkOrder", methods=['GET','POST'])
def checkForWorkOrder():
    if request.method == 'POST':
        
        plant_id = request.get_json().get('plantId', '')
        asset_id = request.get_json().get('assetId', '')
        corrosion_type = request.get_json().get('detectedCorrosionType', '')
        #user_input = request.get_json()['userInput']
        a=severity(plant_id,asset_id,corrosion_type)
        severity_response = a.chatBot("fetch the work order details for the given asset id")
        result = {
            'response': severity_response
        }
        print(jsonify(result))
        return jsonify(result)
    
@genAI.route('/generateWorkOrder',methods=['GET','POST'])
def index():
    plant_id = request.get_json().get('plantId', '')
    asset_id = request.get_json().get('assetId', '')
    corrosion_type = request.get_json().get('detectedCorrosionType', '')
    a =dict(plant_id,asset_id,corrosion_type)
    my_dict=a.dict_prep(ques="prepare dictionary")
    # a= render_template('try5.html', data=my_dict)
    return my_dict
@genAI.route('/tableOne',methods=['GET','POST'])
def table1():
    plant_id = request.get_json().get('plantId', '')
    asset_id = request.get_json().get('assetId', '')
    corrosion_type = request.get_json().get('detectedCorrosionType', '')
    a =Table(plant_id,asset_id,corrosion_type)
    response=a.table()
    return response
@genAI.route('/barOne',methods=['GET','POST'])
def bar1():
    plant_id = request.get_json().get('plantId', '')
    asset_id = request.get_json().get('assetId', '')
    corrosion_type = request.get_json().get('detectedCorrosionType', '')
    a =Bar(plant_id,asset_id,corrosion_type)
    response=a.bar()
    return response

@genAI.route('/pieOne',methods=['GET','POST'])
def pie1():
    plant_id = request.get_json().get('plantId', '')
    asset_id = request.get_json().get('assetId', '')
    corrosion_type = request.get_json().get('detectedCorrosionType', '')
    a =Pie(plant_id,asset_id,corrosion_type)
    response=a.pie()
    return response

@genAI.route('/barTwo',methods=['GET','POST'])
def bar2():
    plant_id = request.get_json().get('plantId', '')
    asset_id = request.get_json().get('assetId', '')
    corrosion_type = request.get_json().get('detectedCorrosionType', '')
    a =IBar(plant_id,asset_id,corrosion_type)
    response=a.ibar()
    return response

@genAI.route('/ScatterOne',methods=['GET','POST'])
def scatter1():
    plant_id = request.get_json().get('plantId', '')
    asset_id = request.get_json().get('assetId', '')
    corrosion_type = request.get_json().get('detectedCorrosionType', '')
    a =IScatter(plant_id,asset_id,corrosion_type)
    response=a.iscatter()
    return response

@genAI.route('/rootCause',methods=['GET','POST'])
def root():
    plant_id = request.get_json().get('plantId', '')
    asset_id = request.get_json().get('assetId', '')
    corrosion_type = request.get_json().get('detectedCorrosionType', '')
    a =IRoot(plant_id,asset_id,corrosion_type)
    response=a.iroot()
    return response

@genAI.route('/WOHistory',methods=['GET','POST'])
def WO():
    plant_id = request.get_json().get('plantId', '')
    asset_id = request.get_json().get('assetId', '')
    corrosion_type = request.get_json().get('detectedCorrosionType', '')
    a =INWorder(plant_id,asset_id,corrosion_type)
    response=a.inworder()
    return response

@genAI.route('/insights',methods=['GET','POST'])
def insight():
    plant_id = request.get_json().get('plantId', '')
    asset_id = request.get_json().get('assetId', '')
    corrosion_type = request.get_json().get('detectedCorrosionType', '')
    rootcause =IRoot(plant_id,asset_id,corrosion_type)
    rootcause_response=rootcause.iroot()
    scatterchart =IScatter(asset_id)
    scatterchart_response=scatterchart.iscatter()
    linechart =IBar(asset_id)
    linechart_response=linechart.ibar()
    response_data = {
        "analysis": rootcause_response,
        "scatterChartData": scatterchart_response,
        "lineChartData": linechart_response
    }
    return response_data

 

@genAI.route('/generate_email', methods=['GET','POST'])
def generate_email():
    data=request.get_json()
    # print(data)
    asset_name=data["asset_name"]
    asset_type=data["asset_type"]
    location=data["location"]
    area_of_corrosion=data["area_of_corrosion"]
    incident_type=data["incident_type"]
    impact_on_operations=data["impact_on_operations"]
    recommended_actions=data["recommended_actions"]
        
    email_generator = EmailGenerator()
    subject, body = email_generator.generate_email_draft(asset_name,asset_type,location,area_of_corrosion,incident_type,impact_on_operations,recommended_actions)

    email_data = {
        "subject": subject,
        "body": body
    }

    with open("email_output.json", "w") as file:
        file.write(json.dumps(email_data, indent=4))

    # return f"Subject: {subject}\n\nBody: {body}"
    return email_data

@genAI.route('/generate_pdf', methods=['GET','POST'])
def generate_pdf():
    data=request.get_json()
    # Get form data
    plant = data['plant']
    asset_id = data['asset_id']
    asset_type = data['asset_type']
    location = data['location']
    incident_type = data['incident_type']
    urgency = data['urgency']
    date_and_time = data['date_and_time']
    date = data['date']
    position = data['position']
    contact_number = data['contact_number']
    email = data['email']
    impact_on_operations = data['impact_on_operations']
    safety_concerns = data['safety_concerns']
    recommended_actions = data['recommended_actions']
    approval_supervisor = data['approval_supervisor']
    date_of_approval = data['date_of_approval']
    pdf_generator = pdfGenerator()
    # Generate email draft
    generated_content = pdf_generator.generate_pdf_draft(
        plant, asset_id, asset_type, location, incident_type, urgency, date_and_time, date, position, contact_number, email,
        impact_on_operations, safety_concerns, recommended_actions, approval_supervisor, date_of_approval
    )

    # Create a PDF document with landscape orientation
    pdf_filename = "work_order_template.pdf"
    pdf = canvas.Canvas(pdf_filename, pagesize=landscape(letter))
    pdf.setFont("Helvetica", 12)  # Set font without bold

    # Add content to the PDF
    lines = generated_content.split('\n')
    y_coordinate = 550
    for line in lines:
        pdf.drawString(100, y_coordinate, line)
        y_coordinate -= 15

    pdf.save()  # Save the PDF
 
    return send_file(pdf_filename, as_attachment=True, download_name=pdf_filename, mimetype='application/pdf')