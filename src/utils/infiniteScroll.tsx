'use client'

import axios from "@/components/api/axios";
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { RefObject, useEffect, useRef, useState } from "react"
/* interface Series {
    SeriesViewName:string,
    SeriesName:string
} */
const InfiniteScroll = ({fetchedData,children,height,width,componentRef,isFlexCol}:{isFlexCol?:boolean,componentRef:RefObject<HTMLDivElement>,fetchedData:any[],children?:React.ReactNode,height:number | string,width:number | string,})=>{
    const {page,getPage,setPage} = usePageCounter();
    const [series,setSeries] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const [loading, setLoading] = useState(false);
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
            setHasMore(fetchedData.length > 1);
            setLoading(false);
        }else {
            console.log('SETHASMORE FALSE!!!!!');
            
            setHasMore(false); // No more data to load
        }
    },[page,fetchedData])
    const handleScroll = () => {
        console.log('It is handleScroll!');
        if (componentRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = componentRef.current;
          console.log('HASMORE : ',hasMore);
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(()=>{
            if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
              console.log('Changing page!');
              setLoading(true)
              setPage(getPage() + 1); // Load the next set of data
              console.log('Page: ',getPage());
            }
            
        },300)
        }
      };
    
      useEffect(() => {
        const div = componentRef.current
        console.log('EVEN THIS IS DOESNT WORK>??');
        
        if(div){
            console.log('CURRENT!');
            
            div.addEventListener("scroll", handleScroll);
            return () => div.removeEventListener("scroll", handleScroll);
        }
      }, [hasMore]);
    return (
        <div className={`flex ${isFlexCol ? 'flex-col':''} w-[${width}] h-[${height}]`}>
            {children}
        </div>
    )
}
export default InfiniteScroll;