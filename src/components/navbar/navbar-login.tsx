"use client"
import { useEffect, useRef, useState } from "react";
import AuthWindow from "../auth-window/auth-window";
import "@/components/navbar/Navbar.css"

const NavbarLogin = ()=>{
    const [showAuthWindow,setAuthWindow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event:MouseEvent)=>{
        if(ref.current && !ref.current.contains(event.target as Node)){
        setAuthWindow(false);
        console.log('xuiiiii');
    
        document.removeEventListener('mousedown',handleClickOutside);
    }
    }
    const handleClick = ()=>{ 
        setAuthWindow(true);
        document.addEventListener('mousedown',handleClickOutside);
    }
    return(
        <>
            <li className="flex h-full items-center w-[5rem] mr-5"><button onClick={handleClick} className='text-rose-50 flex border-[#B3DCC5] border-2 h-[1.8rem] font-semibold w-full items-center justify-center transition-colors hover:bg-[#B3DCC5] ease-in-out delay-75 duration-500 rounded-md'>Log In</button></li>
            {showAuthWindow && (
            <div className='model-overlay'>
                <div className='model-content' ref={ref}>
                    {<AuthWindow />}
                </div>
            </div> 
            )} 
        </>
    )

}

export default NavbarLogin