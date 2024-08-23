"use client"
import React, { useState,useEffect,useRef } from 'react';
import '../avatar/avatar.css'

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
    return (
        <div className="avatar">
            <button onClick={handleAvatarClick} className='avatar-btn'>
                <img className='avatar' src='./Sweety.jpg' width={50} height={50}/>
                {profile===true && (
                    <div className='profile-container' ref={divRef}>xui</div>
                )}
            </button>
        </div>
    );

}

export default Avatar;