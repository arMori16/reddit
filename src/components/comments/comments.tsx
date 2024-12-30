"use client"
import { useEffect, useRef, useState } from "react";
import { createComment, getFirstComments } from "./comments.logic";
import Link from "next/link";
import { CommentsDto } from "@/utils/dto/adminDto/comments.dto";
import InfiniteScroll from "@/utils/infiniteScroll";
import usePageCounter from "../useZustand/zustandPageCounter";




const Comments = ({seriesName}:{seriesName:string})=>{
    const [text,setText] = useState<string>('');
    const [isOnFocus,setIsOnFocus] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);
    const {getPage} = usePageCounter();
    const page = getPage();
    /* const [usersArray, setUsersArray] = useState<string[]>([]);
    const [timeArray,setTimeArray] = useState<string[]>([])
    const [commentText,setCommentText] = useState<string[]>([]); */
    const [commentInfo,setCommentInfo] = useState<CommentsDto[]>([]);
    const [filteredData,setFilteredData] = useState<CommentsDto[]>([]);
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
            const data = await getFirstComments(seriesName,getPage());
            console.log(`DATA: `,data);
            
            setCommentInfo(data); // Store structured comments
            setFilteredData((prev)=>{
                const newArray = [...prev,...data];
                const filteredArray = Array.from(new Map(newArray.map(item=>[item.Id,item])).values());
                return filteredArray;
            });
        };

        fetchData();
    }, [page,updateComments]);
    const handleCreateComment = ()=>{
        setUpdateComments((prev)=>!prev);
        setText('');
        createComment(seriesName,text)
    }
    if(!commentInfo){
        return(
            <></>
        )
    }
    return(
        <div ref={divRef} className="relative flex flex-col w-full p-4 bg-[#3C3C3C] mb-[100px]">
            <div className="h-auto flex flex-col relative w-full bg-[#3C3C3C]">
                <div className="flex relative h-[100px] w-auto">
                    <textarea onFocus={handleOnFocus} onBlur={handleOnBlur} className="w-[100%] bg-[#222222] p-2 caret-white text-rose-50 h-full resize-none rounded-lg outline-none placeholder:m-2 text-start" placeholder={isOnFocus && text === ''? "":"text comment..."} value={String(text)} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className="flex relative h-[35px] my-2 justify-end">
                    <button onClick={handleCreateComment} className="bg-[#71C997] w-[100px] hover:bg-[#59a47a] active:bg-[#246842] rounded-lg justify-center items-center flex relative text-[#E8E8E8]">Send</button>
                </div>
                
            </div>
            <InfiniteScroll isWindow={true} componentRef={divRef} fetchedData={commentInfo} height={`100%`} width={`100%`} isFlexCol={true}>
                {filteredData.map((comment,index)=>(
                    <div key={index} className="block relative w-full max-w-full pt-4 mb-4 bg-[#3C3C3C] min-h-[7.5rem] border-t-[1px] border-gray-500">
                        <Link href={''} className="float-left min-w-[6.25rem] h-[6.25rem]  custom-xs:min-w-[2.65rem] custom-xs:mt-[0.33rem] custom-xs:h-[2.65rem] mr-3">
                            <img src="/Sweety.jpg" className="block rounded-lg w-full h-full" alt="" />
                        </Link>
                        <div className="relative w-full block h-[3rem]">
                                <div className="block relative comment-head w-full">
                                    <div className="relative flex flex-col w-auto h-auto">
                                        <span className="text-[#B3DCC5]"> 
                                            {comment.UserName}
                                        </span>
                                        <span className="relative flex items-center justify-center bg-[#629377] text-rose-50 rounded-md  min-w-[5rem] w-[5.5rem] max-w-[6rem] h-5 text-[11px] px-1">
                                            {comment.createdAt}
                                        </span>
                                    </div>
                                    {/* <div className="relative block bg-[#629377] text-rose-50 rounded-md  w-[5rem] max-w-[6rem] h-5 text-[11px] px-1">
                                        {comment.time}
                                    </div> */}
                                </div>
                        </div>
                        <div className="block w-full custom-xs:ml-0">
                            <div className="relative block text-rose-50 mt-2 max-w-[88%] h-auto text-[14px] break-words overflow-hidden mr-0">
                                {comment.CommentText}
                            </div>
                        </div>
                    </div>
                ))}

            </InfiniteScroll>
        </div>
    )
}

export default Comments;