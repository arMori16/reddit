'use client'

import { getDataView } from "@/utils/admin.logic";
import { useEffect, useState } from "react";

const ViewSeries = ({params}:{params:{seriesName:string}})=>{
    const [data,setData] = useState({
        seriesName: "",
        description: "",
        seriesViewName: "",
        rate: 0,
        status: "",
        type: "",
        releaseYear: "",
        genre: [''],
        studio: [''],
        amountOfEpisode: 0,
        voiceActing: [''],
        videoSource: "",
      });
    useEffect(()=>{
        const fetchData = async()=>{

            const data = await getDataView(params.seriesName);
            setData(data);
        }
        fetchData()
    },[params.seriesName])
    return(
        <div className="flex w-full h-full min-h-full">
            <div className="flex w-full h-full">
            <div className='flex flex-col relative bg-[#3C3C3C] p-5 w-[68rem] max-w-[96%] h-full text-rose-50 rounded-[20px] flex-wrap'>
                <div className="flex w-full h-[22rem]">
                    <div className='flex relative mr-5 custom-image:mr-0 w-[15.62rem] max-h-[21.87rem] custom-image:h-auto'>
                        <img className='flex max-h-full w-full rounded-[20px]' src={`http://localhost:3001/media/images/${params.seriesName}/images`} alt={data.seriesName}/>
                    </div>
                    <div className='flex flex-col h-[20rem]'>
                        <h1 className='text-3xl custom-xs:mt-0  flex'>{data.seriesViewName}</h1>
                        <ul className='flex flex-col gap-y-1 mt-3'>
                            <li className="flex">
                                <div className='w-[6rem]'>Status:</div>
                                <input className='ml-5 bg-transparent' value={data.releaseYear}></input></li>
                            <li className="flex">
                                <div className='w-[6rem]'>Type:</div> 
                                <input className='ml-5 bg-transparent' value={data.releaseYear}></input></li>
                            <li className="flex">
                                <div className='w-[6rem]'>Release:</div> 
                                <input className='ml-5 bg-transparent' value={data.releaseYear}></input></li>
                            <li className="flex">
                                <div className='w-[6rem]'>Genre:</div> 
                                <div className='flex gap-1 ml-5 w-[17rem] flex-wrap'>{data.genre.map((item:string,index:number)=>(
                                    <input key={index} value={item} className='flex border-2 border-gray-500 bg-transparent hover:border-rose-50 rounded-md font-medium text-[0.85rem] py-[2px] px-[4px] items-center justify-center'>
                        
                                    </input>
                                    ))}
                                </div>
                            </li>
                            <li className="flex">
                                <div className='w-[6rem]'>Studio:</div> 
                                <input className='bg-transparent' value={data.studio.join(', ')}></input>
                            </li>
                            <li className="flex">
                                <div className='w-[6rem]'>Episodes:</div> 
                                <input className='bg-transparent' value={data.amountOfEpisode}></input>
                            </li>
                            <li className="flex">
                                <div className='w-[6rem]'>Voice:</div>
                                <div className='ml-5 flex gap-1 w-[17rem] flex-wrap'>{data.voiceActing.map((item:string,index:number)=>(
                                    <textarea key={index} defaultValue={item}
                                       
                                      className='flex bg-[#4eb997] hover:bg-[#43a083] h-[1.50rem] rounded-md font-medium text-[0.85rem] py-[2px] px-2 items-center justify-center'>
                                        
                                    </textarea>
                                    ))}
                                </div>
                            </li>
                            <li className="flex">
                                <div className='w-[6rem]'>Rate:</div> 
                                <input className='bg-transparent' value={data.rate}></input>
                            </li>
                        </ul>
                    </div>
                </div>

                    <div className='flex relative break-words w-[43.75rem] mt-9 ml-auto mr-auto h-auto'>
                        <textarea className='bg-transparent flex h-[15rem] w-[15rem] items-start justify-start' value={data.description}></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSeries;