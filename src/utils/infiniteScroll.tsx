'use client'
import {debounce} from "lodash";
import axios from "@/components/api/axios";
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { RefObject, useEffect, useRef, useState } from "react"
import { CommentsDto } from "./dto/adminDto/comments.dto";
/* interface Series {
    SeriesViewName:string,
    SeriesName:string
} */
const InfiniteScroll = ({fetchedData,children,height,width,componentRef,isFlexCol}:{isFlexCol?:boolean,componentRef:RefObject<HTMLDivElement>,fetchedData:any[],children?:React.ReactNode,height:number | string,width:number | string,})=>{
    const {page,getPage,setPage} = usePageCounter();
    const [series,setSeries] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    /* const fetchData = async()=>{
        const getSeries = await axios.get('');
        const data:Series[] = getSeries.data;
        setSeries((prevSeries) => [...prevSeries, ...data]);
        setHasMore(data.length>0);
        return getSeries.data;
    } */
    useEffect(()=>{
        console.log('FetchedData: ',fetchedData);
        
        if (fetchedData.length > 0 && fetchedData) {
            setSeries((prevSeries) => 
            {const newSeries = [...prevSeries, ...fetchedData];
            // Remove duplicates by `SeriesName` (or other unique identifiers)
            const uniqueSeries = Array.from(new Map(newSeries.map(item => [item.SeriesName, item])).values());
            return uniqueSeries;});
            setHasMore(fetchedData.length === 15);
            setLoading(false);
        }else{
            console.log('No more data. Setting hasMore to false.');
            setHasMore(false); // No more data to load
        }
    },[page,fetchedData])
    const handleScroll = debounce(() => {
        if (!componentRef.current || loading || !hasMore) return;
        
        console.log('It is handleScroll!',loading);
        const { scrollTop, scrollHeight, clientHeight } = componentRef.current;
        
        if (scrollTop + clientHeight >= scrollHeight *0.75 && hasMore && !loading) {
            console.log('Changing page!');
            setLoading(true)
            setPage(getPage() + 1); // Load the next set of data
            console.log('Page: ',getPage());
        }
      },300);
    
      useEffect(() => {
        const div = componentRef.current
        
        if(div){
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