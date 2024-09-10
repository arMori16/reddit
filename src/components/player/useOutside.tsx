'use client'
import { useState, useRef, useEffect } from "react";
const useOutside=(initialVisible:boolean)=>{
    const [isShow,setIsShow] = useState(initialVisible);
    const qualityRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const handleClickOutside=(e:MouseEvent)=>{
        if(qualityRef.current && !qualityRef.current.contains(e.target as Node) &&
            (buttonRef.current && !buttonRef.current.contains(e.target as Node))){
            /* document.removeEventListener('mousedown',handleClickOutside); */
            setIsShow(false);
        }

    }
    /* const handleClick = (event:React.MouseEvent<HTMLButtonElement>)=>{
        setIsShow(true);
        document.addEventListener('mousedown',handleClickOutside);
    } */
    useEffect(()=>{
        document.addEventListener('click',handleClickOutside,true);
        return ()=>{
            document.removeEventListener('click',handleClickOutside,true);
        }
    },[])
    return{
        buttonRef,
        qualityRef,
        isShow,
        setIsShow
    }
}

export default useOutside;