"use client"

import React, { useEffect,useState } from 'react';
import axios from '../api/axios';
import { error } from 'console';
import Link from 'next/link';
import { AxiosResponse } from 'axios';
import { signupScheme } from './auth-validation-scheme';
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"
export default function AuthWindow(){
    type FormData = {
        email:string,
        password:string,
        firstName:string
    }
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [view,setView] = useState('login');
    const [error,setError] = useState({});

    const changeView = (view:string)=>{
        setView(view);
    }
    //Validation
    const backHandleLogin = async (action:string)=>{

            console.log('Email:', email);
            console.log('Password:', password);
            console.log('First Name:', firstName);
            console.log('Action:', action);
            try{
                const res = await axios.post('/',{
                    email:email,
                    password:password,
                    firstName:firstName,
                    action:action

                })
                console.log(res);
                
                if(res.data.token){
                    localStorage.setItem('token',res.data.token)
                    alert('Login Successful!')
                    setView('');
                }
            }catch(error:unknown){
                console.log(error);
            }
        }
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
                    <form>
                        <div className='label-container'>
                            <span><slot>
                                <input className='input-label' type='email' placeholder='Enter your email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input>
                            </slot></span>
                        </div>
                        <div className='label-container'>
                            <span><slot>
                                <input className='password-label' type='password' placeholder='Password' value={password} onChange={(p)=>{setPassword(p.target.value)}} required></input>
                            </slot></span>
                        </div>
                    </form>
                    <button className='sign-up-btn' onClick={()=>{changeView('signup')}}>New to Mori?</button>

                    {/* login */}
                    <form>
                        <div className='btn-login-container'>
                            <button className='btn-login' onClick={()=>backHandleLogin('login')}>Log In</button>
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
                        <div className='label-container'>
                            <span><slot>
                                <input className='input-label' placeholder='Enter your email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input>
                            </slot></span>
                        </div>
                        <button className='sign-up-btn' onClick={()=>{changeView('login')}}>Already have an account?</button>

                        {/* login */}
                        <div className='btn-login-container'>
                            <button className='btn-login' onClick={()=>{
                                changeView('signup-2')
                            }}>Continue</button>
                        </div>
                    </>
                )}
                {view === 'signup-2' && (
                    <>
                        <slot className='slot-container'>
                            <h1 className='login-container'>Create your username and password</h1>
                            <p className='p-login'>Reddit is anonymous, so your username is what you'll go by here. Choose wisely—because once you get a name, you can't change it.</p>
                        </slot>
                        <div className='label-container'>
                            <span><slot>
                                <input className='input-label' placeholder='Enter your username' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required></input>
                            </slot></span>
                        </div>
                        <div className='label-container'>
                            <span><slot>
                                <input className='input-label' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required></input>
                            </slot></span>
                        </div>
                        <button className='sign-up-btn'  onClick={()=>{changeView('login')}}>Already have an account?</button>

                        {/* login */}
                        <div className='btn-login-container'>
                            <button className='btn-login' onClick={()=>{backHandleLogin('signup')}}>Continue</button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}