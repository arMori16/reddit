"use client"
import React from 'react';
import { useEffect,useState,useRef } from 'react';
import AuthWindow from '../auth-window/auth-window';
import "@/components/navbar/Navbar.css"
import "@/components/auth-window/auth-window.css"
import axios from '../api/axios';
import Avatar from '../navbar-components/avatar/avatar';


const Navbar = () => {
    useEffect(()=>{
        if (typeof window !== "undefined" && loading) {
            const storedToken = localStorage.getItem('accessToken');
            setToken(storedToken);
            setLoading(false);
            console.log('Token Stored');
        }
    },[])
    
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [showAuthWindow,setAuthWindow] = useState(false);
    const [user,setUser] = useState(null);

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
    const ref = useRef<HTMLDivElement>(null);
    if(loading){
        return null;
    }
    return (
        <>
            <header className='navbar-container'>
                <div>
                    <div id='logo-container'>
                        <a href="/" className='leaf'> <img src="/leaf2.png"/> </a>
                        <a href='/' id='logo'><span>Mori</span></a>
                    </div>
                </div>
                <nav>
                    <ul id="text-align">
                        <li><a id="nav-element" href='/contact'>Contact</a></li>
                {token ? (
                    <Avatar/>
                    /* <img src=''></img> */
                ):(
                    <li><button onClick={handleClick} id="login">Log In</button></li>
                )}
                    </ul>
                </nav>
            </header>
            {showAuthWindow ===true && (
            <div className='model-overlay'>
                <div className='model-content' ref={ref}>
                    {<AuthWindow />}
                </div>
            </div> 
            )}
            
        </>
    );
};

export default Navbar;