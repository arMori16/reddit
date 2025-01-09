import { create } from "zustand";


type State = {
    isShow:boolean,
    showVoices:boolean,
    showRate:boolean
}

type Action={
    updateIsShow:(isShow:boolean)=>void,
    getIsShow:()=>boolean,
    updateShowVoices:(isShow:boolean)=>void,
    getShowVoices:()=>boolean,
    updateShowRate:(isShow:boolean)=>void,
    getShowRate:()=>boolean,
}

const menuStorage = create<State & Action>((set:any,get:any)=>({
    isShow:false,
    showRate:false,
    showVoices:false,
    updateIsShow:(isShow:boolean)=>set({isShow}),
    getIsShow:()=>get().isShow,
    updateShowVoices:(showVoices:boolean)=>set({showVoices}),
    getShowVoices:()=>get().showVoices,
    updateShowRate:(showrate:boolean)=>set({showrate}),
    getShowRate:()=>get().showrate
}))

export default menuStorage;