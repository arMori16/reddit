"use client"
import React from 'react';
import { useEffect,useState } from 'react';
import AuthWindow from '../auth-window/auth-window';
import "@/components/navbar/Navbar.css"
import "@/components/auth-window/auth-window.css"
import axios from '../api/axios';


const Navbar = () => {
    const [showAuthWindow,setAuthWindow] = useState(false);
    useEffect(()=>{
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
                        <li><button onClick={()=>{setAuthWindow(true)}} id="login">Log In</button></li>
                    </ul>
                </nav>
            </header>
            {showAuthWindow && (
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