import { create } from "zustand";


type State = {
    isShow:boolean,
    showVoices:boolean
}

type Action={
    updateIsShow:(isShow:boolean)=>void,
    getIsShow:()=>boolean,
    updateShowVoices:(isShow:boolean)=>void,
    getShowVoices:()=>boolean
}

const menuStorage = create<State & Action>((set:any,get:any)=>({
    isShow:false,
    showVoices:false,
    updateIsShow:(isShow:boolean)=>set({isShow}),
    getIsShow:()=>get().isShow,
    updateShowVoices:(showVoices:boolean)=>set({showVoices}),
    getShowVoices:()=>get().showVoices
}))

export default menuStorage;