'use client';

import { useEffect, useState } from "react";
import { db } from "../../../../../../utils/db";
import { MockInterview } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
 
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
  const [interviewData, setInterviewData] = useState<MockResponse | null>(null);  
  const [mockQuestions, setMockQuestions] = useState<MockQuestion[] | null>(null);

  useEffect(() => {
    getInterviewData();
  }, []);

  const getInterviewData = async () => {
    const response = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));

    if (response && response.length > 0) {
      const jsonMockData: MockQuestion[] = JSON.parse(response[0].jsonMockResponse);
      setMockQuestions(jsonMockData);
      setInterviewData(response[0]);
    }
  };

  console.log(mockQuestions);

  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* //TODO: Add questions and answers */}
        
        
        {/* Recording */}
      </div>
    </section>
  );
}

export default GetStarted;
