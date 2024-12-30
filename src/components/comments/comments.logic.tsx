"use server"
import { format } from "date-fns";
import axios from "../api/axios"
import { cookies, headers } from "next/headers";
import { formatDate } from "@/utils/formattDate";


export const createComment = async(seriesName:string,text:string) =>{
    try{
        const cookiesStore = cookies();
        const accessToken = cookiesStore.get('accessToken')?.value
        if(!accessToken) return console.error('Unathorized exception!');
        const commentPost = await axios.post('comments/create',{
            seriesName:seriesName,
            commentText:text
        },
        {headers:{
            'Authorization':`Bearer ${accessToken}`
        }}
    )
        console.log('Comment created: ',commentPost.data);
        
    }catch(err){
        console.log('Error when tyring to create a comment!');
        console.error(err)
    }
}

export const getFirstComments = async(seriesName:string,page:number)=>{
    try{
        const firstComments = await axios.get('comments/users',{
            params:{
                seriesName:seriesName,
                skip:page*15
            }
        });
        console.log('FirstCooment: ',firstComments.data);
        const formattedComments = firstComments.data.map((comment: any) => ({
            ...comment,
            createdAt: formatDate(comment.createdAt),
        }));
        return formattedComments;
    }catch(err){
        console.error(err)
        /* return { createdAtArray: [], usersArray: [],commentText: [],commentId: [],userName: []}; */
    }
}
