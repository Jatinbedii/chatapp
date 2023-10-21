'use client'
import { Usercontext } from '@/context/context';
import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react'
import {io} from 'socket.io-client'
import { Sen } from 'next/font/google';
const sen = Sen({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400','700']
  
})

function Users() {
  const defaultimage = 'http://res.cloudinary.com/jatinbedi/image/upload/v1697558131/nfwlutvyokkwwzywphy2.jpg'
  let personaldata;
  if(typeof window !== 'undefined'){
  personaldata = localStorage.getItem("userinfo");}
  

  const[users,getusers]= useState([]);
 


  const {selected,setselected,setsocket,socket} = useContext(Usercontext)
  
 async function func(){
  if(personaldata){
  const data = await axios(`http://localhost:3001/api/getusers/${personaldata._id}`);
  if(data.status!=299){
  
  getusers(data.data);
  
  }else{
    console.log('issue in fethcing users')
  }
}
  }

  useEffect(()=>{
    func();
    
  },[])

  useEffect(() => {
    if(typeof window !== 'undefined'){
    personaldata= JSON.parse(window.localStorage.getItem("userinfo"));}
    if (personaldata) {
      const oursocket = io('http://localhost:3001');
      setsocket(oursocket);
     
      oursocket.emit('adduser',personaldata._id)
    }
  }, [personaldata]);
 

  function selecting(id){
    setselected(id);
  }



  return (
    <div className='bg-[#5865f2] '>
    <div className='w-100 bg-[#5865f2] min-h-fit overflow-y-scroll max-h-screen mx-1 rounded'>
      <div className='w-100 text-center bg-[#5865f2] '><span className={sen.className}><p className='text-white font-bold text-2xl'>Users</p></span></div>
      {
        users.map((data)=>{
          if(data._id==selected){
            return(


              <div key={data._id}  className='bg-yellow-300 mt-2 border-2 border-black p-1 rounded-md'>
    
                <div onClick={()=>selecting(data._id)}><div className='flex flex-row'><img className='pr-2' height={'20px'} width={'40px'} src={data.imageurl}/><span>{data.email}</span></div></div>
              
    
              </div>
              
              
              )
          }else{
            return(

              
              <div key={data._id} className='bg-white mt-2 border-2 border-black p-1 rounded-md'>
                <div className={sen.className}>
                <div onClick={()=>selecting(data._id)}><div className='flex flex-row'><img className='pr-2' height={'20px'} width={'40px'} src={data.imageurl}/><span>{data.email}</span></div></div>
                </div>
    
              </div>
              
              
              )
          }
        })
      }
    
    </div>
    </div>
  )
}

export default Users
