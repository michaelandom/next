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
import { modalState, setIsClosedData } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";

import Post from "../components/Post";
import { db } from "../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";

import Head from "next/head";
import Login from "../components/Login";
import ProfileImageComp from "../components/ProfileImageComp";
import Moment from "react-moment";
import { Comment } from "../components/Comment";
import { Widgets } from "../components/Widgets";
const PostPage = ({ trendingResult, followResult, providers }) => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isClosed, setIsClosed] = useRecoilState(setIsClosedData);

  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );
  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot.data())),
    [id]
  );
  if (!session) return <Login providers={providers} />;
  return (
    <div className=''>
      <Head>
        <title>
          {post?.username} on Twitter: {post?.text}
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-black min-h-screen flex relative max-w-[1500px] z-0 mx-auto '>
        <Sidebar />
        <div className='text-white  border-l border-r flex-grow border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]'>
          <div className='flex items-center  px-1.5 py-2  border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black'>
            <div className=' hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0'>
              <ArrowLeftIcon
                className=' h-5 text-white'
                onClick={() => {
                  router.push("/");
                }}
              />
            </div>
            Tweet
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className='pb-72'>
              {comments.map(
                (comment) => (
                
                <Comment key={comment.id} id={comment.id} comment={comment.data()}/>
              )
              
              )
              }
            </div>
          )}
        </div>
        <Widgets trendingResult ={trendingResult} followResult={followResult}/>
        {/* widgets   */}
        {/* modal   */}
        {isOpen && <Modal />}

        {isClosed && (
          <div className=' inset-0 fixed bg-black max-w-[300px]  z-50 min-h-screen'>
            <Sidebar />
          </div>
        )}
      </main>
    </div>
  );
};

export default PostPage;
export async function getServerSideProps(context) {
  const trendingResult = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResult = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props: {
      trendingResult,
      followResult,
      providers,
      session,
    },
  };
}
