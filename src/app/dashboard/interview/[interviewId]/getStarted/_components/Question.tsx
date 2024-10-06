import React from 'react';

interface MockQuestion {
    question: string;
    answer: string;
}

function Question({ mockQuestions, activeQuestion }: { mockQuestions: MockQuestion[] | undefined, activeQuestion: number }) {
  return (
    <div className='p-5 border rounded-lg mt-16 h-[400px]'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockQuestions?.map((question, index) => (
          <h2
            key={index}  
            className={`py-2 px-4 rounded-lg text-xs md:text-base font-semibold ${
              activeQuestion === index ? 'bg-blue-600 text-white' : 'bg-slate-200'
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
        
      </div>
      <div className='w-full mt-4'>
        <h2 className='py-2 px-4 rounded-lg text-xs md:text-base font-semibold'>{mockQuestions?.[activeQuestion]?.question}</h2>
      </div>
      <div className='mt-5 border bg-green-200 p-5 rounded-lg'>
        <h2 className='text-sm md:text-base font-semibold'>Note: Click on the record button to record your answer.</h2>
      </div>
    </div>
  );
}

export default Question;
