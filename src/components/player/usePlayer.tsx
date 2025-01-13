import { useCallback, useEffect, useRef, useState } from "react";
import { EnumPlayerQuality, HTMLCustomVideoElement } from "./types/player.type";
import useVideo from "./videoFormatter";
import Hls from "hls.js";
import axios from "../api/axios";
import { timePosition } from "../useZustand/zustandSaveTime";
import playbackPosition, { State } from "../useZustand/zustandStorage";
import numOfEpisodeStorage from "../useZustand/player/zustandNumOfEpisode";
import voiceStorage from "../useZustand/player/zustandVoice";
import Cookies from "js-cookie";
const SKIP_TIME_SECONDS = 10;
const usePlayer =(seriesName:string,seriesViewName:string)=>{   
    const [isPlaying,setIsPlaying] = useState(false);
    const [isShowPlay,setIsShowPlay] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const isPlayingRef = useRef(isPlaying);
    const playRef = useRef<HTMLCustomVideoElement>(null);
    const [quality,setQuality] = useState(EnumPlayerQuality['1080p']);
    const {getNumOfEpisode,updateNumOfEpisode} = numOfEpisodeStorage();
    const {getVoice,setVoice} = voiceStorage();
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

            const handleClick = () => {
                togglePlayPause();
            };
            
            playRef.current?.addEventListener("click", handleClick);
            // Очистка события
            return () => {
                video.removeEventListener("timeupdate", handleTimeUpdate);
                playRef.current?.removeEventListener("click", handleClick);
            };
        }
    }, [isPlaying, updateCurrentTime]);
    if(isShowPlay){
        console.log('isShowPlay TRUE!!');
        
    }
    const togglePlayPause = ()=>{
        if(typeof window === "undefined") return;
        const currentLocalTime = localStorage.getItem('currentTime')
        if(isPlaying){
            playRef.current?.pause();
        }
        else{
            if(!playRef.current) return;
            playRef.current.currentTime = Number(currentLocalTime);
            console.log(`PLAYREF CURRENT SRC: `,playRef.current.src);
            
            playRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    }
    const toggleShowPlay = ()=>{
        if(typeof window === "undefined") return;
        if(isShowPlay){
            spaceButton();
            togglePlayPause();
            axios.post('/user/lastViewedSeries',{
                seriesName:seriesName,
                seriesViewName:seriesViewName,
                episode:getNumOfEpisode()
            },{
                headers:{
                    'Authorization':`Bearer ${Cookies.get('accessToken')}`
                }
            })
            /* postSeriesData(seriesName,quality); */
            console.log('Here is url in usePlayer: ',seriesName);
            
        }
        
        setIsShowPlay(!isShowPlay);
    }

    const choosedEpisode = ()=>{
        if (typeof window === "undefined") return;
        const currentEpisode = localStorage.getItem('episode');
        if(!currentEpisode){
            localStorage.setItem('episode','1');
        }
        if(!playRef.current) return;
        playRef.current.src = `http://localhost:3001/catalog/${seriesName}/${encodeURIComponent(getVoice())}/${getNumOfEpisode()}/${quality}`;
    }
    const isFocusableElement = (element: HTMLElement | null): boolean => {
        if (!element) return false;
        const focusableTags = ["INPUT", "TEXTAREA"];
        const isFocusable = focusableTags.includes(element.tagName) || element.isContentEditable;
        console.log("Element:", element, "Is Focusable:", isFocusable);
        return isFocusable;
    };
    
    const spaceButton = useCallback(() => {
        if (typeof window === "undefined") return;
        const handleKeydown = (e:KeyboardEvent) => {
            if (e.code === 'Space') {
                const activeElement = document.activeElement as HTMLElement;
                console.log("Active element:", activeElement);

                if (isFocusableElement(activeElement)) {
                    console.log("Focused on a focusable element. Ignoring Space key.");
                    return;
                }
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
        const video = document.querySelector('video');
        const fullScreenBtn = document.querySelector('.full-screen-btn');
        const controls = document.querySelector('.controls') as HTMLDivElement;
        const playerContainer = document.querySelector('.player-container') as HTMLDivElement;
        fullScreenBtn?.addEventListener("click",toggleFullScreen);
        playerContainer.classList.add('fullscreen');
        video?.classList.add("fullscreen");
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
            playerContainer.classList.remove('fullscreen');
            video?.classList.remove("fullscreen");
            document.exitFullscreen();
        }
    }
    
    const changeQuality=(quality:EnumPlayerQuality)=>{
        if(typeof window === "undefined") return;
        const currentLocalTime = localStorage.getItem('currentTime');
        const controls = document.querySelector('.controls') as HTMLDivElement;
        console.log('LOCALSTORAGE: ',currentLocalTime);
        const currentEpisode = localStorage.getItem('episode');
        useVideo(seriesName,getVoice(),quality,getNumOfEpisode()).then(src => {
            if (!src) {console.error('ITs UNDEIFINED');}
            if(!playRef.current) return;
            console.log('ITS SRC: ',src);
            /* Clearing */
            
            playRef.current.src = '';
            URL.revokeObjectURL(playRef.current.src);
            playRef.current.load();

            /* Clearing */
            if(isPlaying){
                setIsPlaying(false);
            }
            setIsLoading(true);
            controls.classList.add('disabled-controls');
            playRef.current.src = `http://localhost:3001/catalog/${seriesName}/${encodeURIComponent(getVoice())}/${getNumOfEpisode()}/${quality}`;
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
    

    return{
        changeQuality,
        setIsPlaying,
        choosedEpisode,
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