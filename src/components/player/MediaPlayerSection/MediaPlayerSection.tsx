'use client'
import { useState } from "react"
import Episodes from "../amountOfEpisode/amountOfEpisodeLogic"
import Player from "../player"



const MediaPlayerSection = ({AmountOfEpisode,seriesName}:{AmountOfEpisode:number,seriesName:string})=>{
    const [episode,setEpisode] = useState(1);
    return(
        <div className='w-[68rem] max-w-[96%] bg-slate-600 h-auto mt-5  relative flex flex-col rounded-[20px]'>
            <Episodes AmountOfEpisode={AmountOfEpisode} seriesName={seriesName} episode={setEpisode}/>
            <div className=' relative w-auto max-w-[62.5rem] h-auto max-h-[31.25rem] flex flex-col p-[20px] '>
                <Player seriesName={seriesName} episode={episode}/>
            </div>
        </div>
    )
}
export default MediaPlayerSection;