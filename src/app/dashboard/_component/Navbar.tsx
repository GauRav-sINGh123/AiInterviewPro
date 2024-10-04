'use client'
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
 


 function Navbar() {
  const path = usePathname()
  
   return (
     <nav className="flex items-center justify-between py-3 shadow-md bg-gray-100">
      <div className="flex items-center gap-2 ml-8">
      <Image src="/Logo.svg" alt="logo" width={40} height={40}/>
      <h2 className="text-2xl font-bold">InterviewAi Pro</h2>
      </div>
       <div className="hidden md:block">
       <ul className="flex items-center gap-6  ">
        <li 
        className={`text-md font-bold hover:scale-105 transition-all ease-in-out cursor-pointer
        ${path==="/dashboard"?"text-blue-600":"text-gray-600"}
        `}>Dashboard</li>
         <li 
         className={`text-md font-bold hover:scale-105 transition-all ease-in-out cursor-pointer text-gray-600
          ${path==="/dashboard/questions"?"text-blue-700":""}
          `}>Questions</li>
         <li 
         className={`text-md font-bold hover:scale-105 transition-all ease-in-out cursor-pointer text-gray-600
          ${path==="/dashboard/upgrade"?"text-blue-600":""}
          `}>Upgrade</li>
         <li 
         className={`text-md font-bold hover:scale-105 transition-all ease-in-out cursor-pointer text-gray-600
          ${path==="/dashboard/contact"?"text-blue-600":""}
          `}>Contact</li>
       </ul>
       </div>
       <div className="mr-4 ">
       <UserButton/>
       </div>
     </nav>
   )
 }
 
 export default Navbar