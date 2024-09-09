import '@/app/page.css'
import axios from '@/components/api/axios';
import CarouselWrapper from '@/components/mainPageComponent/carouselWrapper/carouselWrapper';
import { xui2 } from '@/components/mainPageComponent/test';

export default async function Home() {
  /* const res = await xui2(); */
  return (
      <body>
        <CarouselWrapper/>
      </body>
  );

}
