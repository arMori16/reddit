'use client'

import { useEffect, useRef, useState } from "react";
import { getVoices } from "../player.logic";
import voiceStorage from "@/components/useZustand/player/zustandVoice";

const Voices = ({seriesName}:{seriesName:string})=>{
    const [voices,setVoices] = useState<any[]>([]);
    const [episodesForVoice,setEpisodesForVoice] = useState<any[]>([]);
    /* const [episode,setEpisode] = useState(); */
    const [isShow,setIsShow] = useState<boolean>(false);
    const {getVoice,setVoice,getEpisodes,setEpisodes} = voiceStorage();
    const divRef = useRef<HTMLDivElement>(null); 
    const mainRef = useRef<HTMLDivElement>(null); 
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await getVoices(seriesName);
            setVoices(data?.voices);
            setEpisodesForVoice(data?.episodes);
            setVoice(data?.voices[0]);
            setEpisodes(data?.episodes[0]);
        }
        fetchData();
    },[]);
    
    const toggleAnimation = () => {
        if (divRef.current && mainRef.current) {
          if (isShow) {
            divRef.current.classList.add("animate-slideVoiceIn");
            setIsShow(false);
            setTimeout(() => {
              divRef.current?.classList.remove("flex");
              mainRef.current?.classList.remove("rounded-b-none","rounded-t-lg","border-b-none");
              mainRef.current?.classList.add("rounded-lg");
              divRef.current?.classList.add("hidden");

              divRef.current?.classList.remove("animate-slideVoiceIn");
            }, 400);
          } else {
            divRef.current.classList.remove("hidden");
            mainRef.current.classList.remove("rounded-lg")
            mainRef.current.classList.add("rounded-b-none","rounded-t-lg","border-b-none")
            divRef.current.classList.add("flex","animate-slideVoiceOut");
            setIsShow(true);
    
            setTimeout(() => {
              divRef.current?.classList.remove("animate-slideVoiceOut");
            }, 400);
          }
        }
      };
    return(
        <div ref={mainRef} className={`flex flex-col rounded-lg box-border relative max-w-[15rem] bg-gray-100 border-gray-600 border-[1px] font-normal mb-2 text-white text-[0.9rem] px-2`}>
            <button onClick={toggleAnimation} className="flex h-[1.75rem] relative box-border w-full items-center justify-between">
                <div className="flex h-full items-center flex-grow justify-between">
                    Voice {getVoice()}
                    <div className="flex p-1 mr-2 rounded-[0.25rem] font-extrabold bg-gray-300 text-[0.5rem] justify-center items-center w-[1.5rem] text-white">
                      {getEpisodes()}
                    </div>
                </div>
                <span className="flex w-[0.1rem] h-[60%] justify-center mr-2 bg-white py-[2px]"></span><img src={`http://localhost:3001/media/down-arrow/icons`} className={`flex w-[1.25rem] transform ${isShow ? 'rotate-[180deg]' : 'rotate-0'} h-[1.25rem] ${isShow ?'animate-downArrowRotateUp':'animate-downArrowRotateDown'}`} />
            </button>
            <div className="hidden max-w-[15rem] w-[15rem] left-[-0.7px] mr-0 box-border max-h-[12rem] absolute p-0 m-0 top-full px-2 bg-gray-100 border-gray-600 border-t-0 rounded-b-lg border-[1px] z-[102] overflow-y-scroll" ref={divRef}>
                <div className="flex flex-col w-full gap-y-2">
                    {voices.map((item,index)=>(
                        <button onClick={()=>{setVoice(item);setEpisodes(episodesForVoice[index]);toggleAnimation()}} key={index} className={`flex w-full ${getVoice() === item?'text-gray-300':''} justify-between`}>
                            Voice {item}
                            <div className="flex p-1 rounded-[0.25rem] font-extrabold bg-gray-300 text-[0.5rem] justify-center items-center w-[1.5rem] text-white">
                              {episodesForVoice[index]}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Voices;