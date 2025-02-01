'use server'
import redis from "@/redis/redisConfig";
import { cookies } from "next/headers";

export const getStateFromCookiesStorage = ():string=>{
    try{
        const cookiesStore = cookies();
        const userState = cookiesStore.get('state');
        const atToken = cookiesStore.get('accessToken')
        if(atToken){
            return 'registered';
        }
        else{
            return 'unregistered'
        }
    }catch(err){
        console.log(err);
        return 'err';
    }
}
