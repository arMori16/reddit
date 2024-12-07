import '@/app/page.css'
import axios from '@/components/api/axios';
import CarouselWrapper from '@/components/mainPageComponent/carouselWrapper/carouselWrapper';
import TabsComponent from '@/components/mainPageComponent/tabs-content/tabs';
import { xui2 } from '@/components/mainPageComponent/test';

export default async function Home() {
  const res = await xui2();
  /* const seriesName = await axios.get('/catalog/item',{
    params:{
      seriesName:
    }
  }) */
  /* const deleteDB = await axios.post('/catalog/delete'); */
  /* const getFirstPageCatalog = await axios.get('/catalog/getCatalog');
  console.log('ITS getFirstPageCatalog: ',getFirstPageCatalog.data[0].SeriesName);
  console.log('MESSAGE!!!!!');
  const seriesNames = getFirstPageCatalog.data.map((item:{SeriesName:string}) => item.SeriesName);
  const rate = getFirstPageCatalog.data.map((item:{Rate:number[]}) => item.Rate);
  const genre = getFirstPageCatalog.data.map((item:{Genre:string[][]}) => item.Genre);
  console.log('IT IS SERIESNAMES: ',seriesNames);
  
  const reqAmountOfSeries = await axios.get('/catalog/getAmountOfSeries');
  const amountOfSeries = reqAmountOfSeries.data; */
  return (
      <div className='w-full h-[100vw] bg-[#242424]'>
        <div className='flex relative flex-col items-center'>
          <div className='flex'>
            <CarouselWrapper/>
          </div>
          <div className='flex relative justify-center h-[400px] w-[1000px]'>

          </div>
          <div className='flex relative flex-wrap'>
{/*             <TabsComponent amountOfSeries={amountOfSeries} seriesNames={seriesNames} rate={rate} genre={genre}/>
 */}          </div>
        </div>
      </div>
  );

}
