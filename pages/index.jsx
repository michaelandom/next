import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { getProviders,getSession,useSession } from 'next-auth/react'
import Login from '../components/Login'
 import { useState } from 'react'


export default function Home({trendingResult,followResult,providers}) {
  const { data: session } = useSession()
 const [isClosed,setIsClosed] = useState(false);
  if(!session) return <Login  providers={providers} />
  return (
    <div className="">
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <main className="bg-black min-h-screen flex max-w-[1500px] z-0 mx-auto ">
      <Sidebar />
     
      <Feed />
      {/* widgets   */}
      {/* modal   */}
      { false && <div className=' inset-0 fixed bg-black max-w-[300px]  z-50 min-h-screen'>
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