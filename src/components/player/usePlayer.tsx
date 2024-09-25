import { useCallback, useEffect, useRef, useState } from "react";
import { EnumPlayerQuality, HTMLCustomVideoElement } from "./types/player.type";
import useVideo, { postSeriesData } from "../mainPageComponent/videoFormatter";
import Hls from "hls.js";
import axios from "../api/axios";
import { timePosition } from "../useZustand/zustandSaveTime";
import playbackPosition, { State } from "../useZustand/zustandStorage";
const SKIP_TIME_SECONDS = 10;
const usePlayer =({url}:any,{seriesName}:any)=>{   
    const [isPlaying,setIsPlaying] = useState(false);
    const [isShowPlay,setIsShowPlay] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const isPlayingRef = useRef(isPlaying);
    const playRef = useRef<HTMLCustomVideoElement>(null);
    const [quality,setQuality] = useState(EnumPlayerQuality['1080p']);
    const updateCurrentTime = playbackPosition((state)=>state.updateCurrentTime)
    
    useEffect(() => {
        if(typeof window === "undefined") return;
        const currentLocalTime = localStorage.getItem('currentTime');
        const video = document.querySelector('video');
        if (video) {
            const handleTimeUpdate = () => {
                if (isPlaying) { // Условие для активации
                    const currentTime = String(currentLocalTime);
                    const newState: State = { currentTime };
                    
                    // Обновление состояния
                    updateCurrentTime(newState);
                    
                }
            };

            video.addEventListener("timeupdate", handleTimeUpdate);

            // Очистка события
            return () => {
                video.removeEventListener("timeupdate", handleTimeUpdate);
            };
        }
    }, [isPlaying, updateCurrentTime]);

    const togglePlayPause = ()=>{
        if(typeof window === "undefined") return;
        const currentLocalTime = localStorage.getItem('currentTime')
        if(isPlaying){
            playRef.current?.pause();
        }
        else{
            if(!playRef.current) return;
            playRef.current.currentTime = Number(currentLocalTime);
            playRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    }
    const toggleShowPlay = ()=>{
        if(typeof window === "undefined") return;
        if(isShowPlay){
            spaceButton();
            
            togglePlayPause();
            postSeriesData(seriesName,quality);
            console.log('Here is url in usePlayer: ',seriesName);
            
        }
        
        setIsShowPlay(!isShowPlay);
    }
    /* Duration */
    
    /* Duration */
    
    
    const spaceButton = useCallback(() => {
        if (typeof window === "undefined") return;
        
        const handleKeydown = (e:KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                setIsPlaying((prevIsPlaying) => {
                    if (prevIsPlaying) {
                        playRef.current?.pause();
                    } else {
                        playRef.current?.play();
                    }
                    
                    return !prevIsPlaying; // Возвращаем новое состояние
                });
            }
        };
        
        document.addEventListener("keydown", handleKeydown);
        
        // Для предотвращения утечек памяти стоит удалить обработчик при размонтировании компонента
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [playRef, setIsPlaying]);
    const skipTime = (type?: 'forward' | 'backward')=>{
        if (!playRef.current?.currentTime) return;
        if(type === 'forward'){
            console.log('OHIO');
            
            playRef.current.currentTime += SKIP_TIME_SECONDS;
        }
        else{
            if(playRef.current?.currentTime >SKIP_TIME_SECONDS){
                console.log('OHIO');
                playRef.current.currentTime -= SKIP_TIME_SECONDS;
            }
        }
    }
    const toggleFullScreen = ()=>{
        if(!playRef.current)return;
        if(typeof window === "undefined") return;
        const fullScreenBtn = document.querySelector('.full-screen-btn');
        const controls = document.querySelector('.controls') as HTMLDivElement;
        const playerContainer = document.querySelector('.player-container') as HTMLDivElement;
        fullScreenBtn?.addEventListener("click",toggleFullScreen)
        if(document.fullscreenElement === null){
            if(playRef.current.requestFullScreen){
                (playerContainer as any).requestFullscreen();
            }else if(playRef.current.mozRequestFullScreen){
                (playerContainer as any).mozRequestFullScreen();
            }else if(playRef.current?.webkitRequestFullScreen){
                (playerContainer as any).webkitRequestFullScreen();
            }else if(playRef.current.msRequestFullScreen){
                if (controls) {
                    controls.style.display = "flex"; // Показать кастомные контроллеры в полноэкранном режиме
                }
                (playerContainer as any).msRequestFullScreen();
            }

        }
        else{
            document.exitFullscreen();
        }
    }
    
    const changeQuality=(quality:EnumPlayerQuality)=>{
        if(typeof window === "undefined") return;
        const currentLocalTime = localStorage.getItem('currentTime');
        const controls = document.querySelector('.controls') as HTMLDivElement;
        console.log('LOCALSTORAGE: ',currentLocalTime);
        
        if(!playRef.current) return;
        if(quality === '1080p'){
            if(isPlaying){
                setIsPlaying(false);
            }
            setIsLoading(true);
            playRef.current.src=`${url}-1080p.mp4`;
            controls.classList.add('disabled-controls');
            setTimeout(()=>{
                if(!playRef.current) return;
                playRef.current.currentTime = Number(currentLocalTime);
                playRef.current?.play().catch(err => console.error('Error playing video:', err));
                setIsPlaying(true);
                controls.classList.remove('disabled-controls');
                setQuality(quality);
                setIsLoading(false);
            },3000)

        }else if(quality === '720p'){
            useVideo(seriesName,quality).then(src => {
                if (!src) {console.error('ITs UNDEIFINED');}
                    if(!playRef.current) return;
                    console.log('ITS SRC: ',src);
                    playRef.current.src = '';
                    URL.revokeObjectURL(playRef.current.src);
                    playRef.current.load();
                    
                    if(isPlaying){
                        setIsPlaying(false);
                    }
                    setIsLoading(true);
                    controls.classList.add('disabled-controls');
                    playRef.current.src = `http://localhost:3001/catalog/${seriesName}/${quality}`;
                    setTimeout(()=>{
                        if(!playRef.current) return;
                        playRef.current.currentTime = Number(currentLocalTime);
                        playRef.current?.play().catch(err => console.error('Error playing video:', err));
                        setIsPlaying(true);
                        setQuality(quality);
                        controls.classList.remove('disabled-controls');
                        setIsLoading(false);
                    },3000)
            })
            .catch(err => console.error('Failed to fetch video', err));
        }else if(quality === '480p'){
            useVideo(seriesName,quality).then(src => {
                if (!src) {console.error('ITs UNDEIFINED');}
                    if(typeof window === "undefined") return;

                    console.log('VIDEOSRC: ',src);
                    
                    if(!playRef.current) return;
                    console.log('ITS SRC: ',src);
                    const video = document.querySelector('video') as HTMLVideoElement;
                    URL.revokeObjectURL(playRef.current.src);
                    playRef.current.src = '';
                    playRef.current.load();
                    
                    console.log('VIDEO SRC: ',video.src);
                    
                    if(isPlaying){
                        setIsPlaying(false);
                    }
                    setIsLoading(true);
                    controls.classList.add('disabled-controls');
                    playRef.current.src = `http://localhost:3001/catalog/${seriesName}/${quality}`;
                    setTimeout(()=>{
                        if(!playRef.current) return;
                        playRef.current.currentTime = Number(currentLocalTime);
                        playRef.current?.play().catch(err => console.error('Error playing video:', err));
                        setIsPlaying(true);
                        setQuality(quality);
                        controls.classList.remove('disabled-controls');
                        setIsLoading(false);
                    },3000)
    
                })
            .catch(err => console.error('Failed to fetch video', err));
        }

    }
    

    return{
        changeQuality,
        setIsPlaying,
        isLoading,
        setIsLoading,
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