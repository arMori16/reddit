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
        })
        console.log(`This is reg data: `,req.data);
        return {voices:req.data.voices,episodes:req.data.amountOfEpisodes}
    }catch(err){
        console.error(`Error!${err}`);
        
    }
}
export const episodesForVoices = async(seriesName:string)=>{
    try{
        const req = await axios.get('catalog/item/episodes',{
            params:{
                seriesName:seriesName,
            }
        });

    }catch(err){
        console.error(`Cannot get episodes for voices!Error: ${err}`);
    }
}