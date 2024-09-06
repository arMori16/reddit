"use client"
import { useEffect, useRef, useState } from "react";
import AuthWindow from "../auth-window/auth-window";
import "@/components/navbar/Navbar.css"
import { setupTokenRefresh } from "../api/setup-token";

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
            <li><button onClick={handleClick} id="login">Log In</button></li>
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