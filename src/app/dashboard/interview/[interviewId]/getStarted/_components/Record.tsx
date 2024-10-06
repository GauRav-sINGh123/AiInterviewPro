import Image from 'next/image'

function Record() {
  return (
    <div className='p-5 border rounded-lg mt-16 bg-black h-[400px] flex flex-col justify-center items-center'>
     <Image src="/Camera.png" alt="record" width={200} height={200}/> 
    </div>
  )
}

export default Record