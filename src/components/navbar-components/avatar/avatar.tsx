"use client"
import React, { useState,useEffect,useRef } from 'react';
import '../avatar/avatar.css'
import axios from '../../api/axios';
import { useDispatch } from 'react-redux';
import { logout } from '@/components/redux/userSlice';
import Cookies from 'js-cookie';
import Link from 'next/link';

const Avatar = ()=> {
    const [profile,setProfile] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);
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
        const atToken = await Cookies.get('accessToken');
        try{
            await axios.post('/logout',{},{
                headers:{
                    'Authorization':`Bearer ${atToken}`
                }
            });
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            setProfile(false);
            Cookies.remove('state');
            window.location.reload();
        }catch(err){
            console.log(err);
            
        }
    }
    return (
        <div className="flex relative w-[3rem] h-auto">
            <button onClick={handleAvatarClick} className='w-[3rem] h-[3rem] overflow-hidden border-[#B3DCC5] border-[1px] rounded-[50%] z-[1000]'>
                <img className='rounded-[50%]' src='/Sweety.jpg'/>
            </button>
            {profile===true && (
                    <div className='absolute top-[3.5rem] right-0 flex flex-col text-white w-[16rem] h-[10rem] rounded-lg bg-gray-400' ref={divRef}>
                        <Link href='/users/:userId' className='profile'>
                            <span className='profile-item'>
                                <span className='span-img'> 
                                    <img className='rounded-[50%]' src='/Sweety.jpg'/>
                                </span>
                                <span className='view-profile-text'>
                                    View Profile
                                </span>
                            </span>
                        </Link>
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