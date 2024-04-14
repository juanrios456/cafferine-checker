'use client'
import { Button, Input, Link, Select, SelectItem,Table, TableHeader,TableColumn,TableBody,TableRow,TableCell } from "@nextui-org/react"
import { useEffect, useState } from "react";

export type InputedDrinks = {
  Name: string;
  caffeine: number;
  qty: number;
}[];

let lifetime_drinks: number[]=[];
let sum = 0;

let error = "";
let errorClass = "";

const startingFormFields:any = {
    Name: undefined,
    size: undefined,
    qty: undefined,
};
const startingListState = [{
    drink: '',
    caffeine: '',
    quantity: '',
    hidden: true,
}];
const dummy = [{
    drink: 'Monster',
    caffeine: 29,
    quantity: 2,
},
{
    drink: 'Red Bull',
    caffeine: 29,
    quantity: 2,
},
];

export function Dropdowns(){
  const [formState, setFormState] = useState(startingFormFields);
  const [listState, setListState] = useState(startingListState);
  const [caffeineState, setCaffeineState] = useState(0);
  const [names, setNames] = useState([]);
  const { Name, size, qty } = formState;

    useEffect(() => {
    // Fetch names from Flask server when component mounts
    fetch('http://localhost:8080/api/names') // Replace with your Flask server address
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        setNames(data); // Set names state with data received from server
      })
      .catch(error => {
        console.error('There was a problem fetching the names:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleSubmit = async (e:any)=>{

    e.preventDefault()

    if(Name === undefined){
      error = "Please Fill Out all Of the Fields";
      errorClass = "text-red-600 font-lg"
      return
    }if (size === undefined) {
      error = "Please Fill Out all Of the Fields";
      errorClass = "text-red-600 font-lg"
      return
    }if (size < 0 ) {
      error = "Please Input a number greater than 0";
      errorClass = "text-red-600 font-lg"
      return
    }if (qty === undefined) {
      error = "Please Fill Out all Of the Fields";
      errorClass = "text-red-600 font-lg"
      return
    }if (qty < 1) {
      error = "Input a number greater than 0";
      errorClass = "text-red-600 font-lg"
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { total_caffeine, drinkName, quantity } = data;

//my old stuff      setCaffeineState(total_caffeine);

      lifetime_drinks.push(total_caffeine);
      console.log(`the current lifetime TOTAL: ${lifetime_drinks}`);
      sum = lifetime_drinks.reduce((accumulator, currentValue)=> accumulator + currentValue, 0);
      console.log(`the current lifetime TOTAL: ${sum}`);
      setCaffeineState(sum)

      setListState([
        ...listState,
        {
          drink: drinkName,
          caffeine: total_caffeine,
          quantity: quantity,
          hidden: false
        }
      ])
    console.log(listState)
    
      console.log(listState + 'whore')
    } catch (error) {
      console.error('Error processing user input:', error);
    }
  };

  const handleChange = ({target}:any)=>{
    setFormState((prev:any) =>({
      ...prev,
      [target.name]: target.value
    }))
  }

  const handleReset = ()=>{
    setFormState({
      Name: '',
      drink: '',
      qty: ''
    });
    lifetime_drinks = []
    sum = 0
    setCaffeineState(0);
    setListState(startingListState)
  }

  return(
  <div>
    <div className="flex flex-row flex-wrap space-x-2">
      <div className="min-w-[300px]">
      <Select placeholder="Select Drink" className="bg-white text-black rounded-lg" name="Name" aria-label="hello" value={Name} onChange={handleChange}>
        {names.map((item)=>(
          <SelectItem className="bg-white text-black rounded-lg" key={item}>{item}</SelectItem>
        ))}
      </Select>
      </div>
      <div>
        <Input type='number' value={size} className="bg-white text-black rounded-lg" aria-label='hi' name="size" placeholder="Fl. Oz." onChange={handleChange}/>
      </div>
      <div>
        <Input type='number' name="qty" className="bg-white text-black rounded-lg" aria-label="hello" value={qty} placeholder="Quantity" onChange={handleChange}/>
      </div>
      <div className="space-x-2">
        <Button onClick={handleSubmit} >Submit</Button>
        <Button onClick={handleReset} >Clear</Button>
      </div>
    </div>
    <div className={`${errorClass} text-center text-red-300 font-lg`}>{error}</div>
    <div className="py-4 flex justify-between">
      <ProgressBar caffeineLevel={caffeineState}/>
      <DrinkList inputedDrinks={listState} />
    </div>
  </div>
  )
}


export function DrinkList({inputedDrinks}:any){

  return(
    <div>
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>Quantity</TableColumn>
        <TableColumn>Caffeine (mg)</TableColumn>
      </TableHeader>
      <TableBody>
        {
          inputedDrinks.map((item:any,index:number)=>(
            <TableRow  className="first:hidden" key={item.drink}>
              <TableCell>{index}</TableCell>
              <TableCell>{item.drink}</TableCell>
              <TableCell>{item.quantity} </TableCell>
              <TableCell>{item.caffeine}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
    </div>
  )
}

export function ProgressBar({caffeineLevel}:any){

  const barHeight = {height: caffeineLevel};


  return(
    <div className="flex">
      <div className="flex items-end border w-[200px] h-[400px] rounded-lg overflow-visible">
        <div className={`w-full h-[${caffeineLevel}px] bg-black rounded-lg`} style={barHeight} > </div>
      </div>
      <div className="h-[400px] grid grid-cols-1 content-stretch pl-2 ">
        <span className="relative h-full">400
          <span className='absolute top-0 left-[-8px] w-[20px] border'></span>
          <span className='absolute bottom-[75px] left-[-8px] w-[10px] border'></span>
          <span className='absolute bottom-[50px] left-[-8px] w-[10px] border'></span>
          <span className='absolute bottom-[25px] left-[-8px] w-[10px] border'></span>
        </span>
        <span className="relative h-full">300
          <span className='absolute top-0 left-[-8px] w-[20px] border'></span>
          <span className='absolute bottom-[75px] left-[-8px] w-[10px] border'></span>
          <span className='absolute bottom-[50px] left-[-8px] w-[10px] border'></span>
          <span className='absolute bottom-[25px] left-[-8px] w-[10px] border'></span>
        </span>
        <span className="relative h-full">200
          <span className='absolute top-0 left-[-8px] w-[20px] border'></span>
          <span className='absolute bottom-[75px] left-[-8px] w-[10px] border'></span>
          <span className='absolute bottom-[50px] left-[-8px] w-[10px] border'></span>
          <span className='absolute bottom-[25px] left-[-8px] w-[10px] border'></span>
        </span>
        <span className="relative h-full">100
          <span className='absolute top-0 left-[-8px] w-[20px] border'></span>
          <span className='absolute bottom-[75px] left-[-8px] w-[10px] border'></span>
          <span className='absolute bottom-[50px] left-[-8px] w-[10px] border'></span>
          <span className='absolute bottom-[25px] left-[-8px] w-[10px] border'></span>
        </span>
      </div>
      <div className="flex items-end pl-4 text-7xl">{caffeineLevel} / 400</div>
    </div>
  )
}