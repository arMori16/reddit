'use server'
import axios from '@/components/api/axios';
import CarouselWrapper from '@/components/mainPageComponent/carouselWrapper/carouselWrapper';
import TabsComponent from '@/components/mainPageComponent/tabs-content/tabs';
import { xui2 } from '@/components/mainPageComponent/test';
import usePageCounter from '@/components/useZustand/zustandPageCounter';
import { SeriesInfo } from '@/utils/dto/adminDto/seriesInfo.dto';
import { SSeriesDto } from '@/utils/dto/main/SSeriesDto';
import getSeriesInfo, { getPageCount } from '@/utils/getSeriesInfo';

export default async function Home() {
  const seriesInfo = await getSeriesInfo(0);
  const counts = await getPageCount() || 1;
  return (
      <div className='max-w-full relative min-h-[100vh] h-auto bg-[#242424]'>
        <div className='flex relative flex-col items-center mx-2'>
          <div className='flex'>
            <CarouselWrapper/>
          </div>
          <div className='flex relative justify-center h-[400px] max-w-[60rem]'>

          </div>
          <div className='flex relative flex-wrap'>
             <TabsComponent seriesNames={seriesInfo.seriesNames} seriesViewNames={seriesInfo.seriesViewName} rate={seriesInfo.rate} genre={seriesInfo.genre}/>
          </div>
          <div>
            {Array.from({length:counts})}
          </div>
        </div>
      </div>
  );

}
