'use client';

import { create } from "zustand";

export type State={
    currentTime:string
}

type Action = {
    updateCurrentTime:(currentTime:State) =>void
}

const playbackPosition = create<State & Action>((set:any)=>({
    currentTime:'0',
    updateCurrentTime:(currentTime:State)=>set(()=>({currentTime:currentTime}))
}))

export default playbackPosition;