"use server"
import { format } from "date-fns";
import axios from "../api/axios"
import { cookies, headers } from "next/headers";
import { formatDate } from "@/utils/formattDate";


export const createComment = async(seriesName:string,text:string,parentId?:number) =>{
    try{
        const cookiesStore = cookies();
        const accessToken = cookiesStore.get('accessToken')?.value
        if(!accessToken) return console.error('Unathorized exception!');
        const commentPost = await axios.post('comments/create',{
            seriesName:seriesName,
            commentText:text,
            parentId:parentId
        },
        {headers:{
            'Authorization':`Bearer ${accessToken}`
        }}
    )
        console.log('Comment created: ',commentPost.data);
        return commentPost.data
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
        const formattedComments = firstComments.data.map((comment: any) => ({
            ...comment,
            createdAt: formatDate(comment.createdAt),
        })).filter((item:any)=> !item.ParentId);
        console.log('FirstCooment: ',formattedComments);
        const childComments = firstComments.data.map((comment: any) => ({
            ...comment,
            createdAt: formatDate(comment.createdAt),
        })).filter((comment:any)=> comment.ParentId);
        console.log('This is child comment: ',childComments);
        
        return {formattedComments:formattedComments,childComments:childComments};
    }catch(err){
        console.error(err);
        /* return { createdAtArray: [], usersArray: [],commentText: [],commentId: [],userName: []}; */
    }
}
