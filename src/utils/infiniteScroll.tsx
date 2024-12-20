'use client'

import axios from "@/components/api/axios";
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { useEffect, useRef, useState } from "react"
/* interface Series {
    SeriesViewName:string,
    SeriesName:string
} */
const InfiniteScroll = ({fetchedData,children,height,itemsHeight,argument,width,itemsWidth,componentRef}:{componentRef:HTMLDivElement | null,fetchedData:any[],children?:React.ReactNode,height:number | string,itemsHeight:any,argument:any,width:number | string,itemsWidth:number | string})=>{
    const {page,getPage,setPage} = usePageCounter();
    const [series,setSeries] = useState<any[]>([]);
    const divRef = componentRef;
    if(divRef === null){
        return (
            <></>
        )
    }
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
            setSeries((prevSeries) => 
            {const newSeries = [...prevSeries, ...fetchedData];
            // Remove duplicates by `SeriesName` (or other unique identifiers)
            const uniqueSeries = Array.from(new Map(newSeries.map(item => [item.SeriesName, item])).values());
            return uniqueSeries;});
            setHasMore(fetchedData.length > 0);
        }
    },[page,fetchedData])
    const handleScroll = () => {
        console.log('It is handleScroll!');
        if (divRef) {
          const { scrollTop, scrollHeight, clientHeight } = divRef;
          
          if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore) {
            console.log('Changing page!');
            setPage(page + 1); // Load the next set of data
            console.log('Page: ',getPage());
          }
        }
      };
    
      useEffect(() => {
        const div = divRef
        if(div){
            console.log('CURRENT!');
            
            div.addEventListener("scroll", handleScroll);
            return () => div.removeEventListener("scroll", handleScroll);
        }
      }, [hasMore]);
    return (
        <div className={`flex w-[${width}] h-[${height}]`}>
            {children}
        </div>
    )
}
export default InfiniteScroll;