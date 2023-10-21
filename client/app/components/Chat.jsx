'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'
import Users from './Users'


function Chat() {
  const router = useRouter()

    useEffect(()=>{
   if(localStorage.getItem("userinfo")){

   }else{
    router.push('/register')
   }
   
    },[])


  return (<>
  <div>
    
    <Users/>
    </div>
    </>
  )
}

export default Chat