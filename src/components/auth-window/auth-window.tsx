"use client"

import React, { useEffect,useState } from 'react';
import { signupScheme,loginScheme } from './auth-validation-scheme';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form";
import {  saveTokensToCookies,backHandleLogin, getEmailCode } from './auth-window-logic';
import errorStorage from '../useZustand/zustandErrorStorage';


interface FormData{
    email:string,
    password:string,
    firstName?:string
}

export default function AuthWindow(){ 

    /* <useStateVariables> */
    const [email,setEmail] = useState<string>('');
    const [pass,setPass] = useState<string>('');
    const [userEmailCode,setUserEmailCode] = useState<String>('');
    const [isEmailCode,setIsEmailCode] = useState<String>('');
    const [view,setView] = useState('login');
    const [emailView,setEmailView] = useState('')
    const [isLoading,setIsLoading] = useState(false);
    const getServerError = errorStorage((state)=>state.getServerError);
    const setServerError = errorStorage((state) => state.setServerError);

    const scheme = view === 'signup-2' ? signupScheme : loginScheme;
    /* </useStateVariables> */

    /* <ChangeView> */
    const changeView = async (view:string,userEmail?:string)=>{
        setView(view);
        clearErrors();
        if(view === 'emailCode'){
            try{
                console.log('YEEAH ITS AN EMAIL VIEW!!!!!!!');
                
                /* if(email === undefined) return console.error('Email is undefined changeView'); */
                console.log('HIIEA');
                
                const emailCode = await getEmailCode(String(userEmail));
                console.log('Email CODE: ',emailCode);
                
                if(emailCode === undefined) return console.error('Email is undefined changeView');
                setIsEmailCode(String(emailCode));

            }catch(err){
                console.error('There is an error!');
                
            }
        }
    }
    /* </ChangeView> */

    /* Clear setServerError either closing tab or switching view */
    useEffect(() => {
        return () => {
            // Очистка сообщения об ошибке при размонтировании компонента или изменении view
            console.log('setServerError is cleared!');
            
            setServerError('');
        };
    }, [view]);
    /* Clear setServerError either closing tab or switching view */

    /* <Validation> */
    const {register,handleSubmit,getValues,watch,reset,formState:{errors},trigger,clearErrors} = useForm<FormData>({
        defaultValues:{
            email:'',
            password:'',
            firstName:view === 'signup-2' ? '' : undefined
        },
        resolver:yupResolver(scheme),
    });
    const handleEmailValidationAndContinue = async (signupEmail:string) => {
        const isEmailValid = await trigger('email'); // Запускаем валидацию email
        if (isEmailValid) {
          // Если email валиден, переходим на следующий шаг
            setView('emailCode');
            setEmailView('signup-2');
            try{
                console.log('YEEAH ITS AN EMAIL VIEW!!!!!!!');
                
                if(email === undefined) return console.error('Email is undefined changeView');
                console.log('EMAIL!! ',signupEmail);
                
                const emailCode = await getEmailCode(signupEmail);
                console.log('Email CODE: ',signupEmail);
                
                if(emailCode === undefined) return console.error('Email is undefined changeView');
                setIsEmailCode(String(emailCode));

            }catch(err){
                console.error('There is an error!');
                
            }
        } else {
          // Если email не валиден, показываем ошибку
          console.log('Email is invalid');
        }
      };
    /* </Validation> */

    /* <Handles> */
    const handleEmailCode = async(code:string,view?:string)=>{
        if(isEmailCode === code){
            try{
                if(view === 'login'){
                    console.log('ITS handleEmailCode');
                    const data = {
                        email:email,
                        password:pass,
                        firstName:'null'
                    }
                    await backHandleLogin('login',data,setServerError,true);

                }else{
                    changeView('signup-2');
                }
            }catch(err){
                console.error('Error when trying to handle Email code ! ',err);
                
            }
        }
    }
    const handleEmailSubmit = async(data:Partial<FormData>)=>{
        setEmail(data.email || '');
    }

    const handleSignup:SubmitHandler<FormData> = async (data:Partial<FormData>)=>{
        const finalData:any = {email,...data}
        setIsLoading(true);
        const isSuccess = await backHandleLogin(view === 'login'? 'login':'signup',finalData,setServerError,true);


        setIsLoading(false);
        console.log('Onsubmit checked');
        if(isSuccess){
            reset();
        }
    }
    /* </Handles> */
    
    if(getServerError()){
        console.log('GETSERVERERROR!');
        
    }
    return(
        <>
            <div className='relative flex flex-col w-[368px] mx-[60px] mt-[40px]'>
                {view === 'login' && (
                <div className='flex flex-col w-[100%] h-[100%]'>
                    <slot className='slot-container'>
                        <h1 className='login-container'>Log In</h1>
                        <p className='p-login'>By continuing,you agree to our <a href='/user/agreement' className='a-login'>User Agreement</a> and 
                    acknowledge tha you understand the <a href="/policies/privacy-policy" className='a-login'>Privacy Policy</a></p>
                    </slot>
                    <div className='flex relative h-[100px]'>

                    </div>
                    <form className='flex relative h-[60%] flex-col w-[100%]' onSubmit={handleSubmit(async (data)=> {const isSuccess =await backHandleLogin('login',{email:data.email,password:data.password,firstName:'null'},setServerError);
                            isSuccess && changeView('emailCode',data.email);
                            setEmail(data.email);
                            setEmailView('login');
                            setPass(data.password);
                        })}>
                        <div className={`relative ${errors.email  || getServerError() ? '':'mb-4'} flex h-[56px] w-[100%]`}>  
                            <input className={`input-label bg-[#B3DCC5] h-[100%] w-[100%] p-[10px] border-[2px] border-[#B3DCC5] rounded-[20px] ${errors.email || getServerError() ? 'input-error':''}`}  placeholder='Enter your email' {...register('email')} /* value={email} onChange={(e)=>{setEmail(e.target.value)}} */ ></input>
                
                        </div>
                        {(getServerError() || errors.email) && <div className='error-email'>{errors.email?.message || getServerError()}</div>}
                        <div className='relative h-[56px] w-[100%]'>    
                            <input className={`text-[16px] flex outline-none relative bg-[#B3DCC5] h-[100%] w-[100%] p-[10px] border-[2px] border-[#B3DCC5] rounded-[20px] ${errors.password || getServerError() ? 'input-error':''}`}  placeholder='Password' {...register('password')} /* value={password} onChange={(p)=>{setPassword(p.target.value)}} */ ></input>
                        </div>
                        {(getServerError() || errors.password) && <div className='error-password'>{errors.password?.message || getServerError()}</div>}
                        <button className='flex mt-2 relative text-[#B3DCC5]' onClick={()=>{changeView('signup')}}>New to Mori?</button>

                        {/* login */}
                        <div className='relative mt-auto flex h-12 w-[100%]'>
                            <button className='rounded-[30px] bg-[#B3DCC5] transition-colors background-color 0.5s ease flex w-[100%] h-[100%] items-center justify-center' type='submit' onClick={()=>{console.log('clicked');
                            }}>
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
                )}
                {view === 'signup' && (
                    <div className='flex flex-col w-[100%] h-[100%]'>
                        <slot className='slot-container'>
                            <h1 className='login-container'>Sign Up</h1>
                            <p className='p-login'>By continuing,you agree to our <a href='/user/agreement' className='a-login'>User Agreement</a> and 
                        acknowledge tha you understand the <a href="/policies/privacy-policy" className='a-login'>Privacy Policy</a></p>
                        </slot>
                        <div className='flex relative h-[100px]'>

                        </div>
                        <form className='flex relative h-[60%] flex-col w-[100%]' onSubmit={handleSubmit(handleEmailSubmit)}>
                            <div className={`relative flex h-[56px] w-[100%]`}>
                                <input className={`input-label bg-[#B3DCC5] h-[100%] w-[100%] p-[10px] border-[2px] border-[#B3DCC5] rounded-[20px] ${errors.email ? 'input-error':''}`} placeholder='Enter your email'  {...register('email')}></input>
                            </div>
                            {errors.email && <div className='error-email'>{errors.email.message}</div>}
                            <button className='flex mt-2 relative text-[#B3DCC5]' onClick={()=>{changeView('login')}}>Already have an account?</button>

                            {/* login */}
                            <div className='relative mt-auto flex h-12 w-[100%]'>
                                <button className='rounded-[30px] bg-[#B3DCC5] transition-colors background-color 0.5s ease flex w-[100%] h-[100%] items-center justify-center' type='submit' onClick={()=>handleEmailValidationAndContinue(getValues('email'))}>Continue</button>
                            </div>
                        </form>
                    </div>
                )}
                {view === 'signup-2' && (
                    <div className='flex flex-col w-[100%] h-[100%]'>
                        <slot className='slot-container'>
                            <h1 className='login-container'>Create your username and password</h1>
                            <p className='p-login'>Reddit is anonymous, so your username is what you'll go by here. Choose wisely—because once you get a name, you can't change it.</p>
                        </slot>
                        <form className='flex mt-5 relative h-[60%] flex-col w-[100%]' onSubmit={handleSubmit(handleSignup)}>
                            <div className={`relative ${errors.firstName ? '':'mb-4'} flex h-[56px] w-[100%]`}>
                                <input className={`input-label bg-[#B3DCC5] h-[100%] w-[100%] p-[10px] border-[2px] border-[#B3DCC5] rounded-[20px] ${errors.firstName ? 'input-error':''}`} placeholder='Enter your username' {...register('firstName')}></input>
                            </div>
                            {errors.firstName && <div className='error-firstname'>{errors.firstName.message}</div>}
                            <div className='relative h-[56px] w-[100%]'>    
                                <input className={`text-[16px] flex outline-none relative bg-[#B3DCC5] h-[100%] w-[100%] p-[10px] border-[2px] border-[#B3DCC5] rounded-[20px] ${errors.password ? 'input-error':''}`}  placeholder='Password' {...register('password')} /* value={password} onChange={(p)=>{setPassword(p.target.value)}} */ ></input>
                            </div>
                            {errors.password && <div className='error-password'>{errors.password.message}</div>}
                            <div className='relative mt-auto flex h-12 w-[100%]'>
                                <button className='rounded-[30px] bg-[#B3DCC5] transition-colors background-color 0.5s ease flex w-[100%] h-[100%] items-center justify-center' type='submit'>Continue</button>
                            </div>
                        </form>
                    </div>
                )}
                {view === 'emailCode' && (
                    <div className='flex flex-col w-[100%] h-[100%]'>
                    <slot className='slot-container'>
                        <h1 className='login-container'>Verify Email</h1>
                        <p className='p-login'>Reddit is anonymous, so your username is what you'll go by here. Choose wisely—because once you get a name, you can't change it.</p>
                    </slot>
                    <div className='flex mt-5 relative h-[60%] flex-col w-[100%]'>
                        <div className={`relative flex h-[56px] w-[100%]`}>
                            <input className={`input-label bg-[#B3DCC5] h-[100%] w-[100%] p-[10px] border-[2px] border-[#B3DCC5] rounded-[20px]`} value={String(userEmailCode)} onChange={(e)=>{setUserEmailCode(e.target.value);console.log('Input changed:', e.target.value);}} placeholder='Enter your Code'></input>
                        </div>
                        <div className='relative mt-auto flex h-12 w-[100%]'>
                            <button className='rounded-[30px] bg-[#B3DCC5] transition-colors background-color 0.5s ease flex w-[100%] h-[100%] items-center justify-center' type='button' onClick={()=>{
                                emailView === 'login'? handleEmailCode(String(userEmailCode),'login'):handleEmailCode(String(userEmailCode));

                                }
                            }>
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </>
    )
}
