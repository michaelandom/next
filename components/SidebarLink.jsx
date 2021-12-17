import { useRecoilState } from "recoil";
import { sideBarState,setIsClosedData } from "../atoms/modalAtom";
function SidebarLink({text,Icon,active}) {
    const [sideBarItem, setSideBarItem] = useRecoilState(sideBarState);
     
  const [isClosed, setIsClosed] = useRecoilState(setIsClosedData);
    return (
        <div className={`${!isClosed ?"justify-center" :"justify-start"} text-[#d9d9d9] p-2 w-full flex items-center  xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold text-blue-500"}`} onClick={()=> setSideBarItem(text)}>
         <Icon className={`h-7   ${active && "fill-blue-500"} `}/>
         <span className={`${!isClosed && "hidden"} xl:inline`}>{text}</span>
        </div>
    )
}

export default SidebarLink
