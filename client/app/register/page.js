
import React from 'react'
import Register from '../components/Register'
import {  Fruktur } from 'next/font/google'
import Image from 'next/image';
const fruktur= Fruktur({ subsets: ['latin'] ,weight:"400",display: 'swap',});

function page() {
  
  return (
    <div className='min-h-screen bg-[#5865f2] flex flex-col gap-3'>
      <div className='w-full text-center text-white'><h1 className={`${fruktur.className} text-4xl sm:text-7xl`}>Walkie Talkie</h1></div>
      <div className='w-full text-center text-slate-100'><h2 className={`font-semibold text-xl sm:text-4xl`}>Chat and Fun with Friends</h2></div>

        <div className='bg-[#5865f2] min-w-full grid content-center ' >
        <Register/>
        </div>
        <div className='md:flex md:justify-around'>
        <div className=' text-white font-semibold'>
          Already have an Account? <a href='/login'>Login</a>
        </div>
      <Image src='/croco.png' width={400} height={400} alt='crocodile'/>

        
        </div>

    </div>
  )
}

export default page