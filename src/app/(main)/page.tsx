'use server'
import axios from '@/components/api/axios';
import CarouselWrapper from '@/components/mainPageComponent/carouselWrapper/carouselWrapper';
import TabsComponent from '@/components/mainPageComponent/tabs-content/tabs';
import { xui2 } from '@/components/mainPageComponent/test';
import SearchBar from '@/components/navbar-components/search-bar/search-bar';
import usePageCounter from '@/components/useZustand/zustandPageCounter';
import { SeriesInfo } from '@/utils/dto/adminDto/seriesInfo.dto';
import { SSeriesDto } from '@/utils/dto/main/SSeriesDto';
import getSeriesInfo, { getPageCount, getSeasonedCatalog } from '@/utils/getSeriesInfo';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Home({searchParams}:{searchParams:{page:number}}) {
  
  const seriesInfo = await getSeriesInfo(searchParams.page - 1);
  const counts = await getPageCount() || 1;
  const data = await getSeasonedCatalog();
  if(searchParams.page > counts){
    notFound()
  }
  return (
      <div className='max-w-full relative min-h-[100vh] h-auto bg-[#242424] shadow-[0px_-2px_10px_black]'>
        <div className='flex relative flex-col items-center mx-2'>
          <div className={`custom-md-lg:flex mt-[3rem] hidden w-full relative ml-auto items-center justify-center`}>
              <SearchBar isAdmin={false} model='catalog'/>
          </div>
          <div className='block w-full flex-grow max-w-[1300px]'>
            <CarouselWrapper seasonedAnime={data.data}/>
          </div>
          <div className='flex relative justify-center h-[15rem] max-w-[60rem]'>

          </div>
          <div className='flex relative flex-wrap'>
             <TabsComponent seriesNames={seriesInfo.seriesNames} seriesViewNames={seriesInfo.seriesViewName} rate={seriesInfo.rate} genre={seriesInfo.genre}/>
          </div>
          <div className='flex mb-[10rem] max-w-[61.25rem] h-[2.5rem] p-1 gap-x-2 font-medium text-white'>
            {Array.from({length:counts <= 7?counts:7},(value,index)=>(
              <Link key={index} href={`http://localhost:3000/?page=${index + 1}`} className='flex bg-gray-300 h-full w-[2rem] items-center justify-center rounded-md'>
                <p>{index + 1}</p>
              </Link>
            ))}
            <p>...</p>
            <Link href={`http://localhost:3000/?page=${counts}`} className='flex bg-gray-300 h-full w-[2rem] items-center justify-center rounded-md'>{counts}</Link>
          </div>
        </div>
      </div>
  );

}
