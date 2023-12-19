
import './app.scss'
import MainSection from "./MainSection"
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Home() {

  const session = await getServerSession(options)
  
  return (
  
  <div>
   <MainSection session={session}/>

  </div>


  )
}
