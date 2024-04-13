from flask import Flask, jsonify, render_template, url_for,request,redirect
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()
uri = os.getenv("CONNECTION_STRING")
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.caffeine
collection = db.drinks 

def test_connection():

# Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        document = collection.find_one()
    
    
        if document:
            print("One document from the collection:")
            print(document)
        else:
            print("No documents found in the collection.")
    except Exception as e:
        print(e)


test_connection()

#app instance
app = Flask(__name__)

CORS(app)
@app.route("/api/home", methods=['GET','POST'])

def return_home():
    return jsonify({
        'message':"hello everyonnneeee"
    })


if __name__ == "__main__":
    app.run(debug=True, port=8080)