"use client"
import { useEffect, useRef, useState } from "react";
import AuthWindow from "../auth-window/auth-window";
import "@/components/navbar/Navbar.css"

const NavbarLogin = ()=>{
    const [showAuthWindow,setAuthWindow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event:MouseEvent,option?:boolean)=>{
        if(ref.current && !ref.current.contains(event.target as Node) || option){
        setAuthWindow(false);
        document.removeEventListener('click',handleClickOutside,true);
    }
    }
    const handleClick = ()=>{ 
        setAuthWindow(true);
        document.addEventListener('click',handleClickOutside,true);
    }
    return(
        <>
            <li className="flex h-full items-center w-[5rem] mr-5"><button onClick={handleClick} className='text-rose-50 flex border-[#B3DCC5] border-2 h-[1.8rem] font-semibold w-full items-center justify-center transition-colors hover:bg-[#B3DCC5] ease-in-out delay-75 duration-500 rounded-md'>Log In</button></li>
            {showAuthWindow && (
            <div className='model-overlay'>
                <div className='relative flex flex-col bg-gray-200 h-[37.5rem] rounded-md w-[33rem]' ref={ref}>
                    <div className="relative flex p-3 justify-end items-center w-full h-[4.5rem]">
                        <button onClick={(e:any)=>handleClickOutside(e,true)} className="flex hover:bg-gray-300 duration-300 relative w-[2.5rem] h-[2.5rem] rounded-[50%] bg-gray-2E mr-4">
                            <div className="flex p-1 w-full h-full absolute inset-0 items-center justify-center">
                                <span className="rotate-45 ml-1 mb-1 text-white font-thin text-[2rem]">+</span>
                            </div>
                        </button>
                    </div>
                    <AuthWindow />
                </div>
            </div> 
            )} 
        </>
    )

}

export default NavbarLogin