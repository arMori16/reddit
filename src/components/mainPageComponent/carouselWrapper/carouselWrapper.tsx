

import getSeriesInfo, { getSeasonedCatalog } from '@/utils/getSeriesInfo';
import Link from 'next/link';
/* import { useEffect, useState } from 'react'; */


const CarouselWrapper = async()=>{
    /* const [seriesInfo,setSeriesInfo] = useState<{
      seriesName: any;
      seriesViewName: any;
  } | null>(null);
    useEffect(()=>{
      const fetchedData = async()=>{
        const seriesInfo = await getSeasonedCatalog();
        setSeriesInfo(seriesInfo)
      }
      fetchedData()
    },[]) */
    /* if(!seriesInfo){
      return(
        <div className='flex text-white'>
        Loading...
      </div>
      )
    } */
    const seriesInfo = await getSeasonedCatalog();
    return(
        <div className='flex flex-col h-full w-full'>
          <div className='flex rounded-t-lg justify-center items-center max-w-full h-[2.25rem] bg-[#3C3C3C] text-rose-50'>
              SEASON'S ANIME
          </div>
          <div className='flex max-w-full h-[16.25rem] overflow-hidden'>
            {Array.from({length:7},(_,index)=>(
              <Link key={index} href={`catalog/item/${seriesInfo?.seriesName[index]}`} className='flex relative flex-none overflow-hidden flex-col max-w-[11.5rem] h-full'>
                <img src={`http://localhost:3001/media/${seriesInfo?.seriesName[index]}/images`} alt="" className='flex w-[11.5rem] h-full'/>
                <span className='flex absolute text-rose-50 bottom-0 bg-[rgba(0,0,0,0.6)] h-[2.8rem] items-center justify-center pt-[5px] px-1 w-full'>
                  {seriesInfo?.seriesViewName[index]}
                </span>
              </Link>
            ))}
          </div>
            <div className="tabs-content">

            </div>
        </div>
    )
}


export default CarouselWrapper;