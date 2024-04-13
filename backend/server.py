from flask import Flask, jsonify, render_template, url_for,request,redirect
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv()
uri = os.getenv("CONNECTION_STRING")
client = MongoClient(uri, server_api=ServerApi('1'))

# Create a new client and connect to the server
db = client.caffeine
collection = db.drinks 

# def test_connection():

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

def test_please():
    document = collection.find_one({"Name":"Monster"})
    if document:
        print("One document from the collection:")
        print(document)
        return document
    else:
        print("No documents found in the collection.")

pleasseee = test_please()
size = 17

print(f'HEREEEREREERE: {pleasseee}')
#app instance
app = Flask(__name__)

CORS(app)
@app.route("/api", methods=['GET','POST'])

def return_home():
    return jsonify({
        'message':"hello everyonnneeee"
    })


if __name__ == "__main__":
    app.run(debug=True, port=8080)