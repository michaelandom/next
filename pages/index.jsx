import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { getProviders,getSession,useSession } from 'next-auth/react'
import Login from '../components/Login'


export default function Home({trendingResult,followResult,providers}) {
  const { data: session } = useSession()

  if(!session) return <Login  providers={providers} />
  return (
    <div className="">
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      <Sidebar />
      <Feed />
      {/* widgets   */}
      {/* modal   */}
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