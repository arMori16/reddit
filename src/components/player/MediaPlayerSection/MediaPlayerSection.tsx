'use client'
import { useState } from "react"
import Episodes from "../amountOfEpisode/amountOfEpisodeLogic"
import Player from "../player"
import Voices from "../voices/voices"



const MediaPlayerSection = ({seriesViewName,AmountOfEpisode,seriesName}:{seriesViewName:string,AmountOfEpisode:number,seriesName:string})=>{
    const [episode,setEpisode] = useState(1);
    return(
        <div className='w-[68rem] max-w-[96%] bg-gray-300 h-auto mt-5 p-5 relative flex flex-col rounded-xl'>
            <Voices seriesName={seriesName}/>
            <Episodes seriesName={seriesName}/>
            <Player seriesName={seriesName} seriesViewName={seriesViewName} episode={episode}/>
        </div>
    )
}
export default MediaPlayerSection;