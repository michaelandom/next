import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, SwitchHorizontalIcon, TrashIcon } from "@heroicons/react/outline";
import { ShareIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import ProfileImageComp from "./ProfileImageComp";
import {
    HeartIcon as HeartIconFilled,
    ChatIcon as ChatIconFilled,
  } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
  } from "@firebase/firestore";
import { db } from "../firebase";
import { IconBar } from "./IconBar";
export const Comment = ({ id, comment }) => {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postID, setPostID] = useRecoilState(postIdState);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

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
          onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
            setLikes(snapshot.docs)
          ),
        [id]
      );
    
      useEffect(
        () =>
          setLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
          ),
        [likes,session]
      );
      const likePost = async () => {
        if (liked) {
          await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
        } else {
          await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
            username: session.user.name,
          });
        }
      };
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-700'>
      <ProfileImageComp imageSrc={comment.userImg} />
      <div className='flex flex-col space-y-2 w-full'>
      <div className="flex justify-between">
      <div className="text-[#6e767d]">
        <div className='inline-block group'>
          <h4 className='inline-block font-bold text-[#d9d9d9] text-[15px] sm:text-base group-hover:underline'>
            {comment.username}
          </h4>
          <span className='ml-1.5 text-sm sm:text-[15px]'>@{comment.tag}</span> .{" "}
          <span className='hover:underline text-sm sm:text-[15px]'>
            <Moment fromNow>{comment.timestamp.toDate()}</Moment>
          </span>
        </div>
        <p className='text-[#d9d9d9] mt-0.5 max-w-lg  text-[15px] sm:text-base'>
          {comment.comment}
        </p>
        </div>
        <div className="icon group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
          </div>
     
        <IconBar id={id} post={comment}/>

        
      </div>
    </div>
  );
};
