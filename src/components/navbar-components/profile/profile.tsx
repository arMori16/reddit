'use client'
import { list } from "@/components/catalog/item/item.logic";
import useProfileListItems from "@/components/useZustand/profile/zustandProfileUserList";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "@/components/api/axios";
import Link from "next/link";

const ProfileUserList = ()=>{
    const {listItem,getUserListItem,setUserListItem} = useProfileListItems();
    const [itemsInfo,setItemsInfo] = useState<any[]>([]);
    const [counts,setCounts] = useState<any[]>([]);
    const handleToggleListItems = (item:any)=>{
        setUserListItem(item.key);
    }
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await axios.get('/user/profile/userList/info',{
                params:{
                    currentListItem:getUserListItem().split(" ").join("")
                },
                headers:{
                    'Authorization':`Bearer ${Cookies.get('accessToken')}`
                }
            })
            console.log('This is user list item data: ',data.data);
            const userListItemsCount = await axios.get('/user/userList/count',{
                headers:{
                    'Authorization':`Bearer ${Cookies.get('accessToken')}`
                }
            })
            console.log('Counts: ',userListItemsCount.data);
            setCounts(userListItemsCount.data);
            setItemsInfo(data.data);
        }
        fetchData();
    },[listItem])
    return(
        <div className={`flex mt-[2rem] w-[87%] flex-col rounded-t-md overflow-hidden`}>
             <div className="flex w-full h-[3.15rem] bg-gray-2E border-b-4" style={{borderColor: list.find(item => item.key === getUserListItem())?.color}}>
                {list.map((item:any,index:number)=>(
                    <button key={index} onClick={()=>handleToggleListItems(item)} className={`flex hover:bg-[rgba(255,255,255,0.1)] h-full min-w-[6rem] rounded-t-lg transition-color duration-500 ease-in-out items-center flex-col  justify-center text-white text-[0.8rem]`} style={{backgroundColor:getUserListItem() === item.key?`${item.color}`:''}}>
                        <div className="flex">
                            <i className={`fa fa-${item.value} p-1 rounded-md flex text-white gap-x-2 mr-2`} style={{backgroundColor: item.color}}>
                            </i>
                            <span>{counts.find(countsItem=>countsItem.Status === item.key)?._count.Status || 0}</span>
                        </div>      
                        <p>{item.key}</p>
                    </button>
                ))}
             </div>
            {itemsInfo.map((item:any,index:number)=>(
                <Link key={index} href={`${process.env.NEXT_PUBLIC_FRONT_API}/catalog/item/${item.SeriesName}`} className="flex w-full h-[2.8rem] bg-gray-2E border-b-[1px] border-gray-300 text-white items-center pl-2 font-medium">
                    <div className="flex py-2 items-center ">
                        <img src={`${process.env.NEXT_PUBLIC_API}/media/${item.SeriesName}/images`} className="w-[1.5rem] h-full mr-2 rounded-sm" alt="" />
                        <p>{item.SeriesViewName}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
export default ProfileUserList;