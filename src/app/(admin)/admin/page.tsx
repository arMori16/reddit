"use client"
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { getAllCounts, getSeries } from "@/utils/admin.logic";
import InfiniteScroll from "@/utils/infiniteScroll";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";






const AdminPage = ()=>{
    const {getPage,setPage} = usePageCounter();
    const page = getPage();
    const divRef = useRef<HTMLDivElement>(null);
    const [counts,setCounts] = useState<{
        comments:number,
        series:number,
        users:number,
    }>({ comments: 0, users: 0, series: 0 });
    const [seriesInfo,setSeriesInfo] = useState<{
        SeriesName:string,
        SeriesViewName:string
    }[]>([]);
    /* useEffect(() => {
        console.log("Pathname or Component changed, resetting page...");
        setPage(0); // Reset the page state
    }, []); */
    useEffect(()=>{
        const fetchedData = async()=>{
            const countsData = await getAllCounts();
            const seriesInfoData = await getSeries(getPage());
            setCounts(countsData);
            setSeriesInfo((prevSeries) => 
                {const newSeries = [...prevSeries, ...seriesInfoData];
                // Remove duplicates by `SeriesName` (or other unique identifiers)
                const uniqueSeries = Array.from(new Map(newSeries.map(item => [item.SeriesName, item])).values());
                return uniqueSeries;});
        }
        fetchedData()
    },[page])
    return(
        <div className="flex flex-col w-full min-h-full px-5">
            <div className="flex font-medium text-[1.5rem] h-[3rem] ml-4 text-rose-50">
                Analytics
            </div>
            {/* {`3labels`} */}
            <div className="flex max-w-fll w-full min-h-[30rem] h-[30rem]">
                {/* SeriesInfo */}
                <div className="flex max-w-[50%] w-[50%] h-full">
                    <div ref={divRef} className="flex w-full max-w-full bg-[#352877] p-5 rounded-lg text-[1rem] text-rose-50 font-medium overflow-y-scroll">
                            <div className="flex flex-col max-w-[2.5rem] w-[2.5rem] h-full items-center">
                            {Array.from({length:seriesInfo.length},(_,index)=>(
                                    <div key={index} className="flex p-1 w-[2.5rem] min-h-[3.5rem] border-b-2 border-white">
                                        <img src={`http://localhost:3001/media/images/${seriesInfo[index].SeriesName}/images`} className="rounded-sm" alt="" />
                                    </div>
                            ))}
                            </div>
                        <InfiniteScroll componentRef={divRef} width={`100%`} height={`100%`} fetchedData={seriesInfo}>
                            <div className="flex flex-col w-full h-full">
                                {Array.from({length:seriesInfo.length},(_,index)=>(
                                    <div key={index} className="flex pl-2 w-full min-h-[3.5rem] items-center border-b-2 border-white">
                                        {seriesInfo[index].SeriesViewName}
                                    </div>
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
                {/* SeriesInfo */}
                <div className="flex flex-col max-w-[48%] w-[48%] h-full text-[1.25rem] text-rose-50 font-light ml-auto">
                    <div className="flex w-full h-[9rem] items-center justify-end gap-5">
                        <button className="flex flex-col max-w-[33.33%] w-[12rem] p-3 h-[5.4rem] bg-[#352877] rounded-lg">
                            <div className="flex">
                                Comments
                            </div>
                            <div className="flex w-full justify-center max-w-full text-[1rem] text-rose-50 font-medium">
                                {counts.comments}
                            </div>
                        </button>
                        <button className="flex flex-col max-w-[33.33%] w-[10rem] p-3 h-[5.4rem] bg-[#352877] rounded-lg">
                            <div className="flex">
                                Series
                            </div>
                            <div className="flex w-full justify-center max-w-full text-[1rem] text-rose-50 font-medium">
                                {counts.series}
                            </div>
                        </button>
                        <button className="flex flex-col  max-w-[33.33%] w-[11rem] p-3 h-[5.4rem] bg-[#352877] rounded-lg">
                            <div className="flex">
                                Users
                            </div>
                            <div className="flex text-[1rem] w-full justify-center max-w-full text-rose-50 font-medium">
                                {counts.users}
                            </div>
                        </button>
                    </div>
                    <div className="flex w-full h-full bg-[#352877] rounded-lg">

                    </div>
                </div>
            </div>
            {/* {`label1`} */}
            <div className="flex flex-col w-full h-[20rem] mt-5 p-5  max-w-full  bg-[#352877] rounded-lg">
                <div className="flex max-w-full w-full h-[3rem] border-b-2 text-[1.25rem] text-rose-50 font-normal items-end">
                    <div className="flex">
                        User
                    </div>
                    <div className="flex ml-auto max-w-[14rem] mr-4 w-[14rem] justify-between">
                        <div className="flex">
                            Id
                        </div>
                        <div className="flex">
                            Comments
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;