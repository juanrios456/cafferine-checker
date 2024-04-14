
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


# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# grabs all the different drink names
def get_all_names():
    names = []
    cursor = collection.find({}, {"_id": 0, "Name": 1})  # Exclude _id field, include only name field
    for document in cursor:
        names.append(document["Name"])
    return names
# query for document containing user inputted caffeinated drink
def get_drink_by_name(drink_name):
    document = collection.find_one({"Name":drink_name})
    if document:
        return document
    else:
        print("No documents found in the collection.")


# method to calculate total caffeine content
def calculate_caffeine(drink_name,drink_size, drink_quantity):
        drink = get_drink_by_name(drink_name)
        size = float(drink_size)
        qty = int(drink_quantity)
        if not drink:
            return 0
        caffeine_content =drink.get("Caffeine_Content")
        total_caffeine = float(caffeine_content)*size*qty
        return total_caffeine


# example method testing functionality
def main():
    total_caffeine=calculate_caffeine("Monster", 17, 3)
    return total_caffeine


#ensures name is equal to main and calls main
if __name__=='__main__':
    main()