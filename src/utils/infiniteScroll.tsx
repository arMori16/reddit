'use client'
import {debounce} from "lodash";
import axios from "@/components/api/axios";
import usePageCounter from "@/components/useZustand/zustandPageCounter";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import { CommentsDto } from "./dto/adminDto/comments.dto";
import useCommentsCounter from "@/components/useZustand/zustandCommentsCounter";
/* interface Series {
    SeriesViewName:string,
    SeriesName:string
} */
const InfiniteScroll = ({type,fetchedData,children,height,width,componentRef,isFlexCol,isWindow}:{type:string,isWindow?:boolean,isFlexCol?:boolean,componentRef:RefObject<HTMLDivElement>,fetchedData:any[],children?:React.ReactNode,height:number | string,width:number | string,})=>{
    const {page,getPage,setPage,setSearchPage,getSearchPage,getUsersPage,setUsersPage} = usePageCounter();
    const {commentPage,getCommentPage,setCommentPage} = useCommentsCounter();
    const [series,setSeries] = useState<any[]>([]);
    const [comment,setComment] = useState<any[]>([]);
    const [users,setUsers] = useState<any[]>([]);
    const [search,setSearch] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const typeMapping: Record<
      string,
      { setter: React.Dispatch<React.SetStateAction<any[]>>; key: string; pageSetter: (num: number) => void, getter: () => number }
    > = {
      series:   { setter: setSeries, key: "SeriesName", pageSetter: setPage, getter: getPage },
      comments: { setter: setComment, key: "Id", pageSetter: setCommentPage, getter: getCommentPage  },
      search:   { setter: setSearch, key: "SeriesName", pageSetter: setSearchPage, getter: getSearchPage },
      users:    { setter:setUsers, key: "firstName",pageSetter:setUsersPage, getter: getUsersPage}
    };

    const updateList = (
      setter: React.Dispatch<React.SetStateAction<any[]>>,
      uniqueKey: string,
      fetchedData: any[]
    ) => {
      setter((prev) => {
        const combined = [...prev, ...fetchedData];
        const uniqueItems = Array.from(
          new Map(combined.map((item) => [item[uniqueKey], item])).values()
        );
        return uniqueItems;
      });
    };

    useEffect(()=>{
        console.log('FetchedData: ',fetchedData);
        
        if (fetchedData.length > 0 && fetchedData) {
            if (typeMapping[type]) {
              updateList(typeMapping[type].setter, typeMapping[type].key, fetchedData);
            } else {
              console.warn("Unknown type:", type);
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
              typeMapping[type].pageSetter(typeMapping[type].getter() + 1);
            }
          } else if (componentRef.current) {
            // Handle div scrolling
            const scrollTop = componentRef.current.scrollTop;
            const clientHeight = componentRef.current.clientHeight;
            const scrollHeight = componentRef.current.scrollHeight;
      
            if (scrollTop + clientHeight >= scrollHeight * 0.75) {
              setLoading(true);
              console.log('IM HERE');
              typeMapping[type].pageSetter(typeMapping[type].getter() + 1);
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