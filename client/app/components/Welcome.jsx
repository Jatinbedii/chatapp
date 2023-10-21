import React from 'react'
import {  Fruktur,Sen } from 'next/font/google'
import Image from 'next/image';
const fruktur= Fruktur({ subsets: ['latin'] ,weight:"400",display: 'swap',});
const sen = Sen({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400']
  
})



function Welcome() {
  return (
    <div id='Chatscreenheight' className='w-100 bg-[#5865f2] text-center'>
      <p className='text-white text-2xl md:text-3xl'><span className={sen.className}>Welcome to</span></p>
      <p className='text-white text-3xl md:text-6xl'><span className={fruktur.className}>Walkie Talkie</span></p>
      <div className='w-100 text-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image width={400} alt='crocodile' height={400} src={'/croco.png'} />
      </div>
      <p className=' text-white text-3xl'><span className={sen.className}>Connect to users by clicking their name or profile</span></p>
    </div>
  );
}

export default Welcome
