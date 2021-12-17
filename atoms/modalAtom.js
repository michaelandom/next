import {atom} from "recoil"

export const modalState=atom({
    key:"modalState",
    default:false,
});
export const postIdState=atom({
    key:"postIdState",
    default:"",
});
export const sideBarState=atom({
    key:"sideBarState",
    default:"Home",
});
export const setIsClosedData=atom({
    key:"setIsClosedData",
    default:false,
});
export const setIsXlData=atom({
    key:"setIsXlData",
    default:false,
});