'use client'
import { CommentsDto } from "@/utils/dto/adminDto/comments.dto";
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { getCommentsData, handleCommentDelete } from "@/utils/admin.logic";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "@/utils/infiniteScroll";
import { usePathname } from "next/navigation";

const Comments = ()=>{
    const [data,setData] = useState<CommentsDto[]>([]);
    const [filteredData,setFilteredData] = useState<CommentsDto[]>([]);
    const divRef = useRef<HTMLDivElement>(null);
    const {getPage,setPage} = usePageCounter();
    const page = getPage();

    useEffect(() => {
        console.log("Pathname or Component changed, resetting page...");
        setPage(0); // Reset the page state
    }, []);
    useEffect(()=>{
        console.log("Fetching comments for page:", getPage());
        const fetchCommentsData = async()=>{
            const data = await getCommentsData(getPage());
            setData(data);
            setFilteredData((prev)=>{
                const newArray = [...prev,...data];
                const filteredArray = Array.from(new Map(newArray.map(item=>[item.Id,item])).values());
                return filteredArray;
            });
        }
        fetchCommentsData();
    },[page]);
    if(!data){
        return (
            <div className="text-3xl flex text-rose-50 w-full h-full justify-center mt-[2rem]">Loading...</div>
        )
    }
    return(
        <div ref={divRef} className={`flex flex-col bg-[#352877] px-5 pb-5 w-full max-h-[37rem] h-full rounded-md overflow-y-scroll scrollbar-hide`}>
            <div className={`flex w-full h-[3rem] border-b-2 border-white font-medium text-[1.25rem] text-rose-50 p-1 justify-between`}>
                <div className="flex w-[6rem] h-full items-end justify-center">
                    User
                </div>
                <div className="flex w-[6rem] h-full items-end ml-[3.5rem]">
                    Content
                </div>
                <div className="flex w-[6rem] h-full items-end mr-[3rem]">
                    Series
                </div>
            </div>
            <InfiniteScroll componentRef={divRef} fetchedData={data} width={`100%`} height={`100%`} isFlexCol={true}>
                {filteredData.map((item,index)=>(
                    <div key={index} className="flex w-full h-[4rem] border-b-2 border-white text-white">
                        <div className="flex min-w-[8rem] w-[10rem] h-full p-[6px]">
                            <div className="flex min-w-[2.75rem] w-[2.75rem] overflow-hidden h-full rounded-md">
                                <img src={`./../Sweety.jpg`} alt="" />
                            </div>
                            <div className="flex flex-col min-w-[7rem] max-w-[10rem] ml-2 h-full">
                                <div className="flex w-full overflow-x-scroll">
                                    {item.UserName}
                                </div>
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
    )
}
export default Comments;