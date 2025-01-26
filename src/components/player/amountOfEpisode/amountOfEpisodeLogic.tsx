'use client'

import numOfEpisodeStorage from "@/components/useZustand/player/zustandNumOfEpisode";
import { EnumPlayerQuality } from "../types/player.type";
import voiceStorage from "@/components/useZustand/player/zustandVoice";
import usePlayer from "../usePlayer";

const Episodes = ({seriesName}:{seriesName:string})=>{
    const {getEpisodes,getVoice} = voiceStorage();
    const {updateNumOfEpisode,getNumOfEpisode} = numOfEpisodeStorage();
    const {playRef,setIsPlaying} = usePlayer(seriesName);
    const handleEpisodeClick = (index: number) => {
        if(typeof window === "undefined") return;
        const video = document.querySelector('video');
        if(!video) return;
        setIsPlaying(false);
        video.src = `http://localhost:3001/catalog/${seriesName}/${encodeURIComponent(getVoice())}/${getNumOfEpisode()}/720p`;
        console.log(`THIS IS NEW PLAYREF SRC! `,video.currentSrc);
        
        updateNumOfEpisode(index + 1);
      };
    return(
        <div className='flex overflow-x-scroll w-full gap-2 relative scrollbar-hide z-2'>
            {Array.from({ length: getEpisodes()},(_,index)=>(
                <div key={index} onClick={()=>{handleEpisodeClick(index)}} className={`${index+1 === getNumOfEpisode()?'bg-slate-100 episodes-div text-slate-600':''} flex cursor-pointer reliative text-rose-50 rounded-lg border-[2px] font-bold items-center justify-center min-w-[2.5rem] w-[2.5rem] h-10`}>
                    {index + 1}
                </div>
            ))}
        </div>
    )
}
export default Episodes;