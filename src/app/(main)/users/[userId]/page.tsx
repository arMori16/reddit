
import axios from '@/components/api/axios';
import { formatDate } from '@/utils/formattDate';
import { cookies } from 'next/headers';
import React from 'react';

const Page = async({params}:{params:{userId:number}})=>{
    const {data} = await axios.get('/user/profile/info',{
        headers:{
            'Authorization':`Bearer ${cookies().get('accessToken')?.value}`
        }
    });
    data.createdAt = formatDate(data.createdAt);
    const userLastViewedSeries = await axios.get('/user/lastViewedSeries',{
        headers:{
            'Authorization':`Bearer ${cookies().get('accessToken')?.value}`
        }
    });
    console.log('User data: ',userLastViewedSeries.data);
    
    return(
        <div className='flex flex-col w-full min-h-screen bg-gray-200 pt-[3rem] items-center shadow-[0px_-2px_10px_black]'>
            <div className='flex w-[90%] h-[2rem] shadow-[0px_5px_8px_black] rounded-t-lg bg-[url("http://localhost:3001/media/profile-bg/images")] relative bg-repeat-x bg-auto overflow-hidden'>
                <span className='absolute top-0 left-[1rem] text-white font-semibold text-[1.25rem]'>Profile</span>
            </div>
            <div className='flex h-[28rem] w-[87%] bg-gray-2E p-5'>
                <div className='flex w-[10rem] flex-shrink-0 h-[10rem] rounded-md overflow-hidden'>
                    <img src="/Sweety.jpg" className='w-full h-full' alt="" />
                </div>
                <div className='flex flex-col w-full ml-2'>
                    <div className='text-white text-[1rem] mt-2 font-semibold flex flex-col'>
                        <div className='inline-flex w-fit px-1 bg-green-400 rounded-md'>
                            <p>{data.firstName}</p>
                        </div>
                        <span className='inline-flex px-[6px] bg-gray-100 w-fit text-[0.8rem] rounded-md mt-1'>{data.createdAt}</span>
                    </div>
                    {userLastViewedSeries && (
                        <div className='flex flex-col w-full h-full mt-[1rem] ml-[1rem] '>
                            <p className='text-[1.15rem] text-white font-semibold'>Last Viewed</p>
                            <div className='flex mt-2 ml-2 w-full h-full'>
                                {userLastViewedSeries?.data.map((item:any,index:number)=>(
                                    <div key={index} className='flex w-[10rem] h-[15rem] rounded-md overflow-hidden'>
                                        <img src={`http://localhost:3001/media/${item?.SeriesName}/images`} className='w-full h-full' alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Page;