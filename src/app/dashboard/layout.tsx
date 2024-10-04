import Navbar from '@/app/dashboard/_component/Navbar'
import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode } ) {
  return (
    <>
      <Navbar/>
      <div>{children}</div>
    </>
  )
}

export default DashboardLayout