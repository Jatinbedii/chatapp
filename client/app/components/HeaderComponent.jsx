'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useContext} from 'react'
import { Usercontext } from '@/context/context';


function HeaderComponent() {
  const [pfp,setpfp] = useState('http://res.cloudinary.com/jatinbedi/image/upload/v1697558131/nfwlutvyokkwwzywphy2.jpg')
  const router = useRouter();
  const {socket} = useContext(Usercontext);
  
  if (typeof window !== 'undefined' ) {
    const storedData = localStorage.getItem("userinfo");
    if (storedData) {
      const personaldata = JSON.parse(storedData);
      if(personaldata.imageurl != pfp){
      setpfp(personaldata.imageurl)}
    }
  }

  function logout(){
    localStorage.removeItem("userinfo");
    socket.disconnect();
    router.push('/login');
  }
  return (
    <div className='w-100 h-[35px] flex flex-row'>
      <button className='bg-red-500' onClick={logout}>LOGOUT</button>
       <img height='100px' width='100px' src={pfp} alt="image" />

      
    </div>
  )
}

export default HeaderComponent
