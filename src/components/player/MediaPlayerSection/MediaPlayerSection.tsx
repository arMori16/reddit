'use client'
import { useState } from "react"
import Episodes from "../amountOfEpisode/amountOfEpisodeLogic"
import Player from "../player"



const MediaPlayerSection = ({AmountOfEpisode,seriesName}:{AmountOfEpisode:number,seriesName:string})=>{
    const [episode,setEpisode] = useState(1);
    return(
        <div className='w-[1000px] bg-slate-600 h-auto mt-[20px] relative flex flex-col rounded-[20px]'>
            <Episodes AmountOfEpisode={AmountOfEpisode} seriesName={seriesName} episode={setEpisode}/>
            <div className=' relative w-[100%] max-w-[1000px] h-[500px] flex flex-col p-[20px] '>
                <Player seriesName={seriesName} episode={episode}/>
            </div>
        </div>
    )
}
export default MediaPlayerSection;