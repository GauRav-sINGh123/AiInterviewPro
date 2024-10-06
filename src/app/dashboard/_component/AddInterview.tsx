"use client";
import { LoaderCircle } from 'lucide-react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { chatSession } from "../../../../utils/geminiApi";
import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { v4 as uuid4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';
interface Data{
    role:string,
    skills:string,
    experience:string
}

function AddInterview() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Data>({
    role: '',
    skills: '',
    experience: ''
  });
  const router=useRouter();
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const {user}=useUser()
  const handleOpen = () => {
    setOpen(true);
  };
  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'experience') {
      const value = e.target.value.slice(0, 2);
      setData({ ...data, [e.target.name]: value });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const InputPrompt = `Job Role: ${data.role}, Skills: ${data.skills}, Experience: ${data.experience}. Based on the above information, generate a list of 10 questions and answers that the interviewer should ask the candidate in a technical interview in JSON format. Give the questions and answer fields on JSON.`;
  
    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = await result.response.text();
      
      // Clean up the response and ensure there are no unwanted characters
      const cleanedResponse = rawResponse
        .replaceAll('```json', '')
        .replaceAll('```', '')
        .trim();
  
      // Attempt to parse the cleaned response
      const parsedData = JSON.parse(cleanedResponse);
  
      setResult(parsedData);
  
      if (parsedData) {
        const response = await db.insert(MockInterview).values({
          mockId: uuid4(),
          jsonMockResponse: cleanedResponse,
          jobPosition: data.role,
          jobDescription: data.skills,
          jobExperience: data.experience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY'),
        }).returning({ mockId: MockInterview.mockId });
  
  
        if (response) {
          setOpen(false);
          router.push('/dashboard/interview/' + response[0].mockId);
        }
      } else {
        console.log("Error: No parsed data found");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    } finally {
      setLoading(false);
        
    }
  };
 console.log(result)
  return (
    <div className="flex items-center justify-center mt-8 ">
      <div onClick={handleOpen} className="w-60 h-20 shadow-md border-2 border-neutral-300 rounded-md flex items-center justify-center cursor-pointer ">
        <h3 className="text-black text-xl font-bold text-center  ">
          Add Interview  
        </h3>
           
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
       
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black text-xl font-bold text-center">Tell us about position you are interviewing for. ⚡️</DialogTitle>
            <DialogDescription>
            <form onSubmit={handleSubmit}>
            <div  className="mt-4">
                <h2 className="text-black text-md font-bold text">What is the role?</h2>
                 <Input placeholder="Software Engineer" className="mt-4 w-[95%] " type="text" required name="role" value={data.role} onChange={handleData}/>
             </div>
             <div className="mt-4">
                <h2 className="text-black text-md font-bold text">Skills</h2>
                <Textarea placeholder="Ex. React, Node, Express" className="mt-4 w-[95%] " required name="skills" value={data.skills} onChange={handleData} />
             </div>
             <div className="mt-4">
                <h2 className="text-black text-md font-bold text">Experience Level</h2>
                <Input placeholder="Ex. 0,1" className="mt-4 w-[95%]  " type="number" min={'0'} max={'50'} required name="experience" value={data.experience} onChange={handleData} />
             </div>
              <div className="flex items-center justify-center gap-4 "> 
            <Button variant={'outline'} className="w-[40%] mt-8" onClick={()=>setOpen(false)}>Cancel</Button>
            <Button type="submit" className="w-[40%] mt-8" disabled={loading}>{loading?<LoaderCircle className="animate-spin"/> :'Start Interview'}</Button>
            </div>
            </form>
            </DialogDescription>
            
          </DialogHeader>
        </DialogContent>
      </Dialog>
    
    </div>
  );
}

export default AddInterview;
