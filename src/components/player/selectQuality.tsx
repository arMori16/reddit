
import { ChevronDown, ChevronUp, Dot } from "lucide-react";
import { EnumPlayerQuality } from "./types/player.type";
import useOutside from "./useOutside";
import { useState } from "react";

const QUALITIES:EnumPlayerQuality[]=[
    EnumPlayerQuality["1080p"],
    EnumPlayerQuality["720p"],
    EnumPlayerQuality["480p"],
    
]

interface Props{
    currentValue:EnumPlayerQuality,
    onChange:(quality:EnumPlayerQuality)=>void
}


export function SelectQuality({currentValue,onChange}:Props){
    const {isShow,setIsShow,qualityRef,buttonRef} = useOutside(false);
    const handleButtonClick = () => {
        setIsShow(prev => !prev);
    };
    /* const handleVisible = ()=>{
        setIsVisible(prev => !prev)
    }
    const [isVisible,setIsVisible] = useState(false); */
    return(
        <div className="relative quality-container">
            <button className='flex text-white relative' onClick={handleButtonClick/* ();handleVisible()} */} ref={buttonRef}>{currentValue} 
                {isShow ? (
                    <ChevronUp color="white"/>
                    ):(
                    <ChevronDown color="white"/>
                )}
            </button>
                    {isShow && (
                    <div className='flex visible flex-col relative bottom-4'/* {`${isVisible ? 'flex visible flex-col relative bottom-4' : 'hidden'}`} */>
                        <ul className="absolute right-3 backdrop-blur-3xl p-2 rounded-t-[10px] bottom-full text-white" ref={qualityRef} >
                            {QUALITIES.map(quality=>(
                                <li className="flex justify-end" key={quality}>
                                    <button 
                                        onClick={()=>{onChange(quality) 
                                                    setIsShow(false)}}
                                                    className="flex items-center">
                                            {currentValue === quality && <Dot/>}{quality}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    )}
        </div>
    )
}