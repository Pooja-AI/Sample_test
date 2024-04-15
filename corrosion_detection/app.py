from flask_cors import CORS
from flask import Flask
from blueprints.imageGen.views import genAI


def create_app():
    app = Flask(__name__, static_url_path='')
    CORS(app, resources={r"/*": {"origins": "*", "send_wildcard": "False"}})
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config["SESSION_PERMANENT"] = False
    
    app.register_blueprint(genAI)

    return app
    
if __name__ == "__main__":
    create_app().run(host='0.0.0.0',port=3001, debug=True)