'use client'
import {debounce} from "lodash";
import axios from "@/components/api/axios";
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { RefObject, useEffect, useRef, useState } from "react"
import { CommentsDto } from "./dto/adminDto/comments.dto";
import useCommentsCounter from "@/components/useZustand/zustandCommentsCounter";
/* interface Series {
    SeriesViewName:string,
    SeriesName:string
} */
const InfiniteScroll = ({type,fetchedData,children,height,width,componentRef,isFlexCol,isWindow}:{type?:string,isWindow?:boolean,isFlexCol?:boolean,componentRef:RefObject<HTMLDivElement>,fetchedData:any[],children?:React.ReactNode,height:number | string,width:number | string,})=>{
    const {page,getPage,setPage} = usePageCounter();
    const {commentPage,getCommentPage,setCommentPage} = useCommentsCounter();
    const [series,setSeries] = useState<any[]>([]);
    const [comment,setComment] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log('FetchedData: ',fetchedData);
        
        if (fetchedData.length > 0 && fetchedData) {
          if(type === 'series'){
            setSeries((prevSeries) => 
            {const newSeries = [...prevSeries, ...fetchedData];
            // Remove duplicates by `SeriesName` (or other unique identifiers)
            const uniqueSeries = Array.from(new Map(newSeries.map(item => [item.SeriesName, item])).values());
            return uniqueSeries;});

          }else if(type === 'comments'){
            setComment((prev) => 
              {const newSeries = [...prev, ...fetchedData];
              // Remove duplicates by `SeriesName` (or other unique identifiers)
              const uniqueSeries = Array.from(new Map(newSeries.map(item => [item.Id, item])).values());
              return uniqueSeries;});
          }
            setHasMore(fetchedData.length === 15);
            setLoading(false);
        }else{
            console.log('No more data. Setting hasMore to false.');
            setHasMore(false); // No more data to load
        }
    },[page,commentPage,fetchedData])
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
              if(type === 'series'){
                setPage(getPage() + 1);
              }else if(type === 'comments'){
                setCommentPage(getCommentPage() + 1)
              }
            }
          } else if (componentRef.current) {
            // Handle div scrolling
            const scrollTop = componentRef.current.scrollTop;
            const clientHeight = componentRef.current.clientHeight;
            const scrollHeight = componentRef.current.scrollHeight;
      
            if (scrollTop + clientHeight >= scrollHeight * 0.75) {
              setLoading(true);
              console.log('IM HERE');
              
              if(type === 'series'){

                setPage(getPage() + 1);
              }else if(type === 'comments'){
                setCommentPage(getCommentPage() + 1)
                console.log('WORK PAGE: ',getCommentPage());
                
              }
            }
          }
      },300);
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