import AddInterview from '@/app/dashboard/_component/AddInterview'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardPage () {
  return (
    <div >
      <h1 className='text-black text-4xl font-bold text-center mt-10'>Dashboard</h1>
      <AddInterview/>
    </div>
  )
}

export default DashboardPage