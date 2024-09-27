'use client'

import { postSeriesData } from "@/components/mainPageComponent/videoFormatter";
import numOfEpisodeStorage from "@/components/useZustand/zustandNumOfEpisode";

const Episodes = ({AmountOfEpisode,seriesName}:{AmountOfEpisode:number,seriesName:string})=>{
    const setNumOfEpisode = numOfEpisodeStorage((state)=>state.updateNumOfEpisode);
    const getNumOfEpisode = numOfEpisodeStorage((state)=>state.getNumOfEpisode);
    return(
        <div className='flex flex-row flex-wrap gap-2 relative mx-5 mt-5'>
            {Array.from({ length: AmountOfEpisode},(_,index)=>(
                <div key={index} onClick={()=>setEpisode(index+1,seriesName)} className='flex cursor-pointer reliative text-rose-50 rounded-lg border-[2px] font-bold outline- series-div items-center justify-center w-10 h-10'>
                    {index + 1}
                </div>
            ))}
        </div>
    )
}

export const setEpisode = async(numOfEpisode:number,seriesName:string)=>{
    if(typeof window === "undefined") return;
    const video = document.querySelector('video') as HTMLVideoElement;
    if(!video) return;
    console.log('AmountOfEpisodes seriesName: ',seriesName);
    console.log('AmountOfEpisodes numOfEpisode: ',numOfEpisode);
    const setNumOfEpisode = numOfEpisodeStorage((state)=>state.updateNumOfEpisode);
    setNumOfEpisode(numOfEpisode);
    await postSeriesData(seriesName,numOfEpisode);
    video.pause();

}
export default Episodes;