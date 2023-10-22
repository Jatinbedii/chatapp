'use client'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'

function page() {
    const [usersdata,setusersdata] = useState();

    useEffect(()=>{
        const userdata = localStorage.getItem("userinfo")
       const userdataobject= JSON.parse(userdata);
        setusersdata(userdataobject);
    },[])


  return (<>
    <HeaderComponent/>
    <a href='/'>back</a>
    {usersdata?
    <div>
    name: {usersdata.name}  <button>Change</button>
    email: {usersdata.email} 
    profilepic : <img src={usersdata.imageurl} alt='pfp' height={'500px'} width={'500px'}/>
    <button>Change</button>
    </div>
    :
    <div></div>}
    </>
  )
}

export default page