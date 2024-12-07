'use client'
import axios  from "./axios";
import * as jwt_decode from "jwt-decode";
import {Decoded} from '../api/interfaces/decoded.interface';
import Cookies from "js-cookie";
const refreshToken = async(rt:string)=>{
    try{
        console.log('getItem(refreshtoken): '+ rt);
        const {data} = await axios.post('/refresh',rt,{
            headers: {
                'Authorization': `Bearer ${rt}`, // Добавляем токен в заголовок
            }
        })
        console.log('post sdelan');
        console.log(data);
        
        Cookies.set('accessToken',data.access_token,{expires:Date.now() + 15 *60*1000});
        Cookies.set('refreshToken',data.refresh_token,{expires:28});
        console.log('New RT:'+data.refresh_token);
        
        return {accessToken:data.accessToken,refreshToken:data.refreshToken};
    }
    catch(err){
        console.log(err);
        return console.error();
        
    }
}
export const setupTokenRefresh = async():Promise<boolean | undefined>=>{
    const atToken = Cookies.get('accessToken');
    const rtToken = Cookies.get('refreshToken');
    console.log('THis is rtToken:',rtToken);
    console.log('THis is atToken:',atToken);
    
    // if(rtToken && atToken) return false;
    if(rtToken && atToken){
        const decoded_token = jwt_decode.jwtDecode<Decoded>(atToken);
        const expirationTime = decoded_token.exp * 1000;
        console.log('EXP TIME:',expirationTime);
        
        const currentTime = Date.now();
        console.log('all decoded');

        const timeToRefresh = expirationTime - currentTime - 60000;
        console.log(timeToRefresh);
        
        if(timeToRefresh>0){
            console.log('xuyaka');
            
            setTimeout(async()=>{
                try{
                    console.log('vizvan refresh Token');
                    await refreshToken(rtToken);
                    await setupTokenRefresh();
                    console.log('setTimeout');
                    
                    return true;
                }catch(err){
                    console.log(err);
                    console.log("IT's SETTIMEUP ERROR");
                    return false;
                }
            },timeToRefresh)
        }
        else{
            console.log('else');
            
            await refreshToken(rtToken)
            await setupTokenRefresh();  
            return true;
        }
    }
    if(rtToken && !atToken){
        console.log('Function works');
        
        await refreshToken(rtToken);
        await setupTokenRefresh();
        return true;
    }
}