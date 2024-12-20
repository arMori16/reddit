'use server'
import redis from "@/redis/redisConfig";
import { cookies } from "next/headers";

export const getStateFromCookiesStorage = ():string=>{
    try{
        const cookiesStore = cookies();
        const userState = cookiesStore.get('state');
        const atToken = cookiesStore.get('accessToken')
        if(userState !== undefined && atToken){
            console.log('RETURNING USERSTATE VALUE: ',userState.value);
            
            return userState.value;
        }
        else{
            return 'unregistered'
        }
    }catch(err){
        console.log(err);
        return 'err';
    }
}
