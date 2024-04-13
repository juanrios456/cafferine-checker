import Image from "next/image"; 
import { GiCoffeeCup } from "react-icons/gi";
import { DropDowns } from "./dropdowns";

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

const hi = "hi";

export default function Home() {
  return (
    <main className=" flex justify-center">
      <div className="w-full max-w-[1200px]">
        <div className="flex items-center justify-center my-4">
          <GiCoffeeCup size='200px'/>
        </div>
        <div>
          <DropDowns dummyArray={dummyArray}/>
        </div>
      </div>
    </main>
  );
}
