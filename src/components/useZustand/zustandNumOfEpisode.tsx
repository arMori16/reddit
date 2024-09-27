import { create } from "zustand"

type State={
    numOfEpisode:number
}
type Action={
    updateNumOfEpisode:(numOfEpisode:number)=>void,
    getNumOfEpisode:()=>number
}
const numOfEpisodeStorage = create<State & Action>((set:any,get:any)=>({
    numOfEpisode:1,
    updateNumOfEpisode:(updateNumOfEpisode:number)=>set(()=>({updateNumOfEpisode:updateNumOfEpisode})),
    getNumOfEpisode:()=>get().numOfEpisode
}))
export default numOfEpisodeStorage;