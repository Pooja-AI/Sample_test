import folium
import pandas as pd
import os
import json
import pymysql
import urllib.parse

class map:
    def __init__(self):
        with open("global_config.json","r")as fb:
            self.global_config=json.load(fb)
        self.db_user = self.global_config['db_user']
        self.db_password = self.global_config['db_password']
        self.encoded_password = urllib.parse.quote_plus(self.db_password)
        self.db_host = self.global_config['db_host']
        self.db_name = self.global_config['db_name']
        with open("config.json","r")as f:
            path=json.load(f)
        self.ssl_ca = path['cert_path']
    def asset_map(self, asset_id):
        conn = pymysql.connect(host=self.db_host, database=self.db_name, user=self.db_user, password=self.db_password, ssl_ca=self.ssl_ca)
        cursor = conn.cursor()
        query = f"SELECT Latitude, Longitude FROM map_details WHERE `Asset_ID` = '{asset_id}'"
        cursor.execute(query)
        data = pd.DataFrame(cursor.fetchall(), columns=['Latitude', 'Longitude'])
        cursor.close()
        conn.close()

        center = [data['Latitude'].mean(), data['Longitude'].mean()]
        map_instance = folium.Map(location=center, zoom_start=2)

        for _, row in data.iterrows():
            location = [row['Latitude'], row['Longitude']]
            folium.Marker(location, popup=f'Asset ID: {asset_id}').add_to(map_instance)

        file_path = r"C:\Users\shivani.madipeddi\OSDU_project\chatbot\public\map.html"
        if os.path.exists(file_path):
            os.remove(file_path)
        map_instance.save(file_path)
        return file_path

