"use client";

import {  createContext,useState } from "react";

export const Usercontext = createContext()




export default function ContextProvider({children}) {
const[selected,setselected]= useState(undefined);
const [socket,setsocket] = useState(undefined)

  return (
    <Usercontext.Provider value={{ selected, setselected,socket,setsocket }}>
      {children}
      </Usercontext.Provider>
  )
}


