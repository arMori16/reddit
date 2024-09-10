'use client'


import { EnumPlayerQuality, HTMLCustomVideoElement } from "./player.type";
import { SelectQuality } from "./selectQuality";
import usePlayer from "./usePlayer";
import { Maximize, Pause, Play, RotateCcw, RotateCwIcon } from "lucide-react";


const Player = ({url}:any)=>{
    const {playRef,togglePlayPause,changeQuality,toggleFullScreen,quality,isPlaying,skipTime} = usePlayer({url});
    return (
    <div className="overflow-hidden relative w-[100%] max-w-[1000px]">
        <video ref={playRef} controls={false} className='w-full h-full object-cover ' src={`${url}-1080p.mp4`}></video>
        <div className="flex backdrop-blur-xl bottom-[45px] relative  items-center p-3 justify-between z-2000">
            <div className="flex items-center">
                <button onClick={()=>skipTime('backward')}><RotateCcw color="white"/></button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? <Pause color="white"/> : <Play color="white"/>}
                </button>
                <button onClick={()=>skipTime('forward')}><RotateCwIcon color="white"/></button>
            </div>
            <div className="flex w-[110px] justify-between">
                <SelectQuality currentValue={quality} onChange={changeQuality}/>
                <button onClick={toggleFullScreen}>
                    <Maximize color="white"/>
                </button>
            </div>
        </div>


    </div>

    );
}

export default Player;