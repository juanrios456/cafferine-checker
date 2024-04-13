from flask import Flask, jsonify, render_template, url_for,request,redirect
from flask_cors import CORS
from database import test_please,get_all_names



#app instance
app = Flask(__name__)

CORS(app)
@app.route("/api/names", methods=['GET'])

def get_names():
    names = get_all_names()  # Retrieve all names from the database
    return jsonify(names), 200  # Return the names as JSON


@app.route("/api/document", methods=['GET'])
def get_document():
    document =test_please()
    if document:
        return jsonify(document), 200
    else:
        return jsonify({"error": "Document not found"}), 404
    

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, port=8080)
