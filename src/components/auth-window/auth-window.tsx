"use client"

import React, { useEffect,useState } from 'react';
import axios from '../api/axios';
import { error } from 'console';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { signupScheme } from './auth-validation-scheme';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form";
import { on } from 'events';

type FormData = {
    email: string;
    password: string;
    firstName?:string;
  };
export default function AuthWindow(){ 
    const [email,setEmail] = useState<string>('');
    const backHandleLogin = async (action:string,data:any)=>{
        /* console.log('Email:', email);
        console.log('Password:', password);
        console.log('First Name:', firstName);
        console.log('Action:', action); */
        console.log('BackHandleLogin vizvan');
        try{
            const res = await axios.post('/',{
                ...data,
                action:action

            })
            console.log(res);
            
            if(res.data.token){
                localStorage.setItem('token',res.data.token)
                alert('Login Successful!')
                console.log('BackHandleLogin true');
                window.location.reload();
                return true;
            }
            console.log('BackHandleLogin false');
            return false;
        }catch(error:unknown){
            console.log(error);
        }
    }
    const [view,setView] = useState('login');
    /* Validation */
    const {register,handleSubmit,watch,reset,formState:{errors}} = useForm<FormData>({
        defaultValues:{
            email:'',
            password:''
        },
        resolver:yupResolver(signupScheme),
    });
    const router = useRouter();

    const handleEmailSubmit = async(data:Partial<FormData>)=>{
        setEmail(data.email || '');
        setView('signup-2');
    }

    const handleSignup:SubmitHandler<FormData> = async (data:Partial<FormData>)=>{
        const finalData = {email,...data}
            
        const isSuccess = await backHandleLogin(view === 'login'? 'login':'signup',finalData);
        console.log('Onsubmit checked');
        if(isSuccess){
            reset();
        }
    }

    /* input values */
    
    /* const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState(''); */
    const [error,setError] = useState({});
    /* ChangeView */
    const changeView = (view:string)=>{
        setView(view);
    }
    /* Sending POST request to the server */
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
                    <form onSubmit={handleSubmit(async (data)=> await backHandleLogin('login',data as FormData))}>
                        <div className='label-container'>  
                            <input className={`input-label ${errors.email ? 'input-error':''}`}  placeholder='Enter your email' {...register('email')} /* value={email} onChange={(e)=>{setEmail(e.target.value)}} */ ></input>
                
                        </div>
                        {/* {errors.email && <div className='error'>{errors.email.message}</div>} */}
                        <div className='label-container'>    
                            <input className={`password-label ${errors.password ? 'input-error':''}`}  placeholder='Password' {...register('password')} /* value={password} onChange={(p)=>{setPassword(p.target.value)}} */ ></input>
                        </div>
                        {/* {errors.password && <div className='error'>{errors.password.message}</div>} */}
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
                                    <input className='input-label' placeholder='Enter your email'  {...register('email')} required></input>
                                </slot></span>
                            </div>
                            {errors.email && <div className='error'>{errors.email.message}</div>}
                            <button className='sign-up-btn' onClick={()=>{changeView('login')}}>Already have an account?</button>

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
                            <div className='label-container'>
                                <span><slot>
                                    <input className='input-label' placeholder='Enter your username' {...register('firstName')}/* value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} */ required></input>
                                </slot></span>
                            </div>
                            <div className='label-container'>
                                <span><slot>
                                    <input className='input-label' placeholder='Password' {...register('password')}/* value={password} onChange={(e)=>{setPassword(e.target.value)}} */ required></input>
                                </slot></span>
                            </div>
                            {errors.password && <div className='error'>{errors.password.message}</div>}
                            <button className='sign-up-btn'  onClick={()=>{changeView('login')}}>Already have an account?</button>

                            {/* login */}
                            <div className='btn-login-container'>
                                <button className='btn-login' type='submit'/* onClick={()=>{backHandleLogin('signup')}} */>Continue</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    )
}
