'use client'
import { Usercontext } from '@/context/context';
import Chat from './components/Chat'
import Welcome from './components/Welcome'
import {useContext} from "react";
import ChatBWusers from './components/ChatBWusers';
import HeaderComponent from './components/HeaderComponent';
export default function Home() {
  
  const {selected} = useContext(Usercontext)
 
  return (
    <main>
      <HeaderComponent/>
      <div className='flex flex-row'>
      <div className='ThirtyPercentWIdth'> <div className='w-100 min-h-full bg-[#5865f2]'><Chat/></div>  </div>

      {selected?
      <div className='SeventyPercentWIdth'><ChatBWusers/></div>

      :
      <div className='SeventyPercentWIdth'><Welcome/></div>

      }


      </div>
    </main>
  )
}
