import '@/app/page.css'
import axios from '@/components/api/axios';
import CarouselWrapper from '@/components/mainPageComponent/carouselWrapper/carouselWrapper';

export default async function Home() {

  return (
      <body>
        <CarouselWrapper/>
      </body>
  );

}
