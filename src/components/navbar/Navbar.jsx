"use client"
import React from 'react';
import { useEffect,useState } from 'react';
import AuthWindow from '../auth-window/auth-window';
import "@/components/navbar/Navbar.css"
import "@/components/auth-window/auth-window.css"
import axios from '../api/axios';


const Navbar = () => {
    useEffect(()=>{
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            setLoading(false);
            console.log('Token Stored');
        }
    },[])
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    
    const [showAuthWindow,setAuthWindow] = useState(false);
    const [user,setUser] = useState(null);
    /* useEffect(()=>{
        const fetchAuth = async ()=>{
            try{
                const res = await axios.get('/').then((res)=>{
                    console.log(res);
                })
            }catch(err){
                console.log(err);
            }
        }
        fetchAuth();
    },[])
 */
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
                    <li>
                        XUI
                    </li>
                ):(
                    <li><button onClick={()=>{setAuthWindow(true)}} id="login">Log In</button></li>
                )}
                    </ul>
                </nav>
            </header>
            {showAuthWindow ===true && (
            <div className='model-overlay' onClick={()=>{ setAuthWindow(false)}}>
                <div className='model-content' onClick={(e)=>{ e.stopPropagation()}}>
                    {showAuthWindow && <AuthWindow/>}
                </div>
            </div> 
            )}
            
        </>
    );
};

export default Navbar;