import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { getProviders,getSession,useSession } from 'next-auth/react'
import Login from '../components/Login'
import { useRecoilState } from "recoil";
import { useState,useEffect } from "react";

import { setIsClosedData,setIsXlData,modalState } from "../atoms/modalAtom";
import Modal from '../components/Modal'
import Example from '../components/Tabs'

export default function Home({trendingResult,followResult,providers}) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState);

 
 const [isClosed, setIsClosed] = useRecoilState(setIsClosedData);
 const [isXl, setIsXl] = useRecoilState(setIsXlData);

 const [screenSize, getDimension] = useState({
  dynamicWidth:typeof window !== "undefined" && window.innerWidth,
  dynamicHeight:typeof window !== "undefined" && window.innerHeight
});

const setDimension = () => {
  if(window.innerWidth>640 && isClosed){
    setIsClosed(false);
  }
  if(window.innerWidth>=1280 ){
    setIsXl(true);
  }else{
    setIsXl(false);
  }
  getDimension({
    dynamicWidth:typeof window !== "undefined" && window.innerWidth,
    dynamicHeight:typeof window !== "undefined" && window.innerHeight
  })
}

useEffect(() => {
  window.addEventListener('resize', setDimension);
  
  return(() => {
      window.removeEventListener('resize', setDimension);
  })
})
  if(!session) return <Login  providers={providers} />
  return (
    <div className="">
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <main className="bg-black min-h-screen flex relative max-w-[1500px] z-0 mx-auto ">
      <Sidebar />
     
      <Feed />
      <Example />
      {/* widgets   */}
      {/* modal   */}
     {isOpen && <Modal />}

      { isClosed && <div className=' inset-0 fixed bg-black max-w-[300px]  z-50 min-h-screen'>
      <Sidebar />
   </div>   
}
      </main> 
      
    </div>
  )
}

export async function getServerSideProps(context){
  const trendingResult= await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  ) 
  const followResult= await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  ) 
  const providers=await getProviders();
  const session=await getSession(context);
  return {
    props:{
      trendingResult,
      followResult,
      providers,
      session,

    }
  }
}