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
    
def get_all_names():
    names = []
    cursor = collection.find({}, {"_id": 0, "name": 1})  # Exclude _id field, include only name field
    for document in cursor:
        names.append(document["name"])
    return names

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

def calculate_caffeine(drink_result,drink_size, drink_quantity):
        for key, value in drink_result.items():
            #Prints name of drinks
            #if key=="Name":
                #print(str(key)+": "+str(value))
            #Prints caffeine content by multiplying the milligrams/oz by the drink size to find the milligrams
            if key=="Caffeine_Content":
                #Throws and error if the user inputs a negative volume
                if drink_size<0:
                    raise("Drink Size Cannot be Negative")
                #print("Caffeine Content (mg): "+str(float(value)*drink_size)+" per drink")
                #Prints the total amount of caffeine for all drinks consumed
                #if drink_quantity!=1:
                        #print("Total Caffeine (mg): "+str(float(value)*drink_size*drink_quantity))
                total_caffeine =float(value)*drink_size*drink_quantity
                return total_caffeine
            

def main():

    total_caffeine=calculate_caffeine(pleasseee, 17, 3)
    return total_caffeine
    #Passes input to the print function to print the desired results
    '''
    drink__name_input=input()
    drink_size_input=input()
    drink_quantity=input()
    print_drink(drinks, drink_name_input, drink_size_input, drink_quantity)
    '''

    

#ensures name is equal to main and calls main
if __name__=='__main__':
    main()