'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { HashLoader } from 'react-spinners';

function Register() {
  
  const[loading,setloading]= useState(false);
  const[name,setname]=useState('');
  const[email,setemail]=useState('');
  const[password,setpass]=useState('');
  const[confirmpass,setconfrmpass]=useState('');
  const[error,seterror]=useState('');
  const[image,setimage]=useState('http://res.cloudinary.com/jatinbedi/image/upload/v1697558131/nfwlutvyokkwwzywphy2.jpg');

  const router = useRouter()
  
  useEffect(()=>{
    
    if(localStorage.getItem("userinfo")){
     
      router.push('/');
    }
  },[])
  

  async function submithandler(e){

    e.preventDefault();
    setloading(true);
    seterror('');


    if(!email|| !password || !confirmpass || !name){
      seterror('FILL ALL FIELDS')
      setloading(false)
      return;
    }

    if(password!= confirmpass){
      seterror('PASSWORD NOT MATCHING')
      setloading(false)

      return;
    }

    const res = await axios.post('http://localhost:3001/api/register',{name,email,password,imageurl:image});

    

    if(res.status==299){
      seterror(res.data.message);
      setloading(false)

      return;
    }

    localStorage.setItem("userinfo", JSON.stringify(res.data));
    setloading(false)

    router.push('/');


  }
  async function imageupload(imagegot){
    setloading(true);
    console.log(imagegot);
    const data = new FormData();
    data.append("file",imagegot);
    data.append("upload_preset","chatapp");
    data.append("cloud_name","jatinbedi");

    axios.post("https://api.cloudinary.com/v1_1/jatinbedi/image/upload",data).then(res=>{setimage(res.data.url)}).catch(err=>console.log(err))
    setloading(false)
  }
  return (
    <div>
        <form onSubmit={submithandler} className='flex flex-col gap-2 max-w-[250px] bg-[#5865f2] mx-auto'>
        <input className='rounded-full p-2' placeholder='Name' value={name} onChange={e=>setname(e.target.value)}/>
        <input className='rounded-full p-2' placeholder='Email' type='email' value={email} onChange={e=>setemail(e.target.value)}/>
        <input className='rounded-full p-2' placeholder='Password' value={password} onChange={e=>setpass(e.target.value)}/>
        <input className='rounded-full p-2' placeholder='Confirm Password' value={confirmpass} onChange={e=>setconfrmpass(e.target.value)}/>
        <input type="file" onChange={e=>imageupload(e.target.files[0])}/>
        {error?<p className='bg-yellow-400 text-black font-bold mx-auto p-2 rounded-full border-4 border-black'>Error! {error}</p>:<div></div>}
        <div className='w-full bg-[#5865f2] text-center'>
        <button className='text-white bg-black rounded-full py-2 px-4 w-[100px]' type='submit'>
        {
          loading?
          <HashLoader size={25} color='#36d7b7' loading={true}/>
          :
          <div>Register</div>
        }

        </button>
        </div>
        </form>

    </div>
  )
}

export default Register