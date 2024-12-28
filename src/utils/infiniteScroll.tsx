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
const InfiniteScroll = ({fetchedData,children,height,width,componentRef,isFlexCol,isWindow}:{isWindow?:boolean,isFlexCol?:boolean,componentRef:RefObject<HTMLDivElement>,fetchedData:any[],children?:React.ReactNode,height:number | string,width:number | string,})=>{
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
        const target = isWindow ? window : componentRef.current;
        if (!target || loading || !hasMore) return;
        
        console.log('It is handleScroll!',loading);
        if (isWindow) {
            // Handle window scrolling
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight;
      
            if (scrollTop + clientHeight >= scrollHeight * 0.75) {
              setLoading(true);
              setPage(getPage() + 1);
            }
          } else if (componentRef.current) {
            // Handle div scrolling
            const scrollTop = componentRef.current.scrollTop;
            const clientHeight = componentRef.current.clientHeight;
            const scrollHeight = componentRef.current.scrollHeight;
      
            if (scrollTop + clientHeight >= scrollHeight * 0.75) {
              setLoading(true);
              setPage(getPage() + 1);
            }
          }
      },300);
      /* if(isWindow){
        useEffect(()=>{
            window.addEventListener("scroll",handleScroll);
            return(()=>{
                window.removeEventListener("scroll",handleScroll);
            })
        },[hasMore])
      } */
      /* useEffect(() => {
        const div = componentRef.current
        
        if(div && !isWindow){
            div.addEventListener("scroll", handleScroll);
            return () => div.removeEventListener("scroll", handleScroll);
        }
      }, [hasMore]); */
      useEffect(() => {
        const target = isWindow ? window : componentRef.current;
    
        if (target) {
          target.addEventListener("scroll", handleScroll);
        }
    
        return () => {
          if (target) {
            target.removeEventListener("scroll", handleScroll);
          }
        };
      }, [hasMore]);
    return (
        <div className={`flex ${isFlexCol ? 'flex-col':''} w-[${width}] h-[${height}]`}>
            {children}
        </div>
    )
}
export default InfiniteScroll;