import redis from "@/redis/redisConfig";
import { cookies } from "next/headers";

const getStateFromCookiesStorage = ():string=>{
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

export const getStateFromRedisStorage = async()=>{
    const value = await getStateFromCookiesStorage();
    console.log('ITS VALUE: ',value);
    
    await redis.set('state',value,'EX',3600);
    const userState = await redis.get('state');
    console.log('THIS is USERSTATE',userState);
    return userState;
}
