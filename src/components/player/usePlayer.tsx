import { useRef, useState } from "react";
import { EnumPlayerQuality, HTMLCustomVideoElement } from "./types/player.type";
import useVideo, { postSeriesData } from "../mainPageComponent/videoFormatter";
import Hls from "hls.js";
const SKIP_TIME_SECONDS = 10;
const usePlayer =({url}:any,{seriesName}:any)=>{   
    const [isShowPlay,setIsShowPlay] = useState(true);
    const [isPlaying,setIsPlaying] = useState(false);
    const playRef = useRef<HTMLCustomVideoElement>(null);
    const [quality,setQuality] = useState(EnumPlayerQuality['1080p']);
    function toggleMute(){
        if(typeof window === "undefined") return;
        const video = document.querySelector('video') as HTMLVideoElement;
        console.log('MORI');
        
        const volumeSlider = document.querySelector('.volume-slider') as HTMLInputElement;
        /* const target = e.target as HTMLInputElement */
        const playContainer = document.querySelector('.player-container') as HTMLDivElement;
        if(video.muted){
            console.log('MORI MUTED');
            if(!video) return;
            video.muted = !video.muted;
            if(!playContainer) return;
            volumeSlider.value = String(0.4);
            playContainer.dataset.volumeLevel = 'low';
            /* volumeSlider.setAttribute('value', String(0.4)); */

        }else{
            console.log('MORI UNMUTED');
            if(!video) return;
            video.muted = !video.muted;
            if(!playContainer) return;
            volumeSlider.value = String(0);
            /* volumeSlider.setAttribute('value', String(0)); */
            playContainer.dataset.volumeLevel = 'muted';
            /* volumeSlider.dispatchEvent(new Event('input')); */
        }
    }
    const togglePlayPause = ()=>{
        if(isPlaying){
            playRef.current?.pause();
        }
        else{
            console.log("URAAAAAA");
            
            playRef.current?.play();
        }
        console.log("URAAAAAA");
        setIsPlaying(!isPlaying)
    }
    const toggleShowPlay = ()=>{
        if(typeof window === "undefined") return;
        /* const video = document.querySelector('video') as HTMLCustomVideoElement; */
        if(isShowPlay){
            togglePlayPause();
            postSeriesData(seriesName,quality);
            console.log('Here is url in usePlayer: ',seriesName);
            
           /*  playRef.current.volume = 0.5; */
        }
        
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
        if(quality === '1080p'){
            console.log('ITS NOT  GOIDA!');
            setQuality(quality);
            playRef.current.src=`${url}-1080p.mp4`
            playRef.current?.play();
            setIsPlaying(true);

        }else if(quality === '720p'){
            useVideo(seriesName,quality).then(src => {
                if (src) {
                    console.log('ITS VIDEOLOGISC GOIDA!');
                    if(!playRef.current) return;
                    playRef.current.pause();
                    playRef.current.src = '';
                    setQuality(quality);
                    console.log('SRC: ',src);
                    
                    playRef.current.src = src;
                    playRef.current.load();
                    togglePlayPause();
                }
            })
            .catch(err => console.error('Failed to fetch video', err));
        }else if(quality === '480p'){
            useVideo(seriesName,quality).then(src => {
                if (!src) {console.error('ITs UNDEIFINED');}
                    console.log('ITS VIDEOLOGISC GOIDA!');
                    if(!playRef.current) return;
                    console.log('ITS SRC: ',src);
                    const video = document.querySelector('video') as HTMLVideoElement;
                    playRef.current.src = '';
                    URL.revokeObjectURL(playRef.current.src);
                    playRef.current.load();

                    /* const videoBlob = new Blob([src],{type:'video/mp4'}) */
                    const videoUrl = URL.createObjectURL(src);
                    console.log('videoUrl: ',videoUrl);
                    
                    playRef.current.src = `${videoUrl}`;
                    console.log('VIDEO SRC: ',video.src);
                    
                    playRef.current.play().catch(err => console.error('Error playing video:', err));
        
                    setQuality(quality);
                    setIsPlaying(!isPlaying);
            })
            .catch(err => console.error('Failed to fetch video', err));
        }

    }
    

    return{
        changeQuality,
        setIsPlaying,
        toggleShowPlay,
        isShowPlay,
        toggleMute,
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