"use client"

import React, { useEffect,useState } from 'react';
import axios from '../api/axios';
import { error } from 'console';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { signupScheme,loginScheme } from './auth-validation-scheme';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from 'js-cookie';
import { setupTokenRefresh } from '../api/setup-token';
import {  saveTokensToCookies,backHandleLogin } from './auth-window-logic';


interface FormData{
    email:string,
    password:string,
    firstName?:string
}
export default function AuthWindow(){ 

    /* <useStataVariables> */
    const [email,setEmail] = useState<string>('');
    const [view,setView] = useState('login');
    const [interfaces,setInterface] = useState();
    const scheme = view === 'signup-2' ? signupScheme : loginScheme;
    /* </useStataVariables> */

    /* <ChangeView> */
    const changeView = (view:string)=>{
        setView(view);
    }
    /* </ChangeView> */


    /* <Validation> */
    const {register,handleSubmit,watch,reset,formState:{errors}} = useForm<FormData>({
        defaultValues:{
            email:'',
            password:'',
            firstName:view === 'signup-2' ? '' : undefined
        },
        resolver:yupResolver(scheme),
    });
    /* </Validation> */

    /* <Handles> */
    const handleEmailSubmit = async(data:Partial<FormData>)=>{
        setEmail(data.email || '');
        setView('signup-2');
    }

    const handleSignup:SubmitHandler<FormData> = async (data:Partial<FormData>)=>{
        const finalData:any = {email,...data}
            
        const isSuccess = await backHandleLogin(view === 'login'? 'login':'signup',finalData);
        console.log('Onsubmit checked');
        if(isSuccess){
            reset();
        }
    }
    /* </Handles> */
    return(
        <>
            <div className='div-login-container'>
                {view === 'login' && (
                <>
                    <slot className='slot-container'>
                        <h1 className='login-container'>Log In</h1>
                        <p className='p-login'>By continuing,you agree to our <a href='/user/agreement' className='a-login'>User Agreement</a> and 
                    acknowledge tha you understand the <a href="/policies/privacy-policy" className='a-login'>Privacy Policy</a></p>
                    </slot>
                    <form onSubmit={handleSubmit(async (data)=> {const isSuccess = backHandleLogin('login',{email:data.email,password:data.password,firstName:'null'})})}>
                        <div className='label-container relative flex items-center justify-center h-[56px] w-[100%] mb-[20px]'>  
                            <input className={`input-label bg-[#B3DCC5] h-[100%] w-[100%] p-[10px] border-[2px] border-[#B3DCC5] rounded-[20px] ${errors.email ? 'input-error':''}`}  placeholder='Enter your email' {...register('email')} /* value={email} onChange={(e)=>{setEmail(e.target.value)}} */ ></input>
                
                        </div>
                        {errors.email && <div className='error-email'>{errors.email.message}</div>}
                        <div className='label-container'>    
                            <input className={`password-label ${errors.password ? 'input-error':''}`}  placeholder='Password' {...register('password')} /* value={password} onChange={(p)=>{setPassword(p.target.value)}} */ ></input>
                        </div>
                        {errors.password && <div className='error-password'>{errors.password.message}</div>}
                        <button className='sign-up-btn' onClick={()=>{changeView('signup')}}>New to Mori?</button>

                        {/* login */}
                        <div className='btn-login-container'>
                            <button className='btn-login' type='submit' onClick={()=>{console.log('clicked');
                            }}>
                                Log In
                            </button>
                        </div>
                    </form>
                </>
                )}
                {view === 'signup' && (
                    <>
                        <slot className='slot-container'>
                            <h1 className='login-container'>Sign Up</h1>
                            <p className='p-login'>By continuing,you agree to our <a href='/user/agreement' className='a-login'>User Agreement</a> and 
                        acknowledge tha you understand the <a href="/policies/privacy-policy" className='a-login'>Privacy Policy</a></p>
                        </slot>
                        <form onSubmit={handleSubmit(handleEmailSubmit)}>
                            <div className='label-container'>
                                <span><slot>
                                    <input className={`input-label ${errors.email ? 'input-error':''}`} placeholder='Enter your email'  {...register('email')} required></input>
                                </slot></span>
                            </div>
                            {errors.email && <div className='error-email'>{errors.email.message}</div>}
                            <button className='sign-up-btn-2' onClick={()=>{changeView('login')}}>Already have an account?</button>

                            {/* login */}
                            <div className='btn-login-container'>
                                <button className='btn-login' type='submit' onClick={()=>{
                                    changeView('signup-2')
                                }}>Continue</button>
                            </div>
                        </form>
                    </>
                )}
                {view === 'signup-2' && (
                    <>
                        <slot className='slot-container'>
                            <h1 className='login-container'>Create your username and password</h1>
                            <p className='p-login'>Reddit is anonymous, so your username is what you'll go by here. Choose wisely—because once you get a name, you can't change it.</p>
                        </slot>
                        <form onSubmit={handleSubmit(handleSignup)}>
                            <div className='input-container'>
                                <div className='label-container'>
                                    <span><slot>
                                        <input className='input-label' placeholder='Enter your username' {...register('firstName')} required></input>
                                    </slot></span>
                                </div>
                                {errors.firstName && <div className='error-firstname'>{errors.firstName.message}</div>}
                                <div className='label-container'>
                                    <span><slot>
                                        <input className='input-label' placeholder='Password' {...register('password')} required></input>
                                    </slot></span>
                                </div>
                                {errors.password && <div className='error-password'>{errors.password.message}</div>}
                            </div>
                            <div className='btn-login-container'>
                                <button className='btn-login' type='submit'>Continue</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    )
}
