
import axios from "@/components/api/axios"
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { SeriesInfo } from "./dto/adminDto/seriesInfo.dto";
import { formatDate } from "./formattDate";




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

export const getDataView = async(seriesName:string):Promise<SeriesInfo>=>{
    try{
        console.log('LOG!!!!!!!!!:   ',seriesName);
        
        const getData = await axios.get('/catalog/item',{
            params:{
                seriesName
            }
        })
        console.log('This is getdata for viewpage: ',getData.data);
        return{
            SeriesName:getData.data.SeriesName,
            Description:getData.data.Description,
            SeriesViewName:getData.data.SeriesViewName,
            Rate:getData.data.Rate,
            Status:getData.data.Status,
            Type:getData.data.Type,
            ReleaseYear:getData.data.ReleaseYear,
            Genre:getData.data.Genre,
            Studio:getData.data.Studio,
            AmountOfEpisode:getData.data.AmountOfEpisode,
            VoiceActing:getData.data.VoiceActing,
            VideoSource:getData.data.VideoSource
        }
    }catch(err){
        console.error('Cannot getData for the admin view page');
        return{
            SeriesName:'',
            Description:'',
            SeriesViewName:'',
            Rate:0,
            Status:'',
            Type:'',
            ReleaseYear:'',
            Genre:[''],
            Studio:[''],
            AmountOfEpisode:0,
            VoiceActing:[''],
            VideoSource:''
        }
    }
}
export const updateSeries = async(data:SeriesInfo,seriesName:string)=>{
    console.log('SeriesName for the admin view page: ',seriesName);
    
    try{
        const atToken = Cookies.get('accessToken');
        const update = await axios.put(`/catalog/admin/series/${seriesName}`,data,{
            headers:{
                'Authorization':`Bearer ${atToken}`
            }
        })
        if(update){
            toast.success('Sumitted successfully!')
        }
    }catch(err){
        console.error(`Error when trying to update the series!\n ${err}`);
        toast.error('Cannot update the series information!');
    }

}
export const getCommentsData = async(page:number)=>{
    try{
        const atToken = Cookies.get('accessToken');
        const getComments = await axios.get('/comments/admin',{
            params:{
                take:15,
                skip:page * 15
            },
            headers:{
                'Authorization':`Bearer ${atToken}`
            }
        })
        console.log('It is getcomments data! ',getComments.data);
        const data = getComments.data.map((item: any) => {
            console.log('It is item createdAt: ',item.createdAt);
            
            return {
                ...item,
                createdAt: formatDate(String(item.createdAt)), // Ensure it's a string
            };
        });
        console.log('Final Formatted Data:', data);
    
        return data;
    }catch(err){
        console.error(`Error when trying to get comments data for admin! \n ${err}`);
        
    }
}
export const handleCommentDelete = async(commentId:number)=>{
    try{
        const atToken = Cookies.get('accessToken');
        const deleteComment = await axios.delete('/comments/admin',{
            params:{
                CommentId:commentId
            },
            headers:{
                'Authorization':`Bearer ${atToken}`
            }
        })
        if(deleteComment){
            toast.success('Deleted successfully!')
        }
    }catch(err){
        console.error(`Couldn't delete the comment!Error: ${err}`);
        toast.error(`Couldn't delete the comment!`);
    }
}