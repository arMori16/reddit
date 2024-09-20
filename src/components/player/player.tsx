'use client'


import { EnumPlayerQuality, HTMLCustomVideoElement } from "./types/player.type";
import { SelectQuality } from "./selectQuality";
import usePlayer from "./usePlayer";
import '@/components/player/player.css'
import { LucideVolumeOff, Maximize, Pause, Play, PlaySquare, RotateCcw, RotateCwIcon, Volume1, Volume2 } from "lucide-react";
import  testMy, { initializeVideoControls } from "./videoLogic";
import { useEffect, useRef, useState } from "react";




const Player = ({ url, seriesName }: { url: string, seriesName: string })=>{
    /* const video = document.querySelector('video');
    const playerContainer = document.querySelector('.player-container');

    // Когда видео на паузе, добавить класс paused
    video?.addEventListener('pause', () => {
        playerContainer?.classList.add('paused');
    });

    // Когда видео воспроизводится, удалить класс paused
    video?.addEventListener('play', () => {
        playerContainer?.classList.remove('paused');
    });
 */
    const [isControlsVisible, setIsControlsVisible] = useState(false); // Состояние видимости контролов

    const toggleControlsVisibility = () => {
        setIsControlsVisible((prev) => !prev); // Переключаем видимость контролов
    };

    const handleStart = () => {
        setIsPlaying(false);  // Скрыть кнопку и показать контроллеры
        togglePlayPause();
        setIsShowPlay(false);    // Начать воспроизведение
      };
    const [isVolume,setIsVolume] = useState('high');
    initializeVideoControls('video','.player-container')
    console.log('My param: ',seriesName);
    
    const {playRef,toggleMute,togglePlayPause,changeQuality,toggleFullScreen,setIsPlaying,quality,isPlaying,isShowPlay,setIsShowPlay,toggleShowPlay,skipTime} = usePlayer({url},{seriesName});
    testMy();
    return (
    <div className={"overflow-hidden player-container relative w-[100%] max-w-[1000px]"}data-volume-level={'high'}>
        {isShowPlay && (
            <div className="w-[100%] h-[100%] absolute flex items-center justify-center">
                <button className="w-[100%] h-[100%] flex items-center justify-center  z-[100]" onClick={()=>{toggleShowPlay();toggleControlsVisibility()}}>
                    <Play  className="flex relative mytest   w-[100px] h-[100px]"/>
                </button>
            </div>
         )}
        <video ref={playRef} controls={false} className='w-full h-full object-cover ' src={`${url}-1080p.mp4`}></video>
            <div className={`flex backdrop-blur-xl controls ${isControlsVisible ? 'flex visible' : 'hidden'} bottom-[45px] relative  items-center p-3 justify-between z-2000`}>
                <div className="flex items-center">
                    <button onClick={()=>skipTime('backward')}><RotateCcw color="white"/></button>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? <Pause className="pause-icon" color="white"/> : <Play color="white"/>}
                    </button>
                    <button onClick={()=>skipTime('forward')}><RotateCwIcon color="white"/></button>
                </div>
                <div className={`flex ml-auto  volume-container right-0 relative`}>
                    <button className="mutedBtn flex relative" >
                        <Volume2 color="white" className="flex mr-2 volume-high-icon"/>
                        <Volume1 color="white" className="flex mr-2 volume-low-icon"/>
                        <LucideVolumeOff color="white" className="flex mr-2 volume-muted-icon"/>
                    </button>
                    <div className="flex relative items-center">
                        <div className="flex volume-slider">
                            <input className="flex custom-range  relative " type="range"  min='0' max='1' step='any'/>
                        </div>
                    </div>
                </div>
                <div className="flex  right-0 relative justify-between">
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