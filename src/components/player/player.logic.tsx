'use client'
import { RefObject, useEffect, useState } from "react";
import axios from "../api/axios"
import menuStorage from "../useZustand/zustandMenu";



export const getVoices = async(seriesName:string)=>{
    try{
        const req = await axios.get('/catalog/item/voices',{
            params:{
                seriesName:seriesName
            }
        });
        return req.data[0].VoiceActing
    }catch(err){
        console.error(`Error!${err}`);
        
    }
}