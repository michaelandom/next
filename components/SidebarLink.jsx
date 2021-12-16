import { useRecoilState } from "recoil";
import { sideBarState } from "../atoms/modalAtom";
function SidebarLink({text,Icon,active}) {
    const [sideBarItem, setSideBarItem] = useRecoilState(sideBarState);
    return (
        <div className={` text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold text-blue-500"}`} onClick={()=> setSideBarItem(text)}>
         <Icon className={`h-7   ${active && "fill-blue-500"} `}/>
         <span className="hidden xl:inline">{text}</span>
        </div>
    )
}

export default SidebarLink
