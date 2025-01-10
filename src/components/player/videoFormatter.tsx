
import axios from "../api/axios";
import { EnumPlayerQuality } from "./types/player.type";

/* 
export const postSeriesData = async(seriesName:any,numOfEpisode:number)=>{
    const req = async()=>{
        try{
            const res = await axios.get('/catalog/item',{params:{
                SeriesName:seriesName
            }});
            return {data:res.data};
        }catch(err){
            console.log(err);
            return false;
        }
    }
    const fetchedData = await req();
    if(!fetchedData) return console.error('FETCHED DATA!')

    const videoUrl = `C:/Users/arMori/Desktop/VideofilesHosting/${seriesName}`;
    console.log('IT VideoURL',videoUrl);
   
    const selectedFile = `${videoUrl}/${seriesName}-${numOfEpisode}.mkv`
    console.log(`ITS'S SELECTED FILE: ${selectedFile}`); 
    try {
        
        const response = await axios.post('/videoFormat', {
            videoUrl:selectedFile,
            numOfEpisode:numOfEpisode,
            seriesName:seriesName
        })
        console.log('Это консоль лог путей: ',response.data);
        } catch (error) {
        console.error('Ошибка при загрузке видео:', error);
        }
} */

const useVideo = async(seriesName:any,voice:string,quality:EnumPlayerQuality,episode:number)=>{
    console.log('SERIESNAME: ',seriesName);
    
    const videoPath = `${seriesName}/${voice}/${String(episode)}/${quality}.mp4`
    console.log('Videoformatter videopath: ',videoPath);
    
    try {
        const videoSrc = await axios.get('/videoFormat/getVideo',{
            params:{
                path:videoPath
            },
            headers:{
                Range: 'bytes=0-'
            },
            responseType:'blob',
            timeout: 5000
        })
        return videoSrc.data;
        } catch (error) {
        console.error('Ошибка при загрузке видео:', error);
        }
    }

export default useVideo;
