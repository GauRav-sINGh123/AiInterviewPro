import React from 'react'
interface MockQuestion {
    question: string
    answer: string
}
function Question({MockInterviewQuestion}: {MockInterviewQuestion: MockQuestion}) {
  return (
    <div>Question</div>
  )
}

export default Question