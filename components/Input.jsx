/* eslint-disable @next/next/no-img-element */
import {
  PhotographIcon,
  CalculatorIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRef, useState } from "react";
import ProfileImageComp from "./ProfileImageComp";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL ,ref ,uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [shoeEmojis, setShoeEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setselectedFile] = useState(null);
  const filePickerRef = useRef("");
  const addImageToPost = (e) => {

    const reader= new FileReader();
 if(e.target.files[0]){
reader.readAsDataURL(e.target.files[0]);
 }

 reader.onload=(readerEvent) =>{
   setselectedFile(readerEvent.target.result);
 }

  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setInput(input + emoji);
  };

  const sendPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
       uid:session.user.uid,
       username:session.user.name,
       userImg:session.user.image,
       tag:session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });
    const imageRef = await ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      });
    }

    setLoading(false);
    setInput("");
    setselectedFile(null);
    setShoeEmojis(false);
  };

  return (
    <div
      className={` border-b border-gray-700 p-3  flex space-x-3 overflow-y-scroll ${loading && "opacity-60"}`}>
      <ProfileImageComp
        imageSrc={session.user.image}
        style='w-11 h-11 rounded-full cursor-pointer'
      />
      
      <div className='w-full divide-y divide-gray-700'>
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            rows='2'
            onChange={(e) => setInput(e.target.value)}
            placeholder="what's happening?"
            className='w-full bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide  min-h-[50px]'
          />
        </div>
        {selectedFile && (
          <div className='relative'>
            <div
              className='absolute w-8 h-9 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
              onClick={() => setselectedFile(null)}>
              <XIcon className='text-white h-5 ' />
            </div>
            <img
              src={selectedFile}
              alt=''
              className='rounded-2xl max-h-80 object-contain '
            />
          </div>
        )}
{
  !loading &&(
    <div className='flex items-center justify-between pt-2.5 '>
    <div className='flex items-center'>
      <div className='icon' onClick={() => filePickerRef.current.click()}>
        <PhotographIcon className='h-[22px] text-[#1b9bf0]' />
        <input
          type='file'
          hidden
          ref={filePickerRef}
          onChange={addImageToPost}
        />
      </div>

      <div className='icon rotate-90'>
        <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
      </div>

      <div className='icon' onClick={() => setShoeEmojis(!shoeEmojis)}>
        <EmojiHappyIcon className='text-[#1d9bf0] h-[22px]' />
      </div>

      <div className='icon'>
        <CalculatorIcon className='text-[#1d9bf0] h-[22px]' />
      </div>
      {shoeEmojis && (
        <Picker
          onSelect={addEmoji}
          style={{
            position: "absolute",
            marginTop: "465px",
            marginLeft: -40,
            maxWidth: "320px",
            borderRadius: "20px",
          }}
          theme='dark'
        />
      )}
    </div>
    <button
      disabled={!input.trim() && !selectedFile}
      onClick={sendPost}
      className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'>
      Save
    </button>
  </div>
  )
}
  


      </div>
    </div>
  );
}

export default Input;
