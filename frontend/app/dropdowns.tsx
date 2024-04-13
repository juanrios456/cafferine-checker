'use client'
import { Button, Input, Link, Select, SelectItem,Table, TableHeader,TableColumn,TableBody,TableRow,TableCell } from "@nextui-org/react"
import { useState } from "react";

export type dummyArray = {
  name: string;
}[];

export type InputedDrinks = {
  name: string;
  caffeine: number;
  quantity: number;
}[]

const startingFormFields = {
    name: undefined,
    size: undefined,
    quantity: undefined,
  };

const dummyArray = [
  {
    name: 'Monster Energy',
    caffeine: 11.25,
    fluidOunce: 16,
  },
  {
    name: 'Bang',
    caffeine: 5.25,
    fluidOunce: 8,
  }
]

const drinksListDummyData:InputedDrinks = [
  {
    name: 'Monster',
    caffeine: 8,
    quantity: 4,
  },
  {
    name: 'Bang',
    caffeine: 5.25,
    quantity: 2,
  }
]

export function Dropdowns(){
  const [formState, setFormState] = useState(startingFormFields);
  const { name, size, quantity } = formState;

  const handleChange = ({target}:any)=>{
    setFormState((prev) =>({
      ...prev,
      [target.name]: target.value
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/home',{
        method:'POST',
        body: JSON.stringify(formState),
      })

      console.log(formState);
    } catch (error) {
      
    }
  }

  const handleReset = ()=>{
    setFormState(startingFormFields);
  }

  return(
  <div>
    <div className="flex flex-row flex-wrap space-x-2">
      <div className="min-w-[300px]">
      <Select placeholder="Select Drink" name="name" aria-label="hello" value={name} onChange={handleChange}>
        {dummyArray.map((item,index)=>(
          <SelectItem key={item.name}>{item.name}</SelectItem>
        ))}
      </Select>
      </div>
      <div>
        <Input type='number' value={size} aria-label='hi' name="size" placeholder="Fl. Oz." onChange={handleChange}/>
      </div>
      <div>
        <Input type='number' name="quantity" aria-label="hello" value={quantity} placeholder="Quantity" onChange={handleChange}/>
      </div>
      <div className="space-x-2">
        <Button onClick={handleSubmit} >Submit</Button>
        <Button onClick={handleReset} >Clear</Button>
      </div>
    </div>
    <div className="py-4 flex justify-between">
      <ProgressBar/>
      <DrinkList inputedDrinks={drinksListDummyData} />
    </div>
  </div>
  )
}


export function DrinkList({inputedDrinks}:{inputedDrinks:InputedDrinks}){
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
          inputedDrinks.map((item,index:number)=>(
            <TableRow key={item.name}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{item.name}</TableCell>
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

export function ProgressBar(){
  const [filled, isFilled] = useState(0);
  const [isRunning,setIsRunning] = useState(false);

  return(
    <div className="flex">
      <div className="flex items-end border w-[200px] h-[400px] rounded-lg">
        <div className="w-full h-[40px] bg-black rounded-lg"> </div>
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
    </div>
  )
}