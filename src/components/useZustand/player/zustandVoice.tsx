import { create } from "zustand"

type State={
    voice:string,
    episodes:number
}

type Action={
    setVoice:(voice:string)=>void,
    getVoice:()=>string,
    setEpisodes:(episode:number)=>void,
    getEpisodes:()=>number,
}

const voiceStorage = create<State & Action>((set:any,get:any)=>({
    voice:'',
    episodes:0,
    setVoice:(voice:string)=>set(()=>({voice:voice})),
    getVoice:()=>get().voice,
    setEpisodes:(episodes:number)=>set(()=>({episodes:episodes})),
    getEpisodes:()=>get().episodes,
}))
export default voiceStorage;