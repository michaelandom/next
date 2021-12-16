/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { DotsHorizontalIcon, HomeIcon ,BellIcon,BookmarkIcon,ClipboardIcon,DotsCircleHorizontalIcon,HashtagIcon,UserIcon,InboxIcon} from "@heroicons/react/solid";
import {
  BellIcon as BellIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  ClipboardIcon as ClipboardIconOutline,
  DotsCircleHorizontalIcon as DotsCircleHorizontalIconOutline,
  HashtagIcon as HashtagIconOutline,
  HomeIcon as HomeIconOutline,
  InboxIcon as InboxIconOutline,
  UserIcon as UserIconOutline,
} from "@heroicons/react/outline";
import ProfileImageComp from "./ProfileImageComp";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { sideBarState } from "../atoms/modalAtom";
import { useState } from "react";

function Sidebar() {
  const { data: session } = useSession();
  const [sideBarItem, setSideBarItem] = useRecoilState(sideBarState);
 
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" alt="" width={30} height={30} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24 ">
        <SidebarLink  text="Home" Icon={sideBarItem === "Home" ? HomeIcon:HomeIconOutline} active={sideBarItem==="Home" && true} />
        <SidebarLink  text="Explore" Icon={sideBarItem === "Explore"? HashtagIcon:HashtagIconOutline} active={sideBarItem==="Explore" && true} />
        <SidebarLink text="Notification" Icon={sideBarItem === "Notification"?BellIcon:BellIconOutline} active={sideBarItem==="Notification" && true} />
        <SidebarLink  text="Messages" Icon={sideBarItem === "Messages"?InboxIcon:InboxIconOutline} active={sideBarItem==="Messages" && true}/>
        <SidebarLink  text="Bookmarks" Icon={sideBarItem === "Bookmarks"?BookmarkIcon:BookmarkIconOutline} active={sideBarItem==="Bookmarks" && true} />
        <SidebarLink  text="Lists" Icon={sideBarItem === "Lists"?ClipboardIcon:ClipboardIconOutline} active={sideBarItem==="Lists" && true} />
        <SidebarLink   text="Profiles" Icon={sideBarItem === "Profiles"?UserIcon:UserIconOutline} active={sideBarItem==="Profiles" && true} />
        <SidebarLink  text="More" Icon={sideBarItem === "Home"? DotsCircleHorizontalIcon:DotsCircleHorizontalIconOutline} active={sideBarItem==="More" && true} />
      </div>
      <button className="hidden xl:inline ml-auto w-56 h-[52px] rounded-full bg-[#1d9bf0] text-white text-lg font-bold shadow-md hover:bg-[#1a8cd8] ">
        Send
      </button>
      <div className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto">
        <ProfileImageComp
          imageSrc={session.user?.image}
           style="w-10 h-10 rounded-full xl:mr-2.5"
        />
        
        <div className="hidden xl:inline leading-5" onClick={signOut} >
          <h4 className="font-bold text-white">{session.user?.name}</h4>
          <p className="text-[#d9d9d9]">{"@" + session.user?.tag}</p>
          
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
}

export default Sidebar;
