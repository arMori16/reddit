import { create } from "zustand"

type State={
    voice:string
}

type Action={
    setVoice:(voice:string)=>void,
    getVoice:()=>string
}

const voiceStorage = create<State & Action>((set:any,get:any)=>({
    voice:'',
    setVoice:(voice:string)=>set(()=>({voice:voice})),
    getVoice:()=>get().voice,
}))
export default voiceStorage;