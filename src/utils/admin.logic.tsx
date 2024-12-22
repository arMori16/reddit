
import axios from "@/components/api/axios"
import Cookies from "js-cookie";
import { toast } from "react-toastify";
/* import { cookies } from "next/headers"; */



export const getAllCounts = async():Promise<{
    comments:number,
    series:number,
    users:number,
}>=>{
    try{
        const allCounts = await axios.get('/catalog/getCounts');
        /* console.log('Here is the counts: ',allCounts.data); */
        return {
            comments: allCounts.data.comments,
            series: allCounts.data.series,
            users: allCounts.data.users
        }
    }catch(err){
        throw new Error('Error when trying to getAllCounts!')
    }
}

export const getSeries = async(page:number)=>{
    console.log(`It's page: `,page);
    try{
        const series = await axios.get('/catalog/admin/series',{
            params:{
                skip:page * 15
            }
        });
        console.log('Admin Series: ',series.data);
        
        return series.data
    }catch(err){
        toast.error('Error when trying to getSeries for admin page(dashboard)!');
    }
}

export const uploadImage = async(file:any)=>{
    try{
        const formData = new FormData();
        formData.append('image',file);
        const atToken = Cookies.get('accessToken');
        const postFile = await axios.post('/media/upload',formData,{
            headers:{
                'Authorization':`Bearer ${atToken}`
            }
        })
        toast.success('Successfully')
    }catch(err){
        toast.error(`Can't upload the image :>`)
    }
}

export const addSeries = async(data:any)=>{
    try{
        const atToken = Cookies.get('accessToken');
        if(!atToken) throw new Error('Cannot find access token!');
        data.Genre = data.Genre.split(',').map((genre:any) => genre.trim());
        data.Studio = data.Studio.split(',').map((studio:any) => studio.trim());
        data.VoiceActing = data.VoiceActing.split(',').map((voiceActing:any) => voiceActing.trim());
        console.log('Data: \n',data);
        const postSeries = await axios.post('/catalog/item',data,{
            headers:{
                'Authorization':`Bearer ${atToken}`
            }
        });
        toast.success('Submit successfully!')
    }catch(err){
        console.error(`Error when trying to add new Series! ${err}`);
        toast.error('Submit incorrect!')
    }

    
}
export const deleteSeries = async(seriesName:string)=>{
    const atToken = Cookies.get('accessToken');
    try{
        const postDelete = axios.delete('catalog/item',{
            params:{
                seriesName:seriesName
            },
            headers:{
                'Authorization':`Bearer ${atToken}`
            }
        })
        toast.success('Delete successfully!')
    }catch(err){
        console.error(`Error when trying to delete series! ${err}`);
        toast.error('Delete failed >:')
    }
}

export const getDataView = async(seriesName:string):Promise<{
    seriesName:string,
    description:string,
    seriesViewName:string,
    rate:number,
    status:string,
    type:string,
    releaseYear:string,
    genre:string[],
    studio:string[],
    amountOfEpisode:number,
    voiceActing:string[],
    videoSource:string,
}>=>{
    try{
        console.log('LOG!!!!!!!!!:   ',seriesName);
        
        const getData = await axios.get('/catalog/item',{
            params:{
                seriesName
            }
        })
        console.log('This is getdata for viewpage: ',getData.data);
        return{
            seriesName:getData.data.SeriesName,
            description:getData.data.Description,
            seriesViewName:getData.data.SeriesViewName,
            rate:getData.data.Rate,
            status:getData.data.Status,
            type:getData.data.Type,
            releaseYear:getData.data.ReleaseYear,
            genre:getData.data.Genre,
            studio:getData.data.Studio,
            amountOfEpisode:getData.data.AmountOfEpisode,
            voiceActing:getData.data.VoiceActing,
            videoSource:getData.data.VideoSource
        }
    }catch(err){
        console.error('Cannot getData for the admin view page');
        return{
            seriesName:'',
            description:'',
            seriesViewName:'',
            rate:0,
            status:'',
            type:'',
            releaseYear:'',
            genre:[''],
            studio:[''],
            amountOfEpisode:0,
            voiceActing:[''],
            videoSource:'',
        }
    }
}