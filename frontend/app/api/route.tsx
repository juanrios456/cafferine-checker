import { NextResponse } from "next/server"

export default function GET(req:Request, res:Response){
  return NextResponse.json({message: 'Fuck Off'},{status: 200})
  
}