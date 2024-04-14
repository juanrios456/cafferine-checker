import Image from "next/image"; 
import { GiCoffeeCup } from "react-icons/gi";
import { Dropdowns } from "./dropdowns";

export default function Home() {

  return (
    <main className=" flex justify-center bg-[#ADABA5] min-h-[100vh]">
      <div className="w-full max-w-[1000px]">
        <div className="flex flex-col items-center justify-center my-4">
          <Image src='/caffeine-logo.png' width={200} height={200} alt="logo"/>
          <p className="text-2xl">Cafferine Checker</p>
        </div>
        <div className="flex justify-center">
          <Dropdowns />
        </div>
        
      </div>
    </main>
  );
}
