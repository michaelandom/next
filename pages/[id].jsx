import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
  } from "@firebase/firestore";
  import { getProviders, getSession, useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { useRecoilState } from "recoil";
  import { modalState ,setIsClosedData} from "../atoms/modalAtom";
  import Modal from "../components/Modal";
  import Sidebar from "../components/Sidebar";

  import Post from "../components/Post";
  import { db } from "../firebase";
  import { ArrowLeftIcon } from "@heroicons/react/solid";
 
  import Head from "next/head";
import Login from "../components/Login";
const PostPage = ({trendingResult,followResult,providers}) => {
    const { data: session } = useSession()

    const [isOpen, setIsOpen] = useRecoilState(modalState);
 const [isClosed, setIsClosed] = useRecoilState(setIsClosedData);

 const [post, setPost] = useState();
    const router=useRouter();
    const {id}=router.query;

    useEffect(() => onSnapshot(doc(db,"posts",id),(snapshot)=> setPost(snapshot.data())),[db])
    if(!session) return <Login  providers={providers} />
    return (
        <div className="">
        <Head>
        <title>
          {post?.username} on Twitter: {post?.text}
        </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
  
  
        <main className="bg-black min-h-screen flex relative max-w-[1500px] z-0 mx-auto ">
        <Sidebar />
       
        
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

export default PostPage
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