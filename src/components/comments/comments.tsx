"use client"
import { useEffect, useState } from "react";
import { createComment, getFirstComments } from "./comments.logic";
import Link from "next/link";




const Comments = ({seriesName}:{seriesName:string})=>{
    const [text,setText] = useState<string>('');
    const [isOnFocus,setIsOnFocus] = useState(false);
    /* const [usersArray, setUsersArray] = useState<string[]>([]);
    const [timeArray,setTimeArray] = useState<string[]>([])
    const [commentText,setCommentText] = useState<string[]>([]); */
    const [commentId,setCommentIds] = useState<number[]>([]);
    const [commentInfo,setCommentInfo] = useState<any[]>([]);
    const [updateComments, setUpdateComments] = useState<boolean>(false); // Store users array here
    const handleOnFocus = ()=>{
        setIsOnFocus(true); 
    }
    const handleOnBlur = ()=>{
        if (text === '') {
            setIsOnFocus(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const {createdAtArray,commentText,usersArray,commentId} = await getFirstComments(seriesName);
            setCommentIds(commentId);
            /* setTimeArray(createdAtArray);
            setUsersArray(usersArray);
            setCommentText(commentText); */
            const comments = commentId.map((id: number, index: number) => ({
                id,
                user: usersArray[index],
                time: createdAtArray[index],
                text: commentText[index],
            }));
    
            setCommentInfo(comments); // Store structured comments
            console.log("Comments: ", comments);
            
        };

        fetchData();
    }, [updateComments]);
    const handleCreateComment = ()=>{
        setUpdateComments((prev)=>!prev);
        createComment(seriesName,text)
    }
    return(
        <div className="relative flex flex-col w-full p-4 bg-[#3C3C3C] mb-[100px]">
            <div className="h-auto flex flex-col relative w-full bg-[#3C3C3C]">
                <div className="flex relative h-[100px] w-auto">
                    <textarea onFocus={handleOnFocus} onBlur={handleOnBlur} className="w-[100%] bg-[#222222] p-2 caret-white text-rose-50 h-full resize-none rounded-lg outline-none placeholder:m-2 text-start" placeholder={isOnFocus && text === ''? "":"text comment..."} value={String(text)} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className="flex relative  h-[35px] my-2 justify-end">
                    <button onClick={handleCreateComment} className="bg-[#71C997] w-[100px] hover:bg-[#59a47a] active:bg-[#246842] rounded-lg justify-center items-center flex relative text-[#E8E8E8]">Send</button>
                </div>
                
            </div>
            {commentInfo.map((comment,index)=>(
                <div key={index} className="flex relative w-full max-w-full pt-4 mb-4 bg-[#3C3C3C] h-[120px] max-h-[150px] border-t-[1px] border-gray-500">
                        <Link href={''} className="flex min-w-[6.25rem] h-[6.25rem]  custom-xs:min-w-[2.65rem] custom-xs:mt-[0.33rem] custom-xs:h-[2.65rem] mr-3">
                            <img src="/Sweety.jpg" className="flex rounded-lg w-full h-full" alt="" />
                        </Link>
                    <div className="relative w-full flex fex-col h-[3rem]">
                            <div className="flex relative flex-col comment-head w-full">
                                <div className="relative flex text-[#B3DCC5] w-auto h-auto">
                                    {comment.user}
                                </div>
                                <div className="relative flex bg-[#629377] text-rose-50 rounded-md justify-center  w-[5rem] max-w-[6rem] h-5 text-[11px] items-center px-1">
                                    {comment.time}
                                </div>

                            </div>
                    </div>
                    <div className="flex w-full custom-xs:ml-0">
                        <div className="relative flex text-rose-50 mt-2 w-full h-auto text-[14px]">
                            {comment.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments;