"use server"
import axios  from "./axios";
import * as jwt_decode from "jwt-decode";
import {Decoded} from '../api/interfaces/decoded.interface';
import { cookies } from "next/headers";

const cookiesStore = cookies();
const refreshToken = async()=>{
    const rt = cookiesStore.get('refreshToken');
    console.log('getItem(refreshtoken): '+ rt);
    const {data} = await axios.post('/refresh',rt,{
        headers: {
            'Authorization': `Bearer ${rt}`, // Добавляем токен в заголовок
        }
    })
    console.log('post sdelan');
    console.log(data);
    
    cookiesStore.set('accessToken',data.access_token);
    cookiesStore.set('refreshToken',data.refresh_token);
    console.log('New RT:'+data.refresh_token);
    
    return {accessToken:data.accessToken,refreshToken:data.refreshToken};
}
export const setupTokenRefresh = async():Promise<boolean | undefined>=>{
    const token = cookiesStore.get('accessToken');
    if(!token) return false;
    const decoded_token = jwt_decode.jwtDecode<Decoded>(String(token));
    const expirationTime = decoded_token.exp *1000;
    const currentTime = Date.now();
    console.log('all decoded');

    const timeToRefresh = expirationTime - currentTime - 60000;
    console.log(timeToRefresh);
    
    if(timeToRefresh>0){
        console.log('xuyaka');
        
        setTimeout(async()=>{
            try{
                console.log('vizvan refresh Token');
                await refreshToken();
                await setupTokenRefresh();
                return true;
            }catch(err){
                console.log(err);
            }
        },timeToRefresh)
    }
    else{
        console.log('else');
        
        refreshToken().then(()=>{
            setupTokenRefresh();
        }).then(()=>{
            return true;
        });
    }

}