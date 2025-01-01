'use client'
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { handleCommentDelete, handleUserCommentsHitory } from "@/utils/admin.logic";
import { CommentsDto } from "@/utils/dto/adminDto/comments.dto";
import InfiniteScroll from "@/utils/infiniteScroll";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const View = ({params}:{params:{userName:string,createdAt:string,commentText:string,seriesName:string}})=>{
    const {page,getPage,setPage} = usePageCounter();
    const divRef = useRef<HTMLDivElement>(null);
    const userName = decodeURIComponent(params.userName);
    const createdAt = decodeURIComponent(params.createdAt);
    const commentText = decodeURIComponent(params.commentText);
    const seriesName = decodeURIComponent(params.seriesName);
    const [historyData,setHistoryData] = useState<CommentsDto[]>([]);
    const [showHistory,setShowHistory] = useState<boolean>(false);
    const [filteredData,setFilteredData] = useState<CommentsDto[]>([]);
    const handleHistoryAnimation = ()=>{
        if(divRef.current){
            if(showHistory){
                divRef.current.classList.add('animate-slideOut');
                setShowHistory(false);
                setTimeout(()=>{
                    divRef.current?.classList.remove('flex');
                    divRef.current?.classList.add('hidden');
                    divRef.current && divRef.current.classList.remove('animate-slideOut');
                },1000)
            }else{
                divRef.current?.classList.remove('hidden');
                divRef.current.classList.add('animate-slideIn');
                
                setTimeout(()=>{
                    divRef.current?.classList.add('flex');
                    divRef.current && divRef.current.classList.remove('animate-slideIn');
                    setShowHistory(true);
                },1000)
            }
        }
    }

    useEffect(()=>{

        const fetchedData = async()=>{
            const data = await handleUserCommentsHitory(userName,getPage());
            setHistoryData(data);
            setFilteredData((prev)=>{
                const newArray = [...prev,...data];
                const filteredArray = Array.from(new Map(newArray.map(item=>[item.Id,item])).values());
                return filteredArray;
            })
        }
        fetchedData()
    },[page])
    return(
        <div className="flex min-w-full min-h-[10rem] flex-col">
            <div className="block max-w-full min-h-[5rem] bg-gray-300 rounded-md items-center relative text-white p-5">
                <div className="block float-left w-[5rem] h-[5rem] custom-lg:max-w-[2.65rem] custom-lg:mt-[0.33rem] custom-lg:h-[2.65rem] overflow-hidden rounded-md mr-2">
                    <img src={`../../../../../../Sweety.jpg`} className="block w-full h-full" alt="" />
                </div>
                {/* TODO: Link that sends the admin to user page view,when it was clicked */}
                <div className="block relative w-full ">
                    <div className="flex flex-col relative">
                        <div className="font-medium  text-[1.25rem] relative">
                            {userName}
                        </div>
                        <div className="flex font-normal mb-1">
                            <div className="flex rounded-md h-[1.25rem] items-center justify-center relative bg-[#629377] min-w-[5rem] w-[5.5rem] max-w-[6rem] text-[11px] px-1">
                                {createdAt}
                            </div>
                            <div className="flex bg-[#402D9F] px-[6px] ml-1 rounded-md min-h-[1.25rem] items-center justify-center text-[0.8rem]">
                                {seriesName}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="block w-full">
                    <div className="font-light relative max-w-[88%] break-words overflow-hidden">
                        {commentText}
                    </div>

                </div>
            </div>
            {/* TODO: Show history button */}
            <div className="flex w-full font-medium text-[1rem] my-5 items-center justify-center text-white">
                <button onClick={handleHistoryAnimation}>
                    History
                </button>
            </div>
            <div ref={divRef} className={`hidden max-w-full bg-gray-300  rounded-[0.25rem]`}>
                <InfiniteScroll isWindow={true} fetchedData={historyData} componentRef={divRef} width={`100%`} height={`100%`} isFlexCol={true}>
                    {filteredData.map((item,index)=>(
                        <div key={index} className="flex w-full h-[4rem] border-b-2 border-white text-white">
                        <div className="flex min-w-[8rem] w-[10rem] h-full p-[6px]">
                            <div className="flex min-w-[2.75rem] w-[2.75rem] overflow-hidden h-full rounded-md custom-xs:min-w-[2.65rem] custom-xs:mt-[0.33rem] custom-xs:h-[2.65rem]">
                                <img src={`../../../../../../Sweety.jpg`} alt="" />
                            </div>
                            <div className="flex flex-col min-w-[7rem] max-w-[10rem] ml-2 h-full">
                                <Link href={`http://localhost:3000/admin/comments/view/${encodeURIComponent(item.UserName)}/${encodeURIComponent(String(item.createdAt))}/${encodeURIComponent(item.CommentText)}/${item.SeriesName}`} className={`flex w-full overflow-x-scroll hover:text-[#b5536d]`}>
                                    {item.UserName}
                                </Link>
                                <div className="flex w-full">
                                    {item.createdAt}
                                </div>
                            </div>
                        </div>
                        <div className={`flex min-w-[18rem] scrollbar-hide max-w-[25rem] overflow-y-scroll overflow-x-scroll ml-auto ${item.CommentText.length <100?'items-center justify-center':''}`}>
                            {item.CommentText}
                        </div>
                        <div className="flex w-[8rem] items-center justify-center ml-auto">
                            <div className="flex w-full h-[1.75rem] scrollbar-hide overflow-x-scroll overflow-y-hidden whitespace-nowrap">
                                {item.SeriesName}
                            </div>
                        </div>
                        <div className="flex w-[1.7rem] h-full ml-[1rem] items-center justify-center ">
                            <button onClick={async()=>{await handleCommentDelete(item.Id);setFilteredData((prev) => prev.filter((comment) => comment.Id !== item.Id));
                                }} className="flex w-full h-[1.7rem] rounded-md pb-[2px] items-center justify-center font-bold">
                                <span className="rotate-45">+</span>
                            </button>
                        </div>
                    </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}
export default View;