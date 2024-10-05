'use client'

import { useEffect, useState } from "react"
import { db } from "../../../../../utils/db"
import { MockInterview } from "../../../../../utils/schema"
import { eq } from "drizzle-orm"
import Loader from "@/components/Loader/Loader"
import { WebcamIcon } from "lucide-react"
import Webcam from 'react-webcam'
import { Button } from "@/components/ui/button"
import Link from "next/link"
interface Params {
    params: {
        interviewId: string;
    }
}
interface MockResponse {
    id: number;
    mockId: string;
    jsonMockResponse: string;
    jobPosition: string;
    jobDescription: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string|null;
  }
  
export default function InterviewPage({ params: { interviewId } }: Params) {
    const [interviewData, setInterviewData] = useState<MockResponse|null>(null)
    const [webcamEnabled,setWebcamEnabled] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getInterviewDetails()
    }, [])

    const getInterviewDetails = async () => {
        try {
            const response = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId))
            setInterviewData(response[0])
        } catch (error) {
            console.error("Error fetching interview data:", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loader />  
    } 
      
    return (
        <section className="flex flex-col mt-8">
              <h1 className="text-3xl font-bold text-center">Get ready for the interview </h1>
            <div className="flex flex-row gap-20 justify-center ">
              <div className="flex flex-col  ">
                <div className="flex flex-col p-10 mt-16 border border-gray-300 w-[400px] h-[200px] gap-2">
                    <h2 className="text-xl font-bold">Job Role: <span className="text-gray-600">{interviewData?.jobPosition}</span></h2>
                    <h2 className="text-xl font-bold">Tech Stack: <span className="text-gray-600">{interviewData?.jobDescription}</span></h2>
                    <h2 className="text-xl font-bold">Experience: <span className="text-gray-600">{interviewData?.jobExperience} Year</span></h2>
                </div>
               <div className="flex flex-col p-10 mt-2  border border-gray-300 w-[400px] h-[300px] gap-2 bg-yellow-100">
                 <h2 className="text-xl font-bold">Info</h2>
                 <p className="text-gray-700 font-semibold text-md">Open your webcam and microphone to start your Ai mock interview It has 10 questions which you can answer.You will get a summary of your answers in the end.Note: We do not record video,you can disable the webcam by clicking on the button</p>
               </div>
              </div>
            
            <div className="mt-16">
               {
                !webcamEnabled? <WebcamIcon className='h-72 w-[600px]   p-20 bg-gray-200 rounded-lg border' />:
                    <Webcam 
                 onUserMedia={()=>setWebcamEnabled(true)}
                 onUserMediaError={()=>setWebcamEnabled(false)}
                 mirrored={true}
                 style={{
                    height:400,
                    width:700
                }} />
              
                
               }
              <div className="flex justify-center items-center flex-col">
              <Button  className="mt-4"  onClick={()=>setWebcamEnabled(!webcamEnabled)}>{webcamEnabled?"Close Webcam":"Open Webcam"}</Button>
               <Link href={`/dashboard/interview/${interviewId}/getStarted`}> < Button className="flex justify-center w-[40%] px-16 py-4 items-center mt-10 bg-blue-700 mb-4 hover:bg-blue-800 ml-10">Start</Button></Link>
              <div>
              
              </div>
              </div>
            </div>
          
          
            </div>
            
        </section>
    )
}
