'use client'

import useVideo from "@/components/mainPageComponent/videoFormatter";
import numOfEpisodeStorage from "@/components/useZustand/player/zustandNumOfEpisode";
import { EnumPlayerQuality } from "../types/player.type";
import { useEffect, useState } from "react";
import usePlayer from "../usePlayer";

const Episodes = ({AmountOfEpisode,seriesName,episode}:{AmountOfEpisode:number,seriesName:string,episode:(episode:number)=>void})=>{
    
    const {updateNumOfEpisode,getNumOfEpisode} = numOfEpisodeStorage();
    
    useEffect(()=>{
        if(typeof window === "undefined") return;
        const currentEpisode = localStorage.getItem('')
    },[])

    const {setIsShowPlay,toggleShowPlay,setIsPlaying,isPlaying} = usePlayer(seriesName);
    const handleEpisodeClick = async (index: number) => {
        episode(index+1); // Сначала обновляем состояние
        updateNumOfEpisode(index + 1)
        await setEpisode(index + 1, seriesName); // Затем вызываем асинхронную функцию
      };
    return(
        <div className='flex overflow-x-scroll w-full gap-2 relative scrollbar-hide z-2'>
            {Array.from({ length: AmountOfEpisode},(_,index)=>(
                <div key={index} onClick={()=>{handleEpisodeClick(index)}} className={`${index+1 === getNumOfEpisode()?'bg-slate-100 episodes-div text-slate-600':''} flex cursor-pointer reliative text-rose-50 rounded-lg border-[2px] font-bold items-center justify-center min-w-[2.5rem] w-[2.5rem] h-10`}>
                    {index + 1}
                </div>
            ))}
        </div>
    )
}

export const setEpisode = async(numOfEpisode:number,seriesName:string)=>{
    if(typeof window === "undefined") return;
    const episode = document.querySelector('.episodes-div') as HTMLDivElement;
    const video = document.querySelector('video') as HTMLVideoElement;
    if(!video) return;
    
    const defaultQuality:EnumPlayerQuality = EnumPlayerQuality['1080p'];
    localStorage.setItem('episode',`${numOfEpisode}`)
    episode.classList.add('current-episode');
    video.pause();
}
export default Episodes;