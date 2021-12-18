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
export const IconBar = ({id,post,postPage}) => {
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
        <div
        className={`text-[#6e767d] flex justify-between w-10/12 ${
          postPage && "mx-auto"
        }`}
      >
        <div
          className="flex items-center space-x-1 group"
          onClick={(e) => {
            e.stopPropagation();
            setPostID(id);
            setIsOpen(true);
          }}
        >
          <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          {comments.length > 0 && (
            <span className="group-hover:text-[#1d9bf0] text-sm">
              {comments.length}
            </span>
          )}
        </div>

        {session.user.uid === post?.uid ? (
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              deleteDoc(doc(db, "posts", id));
              router.push("/");
            }}
          >
            <div className="icon group-hover:bg-red-600/10">
              <TrashIcon className="h-5 group-hover:text-red-600" />
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-green-500/10">
              <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
            </div>
          </div>
        )}

        <div
          className="flex items-center space-x-1 group"
          onClick={(e) => {
            e.stopPropagation();
            likePost();
          }}
        >
          <div className="icon group-hover:bg-pink-600/10">
            {liked ? (
              <HeartIconFilled className="h-5 text-pink-600" />
            ) : (
              <HeartIcon className="h-5 group-hover:text-pink-600" />
            )}
          </div>
          {likes.length > 0 && (
            <span
              className={`group-hover:text-pink-600 text-sm ${
                liked && "text-pink-600"
              }`}
            >
              {likes.length}
            </span>
          )}
        </div>

        <div className="icon group">
          <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
        </div>
        <div className="icon group">
          <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
        </div>
      </div>
    )
}
