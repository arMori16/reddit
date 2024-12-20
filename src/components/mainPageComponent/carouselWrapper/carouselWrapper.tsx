import '@/components/mainPageComponent/carouselWrapper/carouselWrapper.css'
import getSeriesInfo, { getSeasonedCatalog } from '@/utils/getSeriesInfo';
import Link from 'next/link';


const CarouselWrapper = async()=>{
  const seriesInfo = await getSeasonedCatalog();

    return(
        <div className='main-container'>
          <div className='carousel-text bg-[#3C3C3C] text-rose-50'>
              SEASON'S ANIME
          </div>
          <div className='carousel-wrapper'>
            {Array.from({length:7},(_,index)=>(
              <Link key={index} href={`catalog/item/${seriesInfo.seriesName[index]}`}>
                <img src={`http://localhost:3001/media/images/${seriesInfo.seriesName[index]}/images`} alt="" className='poster-img'/>
                  <span className='poster-span'>
                    {seriesInfo.seriesViewName[index]}
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