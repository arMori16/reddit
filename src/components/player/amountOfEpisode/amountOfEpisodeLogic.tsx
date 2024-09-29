'use client'

import useVideo, { postSeriesData } from "@/components/mainPageComponent/videoFormatter";
import numOfEpisodeStorage from "@/components/useZustand/zustandNumOfEpisode";
import { EnumPlayerQuality } from "../types/player.type";
import { useEffect } from "react";
import usePlayer from "../usePlayer";

const Episodes = ({AmountOfEpisode,seriesName,episode}:{AmountOfEpisode:number,seriesName:string,episode:(episode:number)=>void})=>{
    const setNumOfEpisode = numOfEpisodeStorage((state)=>state.updateNumOfEpisode);
    const getNumOfEpisode = numOfEpisodeStorage((state)=>state.getNumOfEpisode);
    const {setIsShowPlay,toggleShowPlay,setIsPlaying,isPlaying} = usePlayer(seriesName);
    const handleEpisodeClick = async (index: number) => {
        episode(index+1); // Сначала обновляем состояние
        await setEpisode(index + 1, seriesName); // Затем вызываем асинхронную функцию
      };
    return(
        <div className='flex flex-row flex-wrap gap-2 relative mx-5 mt-5'>
            {Array.from({ length: AmountOfEpisode},(_,index)=>(
                <div key={index} onClick={()=>{handleEpisodeClick(index)}} className='flex cursor-pointer reliative text-rose-50 rounded-lg border-[2px] font-bold outline- series-div items-center justify-center w-10 h-10'>
                    {index + 1}
                </div>
            ))}
        </div>
    )
}

export const setEpisode = async(numOfEpisode:number,seriesName:string)=>{
    if(typeof window === "undefined") return;
    const controls = document.querySelector('.controls') as HTMLDivElement;
    const video = document.querySelector('video') as HTMLVideoElement;
    if(!video) return;
    console.log('AmountOfEpisodes seriesName: ',seriesName);
    console.log('AmountOfEpisodes numOfEpisode: ',numOfEpisode);
    const defaultQuality:EnumPlayerQuality = EnumPlayerQuality['1080p'];
    const {updateNumOfEpisode} = numOfEpisodeStorage.getState();
    localStorage.setItem('episode',`${numOfEpisode}`)
    await postSeriesData(seriesName,numOfEpisode);
    video.pause();
    /* video.src = `http://localhost:3001/catalog/${seriesName}-${numOfEpisode}/${defaultQuality}`; */
    // useVideo(seriesName,defaultQuality,numOfEpisode).then(src=>{
    //     const currentLocalTime = localStorage.getItem('currentTime');
    //     /* Clearing */

    //     video.src = '';
    //     URL.revokeObjectURL(video.src);
    //     video.load();

    //     /* Clearing */
    //     console.log('NUM OF EPISODE: ',numOfEpisode);
        
    //     video.src = `http://localhost:3001/catalog/${seriesName}-${numOfEpisode}/${defaultQuality}`
    //     video.play();
    //     controls.classList.add('disabled-controls');
    //     setTimeout(()=>{
    //         if(!video) return;
    //         video.currentTime = Number(currentLocalTime);
    //         video.play().catch(err => console.error('Error playing video:', err));
    //         controls.classList.remove('disabled-controls');
    //     },3000)

    //         }).catch(err => console.error('Failed to fetch video', err));

}
export default Episodes;