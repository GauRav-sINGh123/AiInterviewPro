'use client';

import { useEffect, useState } from "react";
import { db } from "../../../../../../utils/db";
import { MockInterview } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import Question from "./_components/Question";
import Loader from "@/components/Loader/Loader";
import Record from "./_components/Record";
 
interface MockQuestion {
  question: string;
  answer: string;
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

function GetStarted({ params: { interviewId } }: { params: { interviewId: string } }) {
  const [interviewData, setInterviewData] = useState<MockResponse >();  
  const [mockQuestions, setMockQuestions] = useState<MockQuestion[]>();
  const [activeQuestion, setActiveQuestion] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getInterviewData();
  }, []);

  const getInterviewData = async () => {
    const response = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));

    if (response && response.length > 0) {
      const jsonMockData: MockQuestion[] = JSON.parse(response[0].jsonMockResponse);
      setMockQuestions(jsonMockData);
      setInterviewData(response[0]);
      setLoading(false);
    }
  };
  
  if(loading){
    return <Loader/>
  }
  const handlePrevious = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };

  const handleNext = () => {
    if (mockQuestions && activeQuestion < mockQuestions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    }
  };

  return (
    <section>
      <div className='flex flex-col-reverse justify-center items-center px-10 md:flex-row gap-5'>
         
        {/* //TODO: Add questions and answers */}
       <div className="w-[50%]">
       <Question mockQuestions={mockQuestions} activeQuestion={activeQuestion} />
       </div>
       
        {/* Recording */}
        <div className="w-[50%]">
        <Record/>
        </div>
      </div>
      <div className="w-[50%] flex justify-center mt-8 gap-16">
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:scale-110 transition-all ease-in-out font-bold" onClick={handlePrevious}>Previous</button>
        <button className="px-6 py-2 bg-black rounded-lg text-white hover:scale-110 transition-all ease-in-out font-bold" onClick={handleNext}>Next</button>
        </div>
    </section>
  );
}

export default GetStarted;
