"use client"
import { useRef, useState } from "react";
import AuthWindow from "../auth-window/auth-window";
import "@/components/navbar/Navbar.css"

const NavbarLogin = ()=>{
    var test:boolean = true || false;
    const [showAuthWindow,setAuthWindow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event:MouseEvent)=>{
        if(ref.current && !ref.current.contains(event.target as Node)){
        setAuthWindow(false);
        console.log('xuiiiii');
    
        document.removeEventListener('click',handleClickOutside);
    }
    }
    const handleClick = ()=>{ 
        setAuthWindow(true);
        document.addEventListener('click',handleClickOutside);
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