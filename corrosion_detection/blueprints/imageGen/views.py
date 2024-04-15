from flask import Blueprint, request
import json
from flask import jsonify
from flask import Flask, send_file
from prepare_dict import dict
import pandas as pd
from corrosion_severity import severity
from flask import Flask, render_template
from map import map
from corrosion_detection_chat_be import ChatBot
from image_detection_model_be import gen

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

@genAI.route("/chart", methods=['GET','POST'])
def charts():
    if request.method == 'POST':
        user_input = request.get_json()['userInput']
        print("question",user_input)
        plant_id = request.get_json().get('plantId', '')
        asset_id = request.get_json().get('assetId', '')
        corrosion_type = request.get_json().get('detectedCorrosionType', '')
        a=ChatBot(plant_id,asset_id,corrosion_type)
        chatbot_response,maintenance = a.chart(user_input,plant_id,asset_id,corrosion_type)
        print("chatbot",chatbot_response)
        return jsonify(chatbot_response,maintenance)
    
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
    a= render_template('try5.html', data=my_dict)
    return a