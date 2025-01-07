'use client'

import '@/components/mainPageComponent/tabs-content/tabs.css'
import { getPageCount } from '@/utils/getSeriesInfo';
import Link from 'next/link';


const TabsComponent = ({seriesNames,seriesViewNames,rate,genre}:{seriesNames:string,seriesViewNames:string,rate:number[],genre:string[][]})=>{
    console.log('ITS TABSCONTENT : seriesNames',seriesNames[0]);
    console.log('ITS ARRAY OF NUMBRES: ',rate);
    return(
        <div className='flex relative flex-wrap max-w-[61.25rem] h-auto'>
            <div className="flex flex-col relative border-b-[#FFD04B] text-[1.25rem] font-medium border-b-[3px] bg-[#3C3C3C] rounded-t-lg min-w-[3rem] w-full text-rose-50 p-2 pl-4">
                What's new on the site
            </div>
            <div className='flex relative flex-wrap w-[100%] gap-x-5'>
                {Array.from({length:seriesNames.length},(_,index)=>(
                <Link key={index} href={`http://localhost:3000/catalog/item/${seriesNames[index]}`} className={`flex mb-3 relative custom-s:h-[13.75rem] flex-grow h-[16.25rem] w-[30rem] custom-xl2:w-[100%]`}>
                    <div className={`flex bg-[#3C3C3C] ${index >= 2 ? 'rounded-md':'rounded-b-md'} overflow-hidden relative max-w-full w-full h-full`}>
                        <div className='flex relative w-[11.5rem] custom-s:w-[9.4rem] max-w-[11.5rem] shrink-0'>
                            <img src={`http://localhost:3001/media/${seriesNames[index]}/images`} className="w-full skeleton h-[100%]" />
                        </div>
                        <div className='block overflow-auto max-w-full w-[18.5rem] custom-xl2:w-[100%] relative text-rose-50 p-[10px] pb-0 h-full'>
                            <h1 className='inline-block uppercase absolute ml-[10px] left-0 right-0 text-[14px] max-w-full font-semibold truncated-text'>{seriesViewNames[index]}</h1>
                            <p className='flex flex-wrap relative mt-5'>Genre: {genre[index]?.join(', ')}</p>
                            <p>Rate: {rate[index]}</p>
                        </div>
                    </div>

                </Link>
                ))}
            </div>
        </div>
    )
}
export default TabsComponent;