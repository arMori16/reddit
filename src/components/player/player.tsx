'use client'


import { EnumPlayerQuality, HTMLCustomVideoElement } from "./types/player.type";
import { SelectQuality } from "./selectQuality";
import usePlayer from "./usePlayer";
import '@/components/player/player.css'
import { Loader, LucideVolumeOff, Maximize, Pause, Play, PlaySquare, RotateCcw, RotateCwIcon, Video, Volume1, Volume2 } from "lucide-react";
import  volumeLogic, { initializeVideoControls } from "./videoLogic";
import { useEffect, useRef, useState } from "react";
import SkipTimeFunction from "@/components/player/SkipTime";
import { timePosition } from "../useZustand/zustandSaveTime";
import numOfEpisodeStorage from "../useZustand/player/zustandNumOfEpisode";
import voiceStorage from "../useZustand/player/zustandVoice";


const Player = ({ seriesName,episode }: { seriesName: string,episode:number })=>{
    const [isControlsVisible, setIsControlsVisible] = useState(false); // Состояние видимости контролов
    const {playRef,isLoading,choosedEpisode,setIsLoading,togglePlayPause,changeQuality,toggleFullScreen,setIsPlaying,quality,isPlaying,isShowPlay,setIsShowPlay,toggleShowPlay,skipTime} = usePlayer({seriesName});
    const [isSkipTime,setIsSkipTime] = useState(false);
    const [forceRender, setForceRender] = useState(false);
    /* const [numOfEpisode,setNumOfEpisode] = useState(1); */
    const {getNumOfEpisode,updateNumOfEpisode} = numOfEpisodeStorage();
    const {getVoice} = voiceStorage();
    const toggleControlsVisibility = () => {
        setIsControlsVisible((prev) => !prev); // Переключаем видимость контролов
    };
    useEffect(()=>{
        if(isShowPlay){
            setIsControlsVisible(false);
        }

    },[isShowPlay])
    /* const loading = ()=>{
        setTimeout(()=>{
            setIsLoading(false);
            toggleShowPlay();
            toggleControlsVisibility();
        },4000)
    } */
    const handleStart = () => {
        setIsPlaying(false);  // Скрыть кнопку и показать контроллеры
        togglePlayPause();
        setIsShowPlay(false);    // Начать воспроизведение
    };
    const skipTimeInitialized = useRef(false); // Используем useRef для отслеживания инициализаци
    const skipTimeKeyboard = () => {
        console.log("Skip time function called!");
        SkipTimeFunction();
    };

    useEffect(() => {
        setIsPlaying(false);
        playRef.current?.pause();
        if(playRef.current?.paused){
            console.log('ITS PAUSED!!!!!!!!!');
            
        }
        choosedEpisode();
        setIsShowPlay(true);
    }, [seriesName, episode]);
    useEffect(()=>{
        if (!skipTimeInitialized.current) {
            skipTimeKeyboard(); // Выполняем функцию только один раз
            skipTimeInitialized.current = true; // Устанавливаем флаг, что функция была выполнена
        }
        
    },[])
    initializeVideoControls('video','.player-container');
    volumeLogic();
    return (
    <div className={"overflow-hidden flex-col flex mt-5 player-container max-h-[34rem] relative w-[100%] max-w-[62.5rem]"}data-volume-level={'high'}>
        {isShowPlay && (
            <div className="w-[100%] inset-0 absolute flex items-center justify-center">
                <button className="w-[100%] h-full flex items-center justify-center  z-20" onClick={()=>{toggleShowPlay();toggleControlsVisibility();/* setIsLoading(true);loading() */}}>
                    <Play className="flex relative mytest w-[100px] h-[100px]"/>
                </button>
            </div>
         )}
        {isLoading && (
            <div className="bg-black rounded-t-lg  w-[100%] h-full z-[101] inset-0 flex items-center justify-center absolute">
                <Loader className="loading" color="white" width={50} height={50}/>
            </div>
        )}
        <div className="flex max-w-full flex-grow overflow-hidden items-center justify-center">
            <video ref={playRef} controls={false} className='block flex-grow w-full object-cover video relative max-h-[34rem] rounded-lg' src={`http://localhost:3001/catalog/${seriesName}/${encodeURIComponent(getVoice())}/${getNumOfEpisode()}/1080p`}></video>

        </div>
            <div className={`flex backdrop-blur-xl controls ${isControlsVisible ? 'flex visible' : 'hidden'} absolute z-[102] bottom-0 inset-x-0 flex-grow max-w-full items-center p-3 justify-between`}>
                <div className="flex items-center">
                    <button onClick={()=>skipTime('backward')}><RotateCcw color="white"/></button>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? <Pause className="pause-icon" color="white"/> : <Play color="white"/>}
                    </button>
                    <button onClick={()=>skipTime('forward')}><RotateCwIcon color="white"/></button>
                </div>
                <div className="duration-container flex w-[88%]  text-white items-center relative ml-5">
                    <div className="current-time relative mr-2 ml-2"></div>
                        <div className="timeline-container relative mr-auto w-[100%] flex h-2 items-center">
                            <div className="timeline flex w-[100%] relative mr-auto h-[6px] bg-white">
                                <div className="thumb-indicator"></div>
                            </div>
                        </div>
                    <div className="total-time relative flex mr-5 ml-2 w-auto"></div>
                </div>
                <div className={`flex ml-auto  volume-container right-0 relative`}>
                    <button className="mutedBtn flex relative" >
                        <Volume2 color="white" className="flex mr-2 volume-high-icon"/>
                        <Volume1 color="white" className="flex mr-2 volume-low-icon"/>
                        <LucideVolumeOff color="white" className="flex mr-2 volume-muted-icon"/>
                    </button>
                    <div className="flex relative slider-range items-center">
                        <div className="flex relative volume-slider">
                            <input className="flex custom-range mr-1  relative " type="range"  min='0' max='1' step='any'/>
                        </div>
                    </div>
                </div>
                <div className="flex quality-maximize-btn right-0 relative justify-between">
                    <SelectQuality currentValue={quality} onChange={changeQuality}/>
                    <button onClick={toggleFullScreen} className="full-screen-btn">
                        <Maximize color="white"/>
                    </button>
                </div>
            </div>


    </div>

    );
}

export default Player;