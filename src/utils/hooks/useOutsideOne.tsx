'use client'
import { useState, useRef, useEffect } from "react";
const useOutsideOne=(initialVisible:boolean)=>{
    const [isShowOne,setIsShow] = useState(initialVisible);
    const componentRef = useRef<HTMLDivElement>(null);
    const handleClickOutside=(e:MouseEvent)=>{
        if(componentRef.current && !componentRef.current.contains(e.target as Node) && !(e.target as HTMLElement).closest('.toggle-button')){
            setIsShow(false);
        }

    }
    useEffect(()=>{
        document.addEventListener('click',handleClickOutside,true);
        return ()=>{
            document.removeEventListener('click',handleClickOutside,true);
        }
    },[])
    return{
        componentRef,
        isShowOne,
        setIsShow
    }
}

export default useOutsideOne;