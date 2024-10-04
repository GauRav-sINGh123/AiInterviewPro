import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className='flex items-center justify-center h-screen bg-neutral-950'>
       <SignIn />
    </div>
  )
}