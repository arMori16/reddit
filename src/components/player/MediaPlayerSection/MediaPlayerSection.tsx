'use client'
import { useState } from "react"
import Episodes from "../amountOfEpisode/amountOfEpisodeLogic"
import Player from "../player"
import Voices from "../voices/voices"



const MediaPlayerSection = ({AmountOfEpisode,seriesName}:{AmountOfEpisode:number,seriesName:string})=>{
    const [episode,setEpisode] = useState(1);
    return(
        <div className='w-[68rem] max-w-[96%] bg-gray-300 h-auto mt-5 p-5 relative flex flex-col rounded-[20px]'>
            <Voices seriesName={seriesName}/>
            <Episodes AmountOfEpisode={AmountOfEpisode} seriesName={seriesName} episode={setEpisode}/>
            <div className='relative w-auto max-w-[62.5rem] h-auto max-h-[31.25rem] flex flex-col p-[20px] z-1'>
                <Player seriesName={seriesName} episode={episode}/>
            </div>
        </div>
    )
}
export default MediaPlayerSection;