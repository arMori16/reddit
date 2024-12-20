'use client'

import axios from "@/components/api/axios";
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { useEffect, useRef, useState } from "react"
/* interface Series {
    SeriesViewName:string,
    SeriesName:string
} */
const InfiniteScroll = ({fetchedData,children,height,itemsHeight,argument,width,itemsWidth}:{fetchedData:any[],children?:React.ReactNode,height:number | string,itemsHeight:any,argument:any,width:number | string,itemsWidth:number | string})=>{
    const {page,getPage,setPage} = usePageCounter();
    const [series,setSeries] = useState<any[]>([]);
    const divRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    /* const fetchData = async()=>{
        const getSeries = await axios.get('');
        const data:Series[] = getSeries.data;
        setSeries((prevSeries) => [...prevSeries, ...data]);
        setHasMore(data.length>0);
        return getSeries.data;
    } */
    useEffect(()=>{
        if (fetchedData.length > 0) {
            setSeries((prevSeries) => [...prevSeries, ...fetchedData]);
            setHasMore(fetchedData.length > 0);
        }
    },[page,fetchedData])
    const handleScroll = () => {
        if (divRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = divRef.current;
          if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore) {
            setPage(getPage() + 1); // Load the next set of data
          }
        }
      };
    
      useEffect(() => {
        const div = divRef.current
        if(div){
            div.addEventListener("scroll", handleScroll);
            return () => div.removeEventListener("scroll", handleScroll);
        }
      }, [hasMore]);
    return (
        <div ref={divRef} className={`flex w-[${width}] h-[${height}] overflow-y-scroll`}>
            {children}
            <div className="flex flex-col w-full h-full">
                {Array.from({length:fetchedData.length},(_,index)=>(
                    <div key={index} className={`flex w-[${itemsWidth}] h-[${itemsHeight}] border-b-2 border-white`}>
                        <div className="flex ml-1 w-full h-full items-center">
                            {fetchedData[index][argument]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default InfiniteScroll;