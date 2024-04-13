from flask import Flask, jsonify, render_template, url_for,request,redirect
from flask_cors import CORS
from database import calculate_caffeine,get_all_names



#app instance
app = Flask(__name__)

CORS(app)
app.config['CORS_ORIGIN_WHITELIST'] = ['http://localhost:3000/']
app.config['CORS_HEADERS'] = 'Content-Type'

# get drink names for dropdown
@app.route("/api/names", methods=['GET'])
def get_names():
    names = get_all_names()  # Retrieve all names from the database
    return jsonify(names), 200  # Return the names as JSON

# # get document query result
# @app.route("/api/document", methods=['GET'])
# def get_document():
#     document =test_please()
#     if document:
#         return jsonify(document), 200
#     else:
#         return jsonify({"error": "Document not found"}), 404
    

# post user submission
@app.route('/api/input', methods=['POST'])
def user_input():
    try:
        data = request.get_json()
        drink_name = data.get("Name")
        size = data.get('size')
        qty = data.get('qty')

        total_caffeine = calculate_caffeine(drink_name,size,qty)
        return jsonify({
            'total_caffeine':total_caffeine
        })
    except Exception as e:
        return jsonify({'message': 'error creating user', 'error': str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, port=8080)
