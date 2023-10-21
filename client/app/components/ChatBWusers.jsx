'use client'
import { Usercontext } from '@/context/context'
import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import {data as dayta} from '@emoji-mart/react'
import Picker from '@emoji-mart/react'


function ChatBWusers() {
  
  let index=0;
  const personaldata = JSON.parse(localStorage.getItem("userinfo"))
  const [data,getdata]= useState();
  const {selected,socket} = useContext(Usercontext);
  const [msg,setmsg]= useState(''); 
  const [messages,setmessages]= useState([]); 
  const [showemojis,setshowemojis]= useState(false); 

  
    async function headerfunc(){
      
        const res = await axios.post('http://localhost:3001/api/getuserinfo',{userid: selected});
        if(res.status!=299){
       
        getdata(res.data);

     

        }else{
        console.log('error in fethcing data ');

      }
      
    }

    async function getmessagesfunction(){
      axios.post('http://localhost:3001/api/getmessages',{from : personaldata._id ,to: selected }).then((res=>{setmessages(res.data);console.log(res.data)})).catch(err=>{console.log(err)})
}
  

 useEffect(()=>{
  headerfunc();

 },[selected])

 useEffect(()=>{
 getmessagesfunction();
 },[selected]);
 
//sockets

 useEffect(()=>{
  if(socket){
    console.log('id is'+socket.id);
    socket.on('recievemessage',({from,message})=>{
      console.log({from,message});
      if(selected==from){
        const randomid = Math.floor(Math.random() * 100) + 1;
      const newmessage = {message: {text:message},sender:from,_id: randomid}
      setmessages([...messages,newmessage])
      }
    })
  }
  
 })

 function emojiselecter(data){
  setmsg(msg+data.native);
 }
 function showemojifuc(){
  setshowemojis(!showemojis);
 }
  async function msgsubmit(e){

    e.preventDefault();
   const res = await axios.post('http://localhost:3001/api/addmessage',{from: personaldata._id   ,to: data._id, message: msg})
   
   if(res.status==299){
    console.log('There is error')
   }else{
    console.log('Sent successfully');
    socket.emit('sendmessage',{from: personaldata._id   ,to: data._id, message: msg});
    const randomid = Math.floor(Math.random() * 100) + 1;
    const newmessage = {message: {text:msg},sender:personaldata._id,_id:randomid}
    setmessages([...messages,newmessage])
    setmsg('');
    
   }
    
  }


  return (<>
    <div id="messagingheight" className='bg-white relative overflow-auto border-2 border-black rounded'>
      
        <div>


        {//chats
        
          messages.map((post)=>{
            index = index+1;

              
           return (
            <div
            key={post._id}
            className={personaldata._id === post.sender ? 'absolute right-0' : 'absolute left-0'}
            style={{
              top: `${index * 50}px`,
            }}
          > <div  className=' bg-[#5865f2] text-white p-2 m-2 border-2 border-b-blue-800 rounded-md'>
                {post.message.text}</div>
                </div>
            )



          })
        }
      
        </div>




        {/*CHat Header*/}

      {data?<div className=' fixed SeventyPercentWIdth h-[30px] bg-yellow-300 border-y-2 border-black rounded flex flex-row'>
        <img src={data.imageurl}/>  {data.name}      and {data.email}
      </div> :<div className='fixed  w-100 h-[30px] bg-yellow-300'>
          LOADING
        </div>}



       {/*Chat BOX*/}
       <div className='fixed w-full bottom-0'>
       {showemojis? <Picker data={dayta}  onEmojiSelect={emojiselecter}/>: <div></div>}
      <input value={msg} onChange={e=>setmsg(e.target.value)} type="text" className=' h-[20px] bg-white border-black border-2'/>
     
      <button onClick={showemojifuc}>showemojis</button>
      <button onClick={msgsubmit}>submit</button>
      </div>

    </div>
    </>)
}

export default ChatBWusers
