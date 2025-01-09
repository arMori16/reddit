
import '@/app/(main)/catalog/item/[seriesName]/page.css'
import axios from '@/components/api/axios';
import { getSeriesData, getSeriesRate, getUserRate } from '@/components/catalog/item/item.logic';
import Rating from '@/components/catalog/item/rating';
import Comments from '@/components/comments/comments';
import MediaPlayerSection from '@/components/player/MediaPlayerSection/MediaPlayerSection';
import { cookies } from 'next/headers';

const ItemPage = async({params}:{params:{seriesName:string}})=>{
    const seriesData = await getSeriesData(params.seriesName);
    const atToken = cookies().get('accessToken')?.value;
    const userRate = atToken ? await getUserRate(params.seriesName,atToken) : undefined;
    if(!seriesData){
        return(
            <div>
                SERIES DATA UNDEFINED!
            </div>
        )
    }
    return(
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#242424]">
            <div className='w-[68rem] max-w-full flex flex-col items-center  h-full shadow-[0px_0px_12px_black]'>
                <div className='flex relative p-5 w-[68rem] max-w-[96%] mt-[3rem] h-auto bg-gray-300 text-rose-50 rounded-lg flex-wrap'>
                    <div className='flex relative mr-5 custom-image:mr-0 w-[15.62rem] max-h-[21.87rem] custom-image:h-auto'>
                        <img className='flex max-h-full w-full rounded-lg' src={`http://localhost:3001/media/${params.seriesName}/images`} alt={seriesData.data.SeriesName}/>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-3xl custom-xs:mt-0 break-words flex flex-wrap'>{seriesData?.data.SeriesViewName}</h1>
                        <div className='flex my-1'>
                            {seriesData.data.AlternitiveNames?.map((item:string,index:number)=>(
                                <div key={index} className='flex rounded-lg h-[1.75rem] font-light py-[2px] px-2 bg-gray-100 items-center justify-center'>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <Rating seriesName={params.seriesName} initialRate={seriesData?.seriesRate ? seriesData.seriesRate : 0} initialUserRate={userRate}/>
                        <ul className='flex flex-col mt-3'>
                            <li>
                                <div className='w-[6rem]'>Status:</div>
                                <div className='ml-5'>{seriesData.data.Status}</div></li>
                            <li>
                                <div className='w-[6rem]'>Type:</div> 
                                <div className='ml-5'>{seriesData.data.Type}</div></li>
                            <li>
                                <div className='w-[6rem]'>Release:</div> 
                                <div className='ml-5'>{seriesData.data.ReleaseYear}</div></li>
                            <li>
                                <div className='w-[6rem]'>Genre:</div> 
                                <div className='flex gap-1 ml-5 flex-wrap'>{seriesData.data.Genre.map((item:string,index:number)=>(
                                    <div key={index} className='flex border-2 border-gray-500 hover:border-rose-50 rounded-md break-words font-medium text-[0.85rem] py-[2px] px-[4px] items-center justify-center'>
                                        {item}
                                    </div>
                                    ))}
                                </div>
                            </li>
                            <li>
                                <div className='w-[6rem]'>Studio:</div> 
                                <div className='ml-5'>{seriesData.data.Studio.join(', ')}</div>
                            </li>
                            <li>
                                <div className='w-[6rem]'>Episodes:</div> 
                                <div className='ml-5'>{seriesData.data.AmountOfEpisode}</div>
                            </li>
                            <li>
                                <div className='w-[6rem]'>Voice:</div>
                                <div className='ml-5 flex gap-1 flex-wrap'>{seriesData.data.VoiceActing.map((item:string,index:number)=>(
                                    <div key={index} className='flex bg-[#4eb997] hover:bg-[#43a083] rounded-md font-medium text-[0.85rem] py-[2px] px-[4px] items-center justify-center'>
                                        {item}
                                    </div>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='flex relative break-words w-[43.75rem] ml-auto mr-auto h-auto mt-7'>
                        <p className='flex items-center'>{seriesData.data.Description}</p>
                    </div>
                </div>
                    <MediaPlayerSection AmountOfEpisode={seriesData.data.AmountOfEpisode} seriesName={params.seriesName}/>
                <div className='bg-[#242424] h-[100px]'>

                </div>
                <div className='w-[68rem] max-w-[96%]'>
                    <div className="relative flex bg-[#3C3C3C] overflow-hidden w-[100%] h-[40px] rounded-t-lg text-rose-50">
                        <div className='bg-[#222222] flex relative w-[100px] p-2 rounded-br-lg h-full'>Comments</div>
                    </div>
                    <Comments seriesName={params.seriesName}/>
                </div>
            </div>
        </div>
    )
}

export default ItemPage;