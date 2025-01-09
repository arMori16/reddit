

import { getUserRate, getSeriesRate, getItemsRate, getUserRates } from '@/components/catalog/item/item.logic';
import Rating from '@/components/catalog/item/rating';
import '@/components/mainPageComponent/tabs-content/tabs.css'
import { getPageCount } from '@/utils/getSeriesInfo';
import { cookies } from 'next/headers';
import Link from 'next/link';


const TabsComponent = async({seriesNames,seriesViewNames,rate,genre}:{seriesNames:string[],seriesViewNames:string,rate:number[],genre:string[][]})=>{
    const atToken = cookies().get('accessToken')?.value;
    console.log('Serienames:: ',seriesNames);
    const itemsRate = await getItemsRate(seriesNames);
    const userRates = await getUserRates(atToken);
    return(
        <div className='flex relative flex-wrap max-w-[61.25rem] h-auto'>
            <div className="flex flex-col relative border-b-[#FFD04B] text-[1.25rem] font-medium border-b-[3px] bg-[#3C3C3C] rounded-t-lg min-w-[3rem] w-full text-rose-50 p-2 pl-4">
                What's new on the site
            </div>
            <div className='flex relative flex-wrap w-[100%] gap-x-5'>
                {seriesNames.map((seriesName,index)=>{
                const itemRate = itemsRate?.find((item:any) => item.SeriesName === seriesName);
                const userRate = userRates?.find((item:any) => item.SeriesName === seriesName);
                return(
                    <div key={index} className={`flex mb-3 relative custom-s:h-[13.75rem] flex-grow h-[16.25rem] w-[30rem] custom-xl2:w-[100%]`}>
                        <div className={`flex bg-[#3C3C3C] ${index >= 2 ? 'rounded-md':'rounded-b-md'} overflow-hidden relative max-w-full w-full h-full`}>
                            <div className='flex relative w-[11.5rem] custom-s:w-[9.4rem] max-w-[11.5rem] shrink-0'>
                                <img src={`http://localhost:3001/media/${seriesNames[index]}/images`} className="w-full skeleton h-[100%]" />
                            </div>
                            <div className='block overflow-auto max-w-full w-[18.5rem] custom-xl2:w-[100%] relative text-rose-50 p-[10px] pb-0 h-full'>
                                <Link href={`http://localhost:3000/catalog/item/${seriesNames[index]}`} className='inline-block duration-500 transition-colors ease-in-out hover:text-green-400 uppercase absolute ml-[10px] left-0 right-0 text-[14px] max-w-full font-semibold truncated-text'>{seriesViewNames[index]}</Link>
                                <p className='flex flex-wrap relative mt-5'>Genre: {genre[index]?.join(', ')}</p>
                                <Rating seriesName={seriesNames[index]} initialRate={itemsRate ? itemRate?.Rate : 0} initialUserRate={userRate ? userRate.Value : null}/>
                            </div>
                        </div>

                    </div>
                )
                })}
            </div>
        </div>
    )
}
export default TabsComponent;