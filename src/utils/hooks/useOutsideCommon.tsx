import menuStorage from "@/components/useZustand/zustandMenu";
import { RefObject, useEffect, useRef, useState } from "react";


const useOutsideCommon = (/* componentRef:RefObject<HTMLDivElement> */)=>{
    const componentRef = useRef<HTMLDivElement>(null);
    const {getIsShow,updateIsShow,updateShowVoices} = menuStorage();
    const handleClickOutside = (e:MouseEvent)=>{
        if(componentRef.current && getIsShow() && !componentRef.current.contains(e.target as Node)){
            updateIsShow(false);
            updateShowVoices(false);
            console.log('SET SHOW FALSE! ');
        }
    }
    useEffect(()=>{
        document.addEventListener('click',handleClickOutside,true);
        return()=>{
            document.removeEventListener('click',handleClickOutside,true);
        }
    },[]);
    return {
        componentRef
    }
}
export default useOutsideCommon;