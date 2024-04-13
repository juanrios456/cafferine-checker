

def create_array():
    #Creates an array of different drinks that contains the drinks' name, caffeine content (in mg) and size (in oz)

    drinks = [ {"Name": "Mtn Dew Energy", 
    "Caffeine_Content": "11.25"},

    {"Name":"Red Bull",
     "Caffeine_Content": "9.25"},

    {"Name":"Monster", 
    "Caffeine_Content": "5.06"},

    {"Name": "V8 Energy", 
    "Caffeine_Content": "10.00"},

    {"Name": "Celsius",
     "Caffeine_Content": "16.67"},

    {"Name": "Charged Lemonade",
     "Caffeine_Content": "13.00"},

    {"Name": "Green Tea", 
    "Caffeine_Content": "5.00"},

    {"Name": "Bang",
     "Caffeine_Content": "18.75"},

    {"Name": "Sugar Free Red Bull",
     "Caffeine_Content": "9.52"},

    {"Name": "Dr. Pepper", 
    "Caffeine_Content": "3.55"},

    {"Name": "Ghost Energy", 
    "Caffeine_Content": "12.50"},

    {"Name": "Water", 
    "Caffeine_Content": "0.00"},

    {"Name": "Bubbl'r Twisted Elixir",
     "Caffeine_Content": "5.75"},

    {"Name": "Gatorade",
     "Caffeine_Content": "0.00"},

    {"Name": "Coffee",
     "Caffeine_Content": "11.88" }]
    #Returns the array created
    return drinks

def calculate_caffeine(drink_array, drink_name, drink_size, drink_quantity):
    #Iterates through the array to find if the drink_name is in the array
    for entry in drink_array:
        #If the drink_name is in the array, the function prints the name of the drink and the amount of caffeine in the specified size
        if drink_name in entry.values():
            for key, value in entry.items():
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
    
    #calls a function to create an array
    drinks=create_array()
    total_caffeine=calculate_caffeine(drinks, "Monster", 17, 1)
    print(total_caffeine)
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