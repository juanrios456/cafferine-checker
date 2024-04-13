'use client'
import { Select, SelectItem } from "@nextui-org/react"

type dummyArray = {
  name: string;
  

}[]

export function DropDowns(
  {dummyArray}:{
    dummyArray: dummyArray;
  }
){
  return(
    <div>
      <div>
      <Select placeholder="hello">
        {dummyArray.map((item,index)=>(
          <SelectItem key={item.name}>{item.name}</SelectItem>
        ))}
      </Select>
      </div>
      <div></div>
    </div>
  )
}