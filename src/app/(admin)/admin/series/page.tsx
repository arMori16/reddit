'use client'
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { deleteSeries, getAllCounts, getSeries } from "@/utils/admin.logic";
import InfiniteScroll from "@/utils/infiniteScroll";
import Link from "next/link";
import { useState, useEffect, useRef, RefObject } from "react";


const Series = ()=>{
    const divRef = useRef<HTMLDivElement>(null)
    const {getPage} = usePageCounter();
    const page = getPage();
    const [trigger,setTrigger] = useState(false);
    const [seriesInfo,setSeriesInfo] = useState<{
        SeriesName:string,
        SeriesViewName:string
    }[]>([]);
    
    useEffect(()=>{
        const fetchedData = async()=>{
            const seriesInfoData = await getSeries(page);
            setSeriesInfo((prevSeries) => 
                {const newSeries = [...prevSeries, ...seriesInfoData];
                // Remove duplicates by `SeriesName` (or other unique identifiers)
                const uniqueSeries = Array.from(new Map(newSeries.map(item => [item.SeriesName, item])).values());
                return uniqueSeries;}
            );
        }
        fetchedData()
        setTrigger(false);
    },[trigger,page])
    return(
        <div className="flex max-w-full flex-col w-full h-full">
            <div className="flex max-w-full w-full h-[35rem] p-5 bg-[#352877] rounded-md">
                <div className="flex w-full h-full max-w-full bg-[#352877] p-5 rounded-lg text-[1rem] text-rose-50 font-medium">
                    <div ref={divRef} className="flex flex-col max-w-full w-full h-full overflow-y-scroll">
                        <div className="flex w-full h-full">
                            <div className="flex flex-col w-[2.5rem] min-h-[3.5rem]">
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
                            
                            <div className="flex flex-col w-[8rem] h-full">
                                {Array.from({length:seriesInfo.length},(_,index)=>(
                                <div key={index} className="flex min-h-[3.5rem] w-[8rem]  gap-2 items-center ml-auto mr-4 text-[0.85rem] border-b-2 border-white">
                                    <div className="flex w-[50%] h-[1.50rem]">
                                        <Link href={`series/view/${seriesInfo[index].SeriesName}`} className="flex bg-[#5DC090] justify-center items-center w-full rounded-sm">view</Link>
                                    </div>
                                    <div className="flex w-[50%] h-[1.50rem]">
                                        <button onClick={()=>{deleteSeries(seriesInfo[index].SeriesName);
                                            setTrigger(true);
                                            }} className="flex bg-[#B32C25] justify-center items-center w-full rounded-sm">delete</button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex max-w-full w-full h-[3.50rem] justify-end items-center mt-5">
                <Link href={'series/add-new-series'} className="flex h-full w-[3.50rem] overflow-hidden rounded-[50%] mr-5 bg-white">
                    <img src={`http://localhost:3001/media/images/plus/icons`} className="flex h-full w-full" alt="" />
                </Link>
            </div>
        </div>
    )
}
export default Series;