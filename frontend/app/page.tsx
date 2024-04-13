import Image from "next/image"; 
import { GiCoffeeCup } from "react-icons/gi";
import { Dropdowns } from "./dropdowns";


const hi = "hi";

export default function Home() {



  return (
    <main className=" flex justify-center bg-slate-500 min-h-[100vh]">
      <div className="w-full max-w-[1000px]">
        <div className="flex items-center justify-center my-4">
          <GiCoffeeCup size='200px'/>
        </div>
        <div className="flex justify-center">
          <Dropdowns />
        </div>
        
      </div>
    </main>
  );
}
