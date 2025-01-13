'use server'
import axios from '@/components/api/axios';
import { formatDate } from '@/utils/formattDate';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
const fetchData = async (userId: number) => {
    const accessToken = cookies().get("accessToken")?.value;
  
    const profileRequest = axios.get("/user/profile/info", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  
    const lastViewedRequest = axios.get("/user/lastViewedSeries", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  
    const [profile, lastViewed] = await Promise.all([profileRequest, lastViewedRequest]);
  
    return {
      profile: profile.data,
      lastViewed: lastViewed.data,
    };
  };
  
  const Page = async ({ params }: { params: { userId: number } }) => {
    const { profile, lastViewed } = await fetchData(params.userId);
  
    profile.createdAt = formatDate(profile.createdAt);
    return(
        <div className='flex flex-col w-full min-h-screen bg-gray-200 pt-[3rem] items-center shadow-[0px_-2px_10px_black]'>
            <div className='flex w-[90%] h-[2rem] shadow-[0px_5px_8px_black] rounded-t-lg bg-[url("http://localhost:3001/media/profile-bg/images")] relative bg-repeat-x bg-auto overflow-hidden'>
                <span className='absolute top-0 left-[1rem] text-white font-semibold text-[1.25rem]'>Profile</span>
            </div>
            <div className='flex h-[28rem] w-[87%] bg-gray-2E p-5'>
                <label htmlFor="file-upload" className='flex w-[10rem] cursor-pointer flex-shrink-0 h-[10rem] rounded-md overflow-hidden'>
                    <img src="/Sweety.jpg" className='w-full h-full' alt="" />
                    <input type="file" accept='image/*' className="hidden" id='file-upload'/>
                </label>
                <div className='flex flex-col w-full ml-2'>
                    <div className='text-white text-[1rem] mt-2 font-semibold flex flex-col'>
                        <div className='inline-flex w-fit px-1 bg-green-400 rounded-md'>
                            <p>{profile.firstName}</p>
                        </div>
                        <span className='inline-flex px-[6px] bg-gray-100 w-fit text-[0.8rem] rounded-md mt-1'>{profile.createdAt}</span>
                    </div>
                    {lastViewed.userLastViewedSeries.length !== 0 && (
                        <div className='flex flex-col w-full h-full mt-[1rem] ml-[1rem] '>
                            <p className='text-[1.15rem] text-white font-semibold'>Last Viewed</p>
                            <div className='flex mt-2 ml-2 gap-x-2 w-full h-full'>
                                {lastViewed.userLastViewedSeries.map((item:any,index:number)=>{
                                const itemRate = lastViewed.rates?.find((seriesName:any) => seriesName.SeriesName === item.SeriesName);
                                console.log('LOG:::',itemRate ? itemRate._avg.Value : 0);
                                
                                return(
                                    <a href={`http://localhost:3000/catalog/item/${item.SeriesName}`} key={index} className='flex relative flex-col w-[10rem] transition-transform hover:scale-105 duration-500 ease-in-out overflow-hidden'>
                                        <img src={`http://localhost:3001/media/${item?.SeriesName}/images`} className='w-full h-[15rem] rounded-md' alt="" />
                                        <div className='flex text-ellipsis overflow-hidden text-center'>
                                            <p className='text-white font-medium line-clamp-2'>{item.SeriesViewName}</p>
                                            <span className='flex items-center justify-center absolute top-3 after:content-[""] after:absolute after:right-[-0.97rem] after:border-[#F5C543] after:border-t-[0.75rem] after:border-b-[0.75rem] after:border-r-[1rem] after:border-r-transparent text-[1rem] text-white font-medium bg-orange-yellow h-[1.5rem]'>
                                                <img src="http://localhost:3001/media/star.white.svg/icons" className="w-[1rem] h-[1rem] ml-1" alt="" />
                                                <p className='pl-1 pr-2'>{(itemRate ? itemRate._avg.Value : 0).toFixed(2)}</p>
                                                {/* <span className='h-full border-t-[0.75rem] border-[#F5C543] absolute right-[-0.98rem] border-r-[1rem] border-b-[0.75rem] border-r-transparent bg-orange-yellow'></span> */}
                                            </span>
                                        </div>
                                    </a>
                                )})}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Page;