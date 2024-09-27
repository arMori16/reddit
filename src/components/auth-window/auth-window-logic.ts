"use client"
import Cookies from "js-cookie";
import axios from "../api/axios";
import origAxios from 'axios';
import { setupTokenRefresh } from "../api/setup-token";
import { useEffect, useState } from "react";
import errorStorage from "../useZustand/zustandErrorStorage";

export const saveTokensToCookies = async(accessToken:string,refreshToken:string):Promise<void>=>{
    const accessTokenExpiration = new Date(new Date().getTime() + 15 * 60 * 1000);
    Cookies.set('accessToken',accessToken,{
        expires: accessTokenExpiration,secure:true,sameSite:'strict'
    });
    Cookies.set('refreshToken',refreshToken,{
        expires: 28,secure:true,sameSite:'strict'
    });
}
export const backHandleLogin = async (action:string,data:any,setServerError:(error:string)=>void)=>{
    console.log('Email:', data.email);
    console.log('Password:', data.password);
    console.log('First Name:', data.firstName);
    console.log('Action:', action);
    console.log('BackHandleLogin vizvan');
    try{
        console.log('xui');
        
        const res = await axios.post('/',{
            ...data,
            action:action

        },)
        console.log('xui');
        console.log(res);
        
        if(res.data.tokens){
            alert('Login Successful!')
            console.log('BackHandleLogin true');
            Cookies.set('state','registered');
            saveTokensToCookies(res.data.tokens.access_token,res.data.tokens.refresh_token);
            setupTokenRefresh();
            window.location.reload();
            console.log('vizvan setupTokenRefresh');
            return true;
        }
        console.log('BackHandleLogin false');
        return false;
    }catch(error:any){
        if (origAxios.isAxiosError(error) && error.response) {
            const serverError = String(error.response.data.message);
            console.log('SERVER ERROR');
            
            setServerError(serverError);
            console.log('THI IS SETSERVER ERROR',serverError);
            
        } else {
            console.error('An unknown error occurred', error);
        }
    }
}