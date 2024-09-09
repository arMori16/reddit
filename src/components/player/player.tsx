'use client'

import { useRef, useState } from "react";
import { EnumPlayerQuality } from "./enumQuality";

const SKIP_TIME_SECONDS = 10;

const Player = ({url}:any)=>{
    const [isPlaying,setIsPlaying] = useState(true);
    const playRef = useRef<HTMLVideoElement>(null);
    const [quality,setQuality] = useState(EnumPlayerQuality['1080p']);
    const toggleButton = ()=>{
        if(isPlaying){
            playRef.current?.pause();
        }
        else{
            playRef.current?.play();
        }
    }
    const skipTime = (type?: 'forward' | 'backward')=>{
        if (!playRef.current?.currentTime) return;
        if(type === 'forward'){
            playRef.current.currentTime += SKIP_TIME_SECONDS;
        }
        else{
            if(playRef.current?.currentTime >SKIP_TIME_SECONDS){
                playRef.current.currentTime -= SKIP_TIME_SECONDS;
            }
        }
    }
    return (
    <div className="overflow-hidden">
        <video ref={playRef} controls={false} className='flex relative w-100% max-w-[1000px] h-auto overflow-hidden object-cover ' src={`${url}`}></video>
        <div>

        </div>


    </div>

    );
}

export default Player;