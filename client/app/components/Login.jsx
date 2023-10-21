'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { HashLoader } from 'react-spinners';
function Login() {
  
  
  const [loading,setloading]= useState(false);
  const[email,setemail]=useState('');
  const[password,setpass]=useState('');
  const[error,seterror]=useState('');

  const router = useRouter()
  useEffect(()=>{
    
    if(localStorage.getItem("userinfo")){
  
      router.push('/');
    }
  },[])
  

  async function submithandler(e){

    e.preventDefault();
    setloading(true)
    seterror('');


    if(!email|| !password ){
      seterror('FILL ALL FIELDS');
      setloading(false);
      return;
    }

   

    const res = await axios.post('http://localhost:3001/api/login',{email,password});

    

    if(res.status==299){
      seterror(res.data.message);
      setloading(false);

      return;
    }

    localStorage.setItem("userinfo", JSON.stringify(res.data));
    setloading(false)

    router.push('/');
    

  }

  return (
    <div>
        <form onSubmit={submithandler} className='flex flex-col gap-2 max-w-[250px] bg-[#5865f2] mx-auto'>
        
        <input className='rounded-full p-2' placeholder='Email' type='email' value={email} onChange={e=>setemail(e.target.value)}/>
        <input className='rounded-full p-2' placeholder='Password' value={password} onChange={e=>setpass(e.target.value)}/>
       
        {error?<p className='bg-yellow-400 text-black font-bold mx-auto p-2 rounded-full border-4 border-black'>Error! {error}</p>:<div></div>}
        
        <div className='w-full bg-[#5865f2] text-center'>
        <button className='text-white bg-black rounded-full py-2 px-4 w-[100px]' type='submit'>
        {
          loading?
          <HashLoader size={25} color='#36d7b7' loading={true}/>
          :
          <div>Login</div>
        }

        </button>
        </div>
            
        </form>

    </div>
  )
}

export default Login