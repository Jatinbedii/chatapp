
import React from 'react'
import {  Fruktur } from 'next/font/google'
import Image from 'next/image';
import Login from '../components/Login';
const fruktur= Fruktur({ subsets: ['latin'] ,weight:"400",display: 'swap',});

function page() {
  
  return (
    <div className='min-h-screen bg-[#5865f2] flex flex-col gap-3'>
      <div className='w-full text-center text-white'><h1 className={`${fruktur.className} text-4xl sm:text-7xl`}>Walkie Talkie</h1></div>
      <div className='w-full text-center text-slate-100'><h2 className={`font-semibold text-xl sm:text-4xl`}>Log into your Account</h2></div>

        <div className='bg-[#5865f2] min-w-full grid content-center ' >
        <Login/>
        </div>
        <div className='md:flex md:justify-around'>
        <div className=' text-white font-semibold'>
          New to Walkie Talkie? <a href='/register'>Register</a>
        </div>
      <Image src='/croco.png' width={400} height={400} alt='crocodile'/>

        
        </div>

    </div>
  )
}

export default page