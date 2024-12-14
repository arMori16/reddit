import '@/components/mainPageComponent/carouselWrapper/carouselWrapper.css'
import getSeriesInfo from '@/utils/getSeriesInfo';
import Link from 'next/link';


const CarouselWrapper = async()=>{
  const seriesInfo = await getSeriesInfo();

    return(
        <div className='main-container'>
          <div className='carousel-text bg-[#3C3C3C] text-rose-50'>
              SEASON'S ANIME
          </div>
          <div className='carousel-wrapper'>
            {Array.from({length:seriesInfo.amountOfSeries},(_,index)=>(
              <Link key={index} href={`catalog/item/${seriesInfo.seriesNames[index]}`}>
                <img src={`http://localhost:3001/catalog/images/${seriesInfo.seriesNames[index]}/images`} alt="" className='poster-img'/>
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