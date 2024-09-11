import { useRef, useState } from "react";
import { EnumPlayerQuality, HTMLCustomVideoElement } from "./types/player.type";
const SKIP_TIME_SECONDS = 10;
const usePlayer =({url}:any)=>{   
    const [isShowPlay,setIsShowPlay] = useState(true);
    const [isPlaying,setIsPlaying] = useState(false);
    const playRef = useRef<HTMLCustomVideoElement>(null);
    const [quality,setQuality] = useState(EnumPlayerQuality['1080p']);
    const togglePlayPause = ()=>{
        if(isPlaying){
            playRef.current?.pause();
        }
        else{
            playRef.current?.play();
        }
        setIsPlaying(!isPlaying)
    }
    const toggleShowPlay = ()=>{
        if(isShowPlay){
            playRef.current?.play();
        }
        setIsPlaying(!isPlaying)
        setIsShowPlay(!isShowPlay);
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
    const toggleFullScreen = ()=>{
        if(!playRef.current)return;
        if(playRef.current.requestFullScreen){
           playRef.current.requestFullscreen();
        }else if(playRef.current.mozRequestFullScreen){
            playRef.current.mozRequestFullScreen();
        }else if(playRef.current?.webkitRequestFullScreen){
            playRef.current.webkitRequestFullScreen();
        }else if(playRef.current.msRequestFullScreen){
            playRef.current.msRequestFullScreen();
        }
    }
    const changeQuality=(quality:EnumPlayerQuality)=>{
        if(!playRef.current) return;
        setQuality(quality);
        playRef.current.src=`${url}-${quality}.mp4`
        playRef.current?.play();
        setIsPlaying(true);

    }
    return{
        changeQuality,
        toggleShowPlay,
        isShowPlay,
        setIsShowPlay,
        togglePlayPause,
        toggleFullScreen,
        skipTime,
        playRef,
        isPlaying,
        quality
    }
}

export default usePlayer;