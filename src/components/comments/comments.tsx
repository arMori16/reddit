"use client"
import { useEffect, useRef, useState } from "react";
import { createComment, getFirstComments } from "./comments.logic";
import Link from "next/link";
import { CommentsDto } from "@/utils/dto/adminDto/comments.dto";
import InfiniteScroll from "@/utils/infiniteScroll";
import usePageCounter from "../useZustand/zustandPageCounter";




const Comments = ({seriesName}:{seriesName:string})=>{
    const [show,setShow] = useState(false);
    const [showReplyState, setShowReplyState] = useState<{ [key: number]: boolean }>({});
    const [commentIndex,setCommentIndex] = useState(0);
    const [text,setText] = useState<string>('');
    const [replyText,setReplyText] = useState<string>('');
    const [isOnFocus,setIsOnFocus] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const {getPage} = usePageCounter();
    const page = getPage();
    /* const [usersArray, setUsersArray] = useState<string[]>([]);
    const [timeArray,setTimeArray] = useState<string[]>([])
    const [commentText,setCommentText] = useState<string[]>([]); */
    const [commentInfo,setCommentInfo] = useState<CommentsDto[]>([]);
    const [childComments,setChildComments] = useState<CommentsDto[]>([]);
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
            setChildComments((prev)=>{
                const newArray = [...prev,...data?.childComments];
                const filteredArray = Array.from(new Map(newArray.map(item=>[item.Id,item])).values());
                return filteredArray;
            })
            setCommentInfo(data?.formattedComments); // Store structured comments
            setFilteredData((prev)=>{
                const newArray = [...prev,...data?.formattedComments];
                const filteredArray = Array.from(new Map(newArray.map(item=>[item.Id,item])).values());
                return filteredArray;
            });
        };

        fetchData();
    }, [page,updateComments]);
    const handleCreateComment = async(reply:boolean,commentId?:number)=>{
        if(reply){
            setReplyText('');
            setShow(false);
            setCommentIndex(0);
            const newComment = await createComment(seriesName,replyText,commentId);
            setChildComments((prev) => [...prev, newComment]);
        }else{
            setText('');
            const newComment = await createComment(seriesName,text);
            setFilteredData((prev) => [newComment, ...prev]);
        }
        
        setUpdateComments((prev)=>!prev);
    }
    if(!commentInfo){
        return(
            <></>
        )
    }
    const toggleAnimation = (commentId:number) => {
        const element = animationRef.current[commentId];
        if (element) {
          if (showReplyState[commentId]) {
            element.classList.add("animate-slideCommentsIn");
            setShowReplyState((prev)=>(
                {...prev,[commentId]: !prev[commentId]}
            ));
            setTimeout(() => {
                element.classList.remove("block");
                element.classList.add("hidden");
                element.classList.remove("animate-slideCommentsIn");
            }, 500);
          } else {
              
              element.classList.add('block',"animate-slideCommentsOut");
              element.classList.remove("hidden");
            setShowReplyState((prev)=>(
                {...prev,[commentId]: !prev[commentId]}
            ));
            setTimeout(() => {
                element.classList.remove("animate-slideCommentsOut");
                console.log('CLASS LIST 2: ',element.classList);
            }, 500);
          }
        }
      };
      /* const toggleReply = (commentId: number) => {
        setShowReplyState((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    }; */
    const handleRef = (el: HTMLDivElement | null,commentId:number): void => {
        if (el) {
          animationRef.current[commentId] = el;
        }
      };
    const getAllReplies = (parentId: number, comments: any[]): any[] => {
        // Find direct replies
        const directReplies = comments.filter((comment) => comment.ParentId === parentId);
        
        // Recursively find nested replies
        return directReplies.flatMap((reply) => [reply, ...getAllReplies(reply.Id, comments)]);
    };
    return(
        <div ref={divRef} className="relative flex flex-col w-full p-4 bg-[#3C3C3C] mb-[100px]">
            <div className="h-auto flex flex-col relative w-full bg-[#3C3C3C]">
                <div className="flex relative h-[100px] w-auto">
                    <textarea onFocus={handleOnFocus} onBlur={handleOnBlur} className="w-[100%] bg-[#222222] p-2 caret-white text-rose-50 h-full resize-none rounded-lg outline-none placeholder:m-2 text-start" placeholder={isOnFocus && text === ''? "":"text comment..."} value={String(text)} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className="flex relative h-[35px] my-2 justify-end">
                    <button onClick={()=>handleCreateComment(false)} className="bg-[#71C997] w-[100px] hover:bg-[#59a47a] active:bg-[#246842] rounded-lg justify-center items-center flex relative text-[#E8E8E8]">Send</button>
                </div>
                
            </div>
            <InfiniteScroll componentRef={divRef} fetchedData={commentInfo} height={`100%`} width={`100%`} isFlexCol={true}>
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
                        <div className="block relative w-full custom-xs:ml-0">
                            <div className="relative block text-rose-50 mt-2 max-w-[88%] h-auto text-[14px] break-words overflow-hidden mr-0">
                                {comment.CommentText}
                            </div>
                        </div>
                        {show && comment.Id === commentIndex && (
                            <div className="w-full relative top-full mt-5 flex flex-col h-[6rem]">
                                <textarea className="bg-gray-200 p-4 mt-5 text-rose-50 h-full resize-none rounded-lg outline-none text-start" value={String(replyText)} onChange={(e) => setReplyText(e.target.value)}></textarea>
                            </div>
                        )}
                        {show && comment.Id === commentIndex ? (
                            <button onClick={()=>handleCreateComment(true,comment.Id)} className="flex mt-4 justify-center items-center text-white font-medium ml-auto w-[6rem] h-[1.75rem] rounded-md bg-green-400 p-1">
                                send reply
                            </button>
                        ):(
                            <div className="flex w-full justify-end">
                                <button onClick={()=>{setShow(true);setCommentIndex(comment.Id)}} className="flex text-[0.8rem] justify-center items-center w-[4rem] h-[1.75rem] bg-gray-200 shadow-image rounded-md text-white">reply</button>
                            </div>
                        )}
                        
                        {childComments.some((item:any)=> item.ParentId === comment.Id || item.ParentId === childComments.some((nestedItem:any)=>nestedItem.Id === item.ParentId))  && (
                            <div>
                                <button onClick={()=>toggleAnimation(comment.Id)} className="flex w-full h-[2rem] font-normal bg-gray-300 rounded-md items-center justify-center text-white border-[1px] border-gray-400 my-2">
                                    <p>{showReplyState[comment.Id] ? 'Hide replies' : `Show replies(${getAllReplies(comment.Id, childComments).length})`}</p>
                                </button>
                                <div className={`hidden`} ref={(el) => handleRef(el, comment.Id)}>
                                    {showReplyState[comment.Id] && (
                                        getAllReplies(comment.Id, childComments).map((child:any,index:number)=>(
                                            <div key={index} className="block relative w-full max-w-full pt-2 mb-4 bg-[#3C3C3C] min-h-[7.5rem] pl-2 border-l-2 border-l-green-400">
                                                <Link href={''} className="float-left min-w-[6.25rem] h-[6.25rem]  custom-xs:min-w-[2.65rem] custom-xs:mt-[0.33rem] custom-xs:h-[2.65rem] mr-3">
                                                    <img src="/Sweety.jpg" className="block rounded-lg w-full h-full" alt="" />
                                                </Link>
                                                <div className="relative w-full block h-[3rem]">
                                                    <div className="block relative comment-head w-full">
                                                        <div className="relative flex flex-col w-auto h-auto">
                                                            <span className="text-[#B3DCC5]"> 
                                                                {child.UserName}
                                                            </span>
                                                            <span className="relative flex items-center justify-center bg-[#629377] text-rose-50 rounded-md min-w-[5rem] w-[5.5rem] max-w-[6rem] h-5 text-[11px] px-1">
                                                                {child.createdAt}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="block w-full custom-xs:ml-0">
                                                    <div className="relative block text-rose-50 mt-2 max-w-[88%] h-auto text-[14px] break-words overflow-hidden mr-0">
                                                        <span className="bg-gray-2E rounded-md mr-1 p-1">@{comment.UserName}</span>{child.CommentText}
                                                    </div>
                                                </div>
                                                {show && child.Id === commentIndex && (
                                                    <div className="w-full relative top-full mt-5 flex flex-col h-[6rem]">
                                                        <textarea className="bg-gray-200 p-4 mt-5 text-rose-50 h-full resize-none rounded-lg outline-none text-start" value={String(replyText)} onChange={(e) => setReplyText(e.target.value)}></textarea>
                                                    </div>
                                                )}
                                                {show && child.Id === commentIndex ? (
                                                    <button onClick={()=>handleCreateComment(true,child.Id)} className="flex mt-4 justify-center items-center text-white font-medium ml-auto w-[6rem] h-[1.75rem] rounded-md bg-green-400 p-1">
                                                        send reply
                                                    </button>
                                                ):(
                                                    <div className="flex w-full justify-end">
                                                        <button onClick={()=>{setShow(true);setCommentIndex(child.Id)}} className="flex text-[0.8rem] justify-center items-center w-[4rem] h-[1.75rem] bg-gray-200 shadow-image rounded-md text-white">reply</button>
                                                    </div>
                                                )}
                                            </div>

                                        ))
                                    )}
                                </div>
                            </div> 
                        )}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default Comments;