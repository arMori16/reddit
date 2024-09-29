import '@/app/page.css'
import axios from '@/components/api/axios';
import CarouselWrapper from '@/components/mainPageComponent/carouselWrapper/carouselWrapper';
import TabsComponent from '@/components/mainPageComponent/tabs-content/tabs';
import { xui2 } from '@/components/mainPageComponent/test';

export default async function Home() {
  /* const res = await xui2(); */
  /* const seriesName = await axios.get('/catalog/item',{
    params:{
      seriesName:
    }
  }) */
  const reqAmountOfSeries = await axios.get('/catalog/getAmountOfSeries');
  const amountOfSeries = reqAmountOfSeries.data;
  return (
      <body className='w-full'>
        <div className='flex relative flex-col items-center'>
          <div className='flex'>
            <CarouselWrapper/>
          </div>
          <div className='flex relative justify-center h-[400px] w-[1000px]'>

          </div>
          <div className='flex relative flex-wrap'>
            <TabsComponent amountOfSeries={amountOfSeries}/>
          </div>
        </div>
      </body>
  );

}
