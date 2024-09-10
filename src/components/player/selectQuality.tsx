
import { ChevronDown, ChevronUp, Dot } from "lucide-react";
import { EnumPlayerQuality } from "./player.type";
import useOutside from "./useOutside";

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
    return(
        <div className="relative">
            <button className='flex text-white' onClick={handleButtonClick} ref={buttonRef}>{currentValue} 
                {isShow ? (
                    <ChevronUp color="white"/>
                    ):(
                    <ChevronDown color="white"/>
                )}
            </button>
                {isShow && (
                    <ul className="absolute bottom-full text-white" ref={qualityRef} >
                    {QUALITIES.map(quality=>(
                        <li  key={quality}>
                            <button 
                                onClick={()=>{onChange(quality) 
                                            setIsShow(false)}}
                                            className="flex items-center ">
                                    {currentValue === quality && <Dot/>}{quality}
                            </button>
                        </li>
                    ))}
                </ul>
                )}
        </div>
    )
}