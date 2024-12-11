"use server"
import { format } from "date-fns";
import axios from "../api/axios"
import { cookies, headers } from "next/headers";


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

export const getFirstComments = async(seriesName:string):Promise<{
    commentId:number[];
    createdAtArray:string[];
    usersArray:string[];
    commentText:string[];
}>=>{
    try{
        const firstComments = await axios.get('comments/users',{
            params:{
                seriesName:seriesName
            }
        });
        console.log('FirstCooment: ',firstComments.data);
        
        const formatDate = (isoString: string): string => {
            const date = new Date(isoString);
            return format(date, "dd MMM HH:mm");
        };
        const createdAtArray = firstComments.data.commentUsers.map((comment:any)=>formatDate(comment.createdAt));
        const commentText = firstComments.data.commentUsers.map((comment:any)=>comment.CommentText);
        const commentId = firstComments.data.commentUsers.map((comment:any)=>comment.Id);
        
        const usersArray = firstComments.data.users.flat(2).map((user:any)=>user.firstName)
        console.log('Users: ',usersArray);
        console.log('This is firstComments: ',usersArray);
        console.log('Data: ',createdAtArray);
        return {createdAtArray,usersArray,commentText,commentId}
    }catch(err){
        console.error(err)
        return { createdAtArray: [], usersArray: [],commentText: [],commentId: []};
    }
}
