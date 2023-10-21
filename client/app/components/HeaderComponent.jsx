import React from 'react'
import { useRouter } from 'next/navigation'
import { useContext} from 'react'
import { Usercontext } from '@/context/context';


function HeaderComponent() {
  const router = useRouter();
  const {socket} = useContext(Usercontext);

  function logout(){
    localStorage.removeItem("userinfo");
    socket.disconnect();
    router.push('/login');
  }
  return (
    <div className='w-100 h-[35px]'>
      <button className='bg-red-500' onClick={logout}>LOGOUT</button>
    </div>
  )
}

export default HeaderComponent
