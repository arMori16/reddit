
import axios from "../api/axios";
import { EnumPlayerQuality } from "../player/types/player.type";


export const postSeriesData = async(seriesName:any,quality:EnumPlayerQuality)=>{
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
    
    
    /* if (!selectedFile) {
        alert("Пожалуйста, выберите файл!");
        return;
    }
    
    // Создаем объект FormData для отправки файла
    const formData = new FormData();
    formData.append('file', selectedFile); // 'file' должно соответствовать полю в @UseInterceptors(FileInterceptor('file'))
    */
    const videoUrl = 'C:/Users/arMori/Desktop/RedditClone/reddit/public/videos';
    console.log('IT VideoURL',videoUrl);
   
    const selectedFile = `${videoUrl}/${fetchedData.data.VideoSource}/${seriesName}-1080p.mp4`
    console.log(`ITS'S SELECTED FILE: ${selectedFile}`); 
    try {
        
        const response = await axios.post('/videoFormat', {
            videoUrl:selectedFile,
            seriesName:seriesName
        })
        console.log('Это консоль лог путей: ',response.data);
        const videoPaths = response.data;


        let videoPath;

        if (quality === '720p') {
            videoPath = videoPaths[0];
        } else if (quality === '480p') {
            videoPath = videoPaths[1];
        }

        if (!videoPath) {
            console.error('Video path not found!');
            return;
        }
        /* console.log('Видео успешно загружено:', response.data); */
        } catch (error) {
        console.error('Ошибка при загрузке видео:', error);
        }
}

const useVideo = async(seriesName:any,quality:EnumPlayerQuality)=>{
    const videoUrl = 'C:/Users/arMori/Desktop/RedditClone/reddit/public/videos';
    console.log('IT VideoURL',videoUrl);
   
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
    const selectedFile = `${videoUrl}/${fetchedData.data.VideoSource}/${seriesName}-1080p.mp4`
    console.log(`ITS'S SELECTED FILE: ${selectedFile}`);
    try {
        
        const response = await axios.post('/videoFormat', {
            videoUrl:selectedFile,
            seriesName:seriesName
        })
        console.log('Это консоль лог путей: ',response.data);
        const videoPaths = response.data;

        let videoPath;

        if (quality === '720p') {
            videoPath = videoPaths[0];
        } else if (quality === '480p') {
            videoPath = videoPaths[1];
        }

        if (!videoPath) {
            console.error('Video path not found!');
            return;
        }
        
        const videoSrc = await axios.get('/videoFormat/getVideo',{
            params:{
                path:videoPath
            },
            headers:{
                'Range':'bytes=0-'
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
