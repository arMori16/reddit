"use client"
import React, { useState,useEffect,useRef } from 'react';
import '../avatar/avatar.css'
import axios from '../../api/axios';;

const Avatar = ()=> {
    const [profile,setProfile] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);
    // const handleClick = (e:React.MouseEvent<HTMLDivElement>)=>{
    //     e.stopPropagation();
    // }
    //The first variant
    /* const useEffects = useEffect(()=>{
        const handler = (e:MouseEvent)=>{
            if(!divRef.current?.contains(e.target as Node)){
                setProfile(false);
            }

        }
        document.addEventListener('mousedown',handler)
    },[]) */
    const handleClickOutside = (event:MouseEvent)=>{
        if(divRef.current && !divRef.current.contains(event.target as Node)){
            document.removeEventListener('mousedown',handleClickOutside)
            setProfile(false);
        };
    }
    const handleAvatarClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation();
        setProfile(true);
        document.addEventListener('mousedown',handleClickOutside)
    }
    const handleLogout = async()=>{
        const atToken = localStorage.getItem('accessToken');
        try{
            await axios.post('/logout',{},{
                headers:{
                    'Authorization':`Bearer ${atToken}`
                }
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setProfile(false);
            window.location.reload();
        }catch(err){
            console.log(err);
            
        }
    }
    return (
        <div className="avatar">
            <button onClick={handleAvatarClick} className='avatar-btn'>
                <img className='avatar' src='/Sweety.jpg' width={50} height={50}/>
            </button>
            {profile===true && (
                    <div className='profile-container' ref={divRef}>
                        <a href='/users/:userId' className='profile'>
                            <span className='profile-item'>
                                <span className='span-img'> 
                                    <img className='avatar' src='/Sweety.jpg'/>
                                </span>
                                <span className='view-profile-text'>
                                    View Profile
                                </span>
                            </span>
                        </a>
                        <button onClick={handleLogout} className='profile-2'>
                            <span className='profile-item'>
                                <span className='span-img-2'>
                                    <img src="/enter.png" />
                                </span>
                                <span className='view-profile-text-2'>
                                    Log Out
                                </span>
                            </span>
                        </button>
                    </div>
                )}
        </div>
    );

}

export default Avatar;