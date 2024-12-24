'use client'

import { getDataView } from "@/utils/admin.logic";
import { SeriesInfo } from "@/utils/dto/adminDto/seriesInfo.dto";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const ViewSeries = ({params}:{params:{seriesName:string}})=>{
    const [data,setData] = useState<SeriesInfo>();
    const [genreItems,setGenreItems] = useState<number>(0);
    const [voiceItem,setVoiceItems] = useState<number>(0);

    const {register,handleSubmit,reset,watch,getValues} = useForm<SeriesInfo>({
        defaultValues:{
            seriesName: data?.seriesName,
            description: data?.description,
            seriesViewName: data?.seriesViewName,
            rate: data?.rate,
            status: data?.status,
            type: data?.type,
            releaseYear: data?.releaseYear,
            genre: data?.genre,
            studio: data?.studio,
            amountOfEpisode: data?.amountOfEpisode,
            voiceActing: data?.voiceActing,
            videoSource: data?.videoSource,
        }
    })
    
    
    const handleDataSubmit = (data:SeriesInfo)=>{
        console.log(`DATA submit: `,data);
        
    }
    const handleClear = ()=>{
        reset();
        setGenreItems(0);
        setVoiceItems(0);
    }
    const deleteItem = (type: keyof SeriesInfo, index: number) => {
        // Ensure 'data' exists and that 'type' is an array
        if (data && Array.isArray(data[type])) {
            // Create a new array with the item removed
            const newArray = data[type].filter((_, i) => i !== index);
            //GetValues
            const currentData = getValues();
            // Update the 'data' state with the new array
            setData((prev) => prev ? { ...prev, [type]: newArray } : undefined);
    
            // Optionally, reset the form with the updated 'data'
            reset({ ...currentData, [type]: newArray });
            console.log('GOOD NIGHT!');
            
        }
    };
    const formValues = watch(); 
    useEffect(()=>{
        const fetchData = async()=>{

            const data = await getDataView(params.seriesName);
            setData(data);
        }
        fetchData()
    },[params.seriesName])
    if(!data){
        return (
            <div className="text-3xl flex text-rose-50 w-full h-full justify-center">Loading...</div>
        )
    }
    return(
        <div className="flex max-w-full w-full min-h-full">
            <form onSubmit={handleSubmit(handleDataSubmit)} className="flex max-w-full w-full min-h-full">
                <div className='flex flex-col relative bg-[#3C3C3C] p-5 w-[68rem] max-w-[96%] min-h-full text-rose-50 rounded-[20px] flex-wrap'>
                    <div className="flex w-full min-h-[22rem]">
                        <div className='flex relative mr-5 custom-image:mr-0 w-[15.62rem] max-h-[21.87rem] custom-image:h-auto'>
                            <img className='flex max-h-full w-full rounded-[20px]' src={`http://localhost:3001/media/images/${params.seriesName}/images`} alt={data.seriesName}/>
                        </div>
                        <div className='flex flex-col min-h-[22rem]'>
                            <textarea className='text-3xl custom-xs:mt-0 flex bg-transparent min-h-[2.5rem]' defaultValue={data.seriesViewName} {...register('seriesViewName')}></textarea>
                            <ul className='flex flex-col gap-y-1 mt-3'>
                                <li className="flex">
                                    <div className='w-[6rem]'>Status:</div>
                                    <textarea className='ml-5 bg-transparent' defaultValue={data.status} {...register('status')}></textarea></li>
                                <li className="flex">
                                    <div className='w-[6rem]'>Type:</div> 
                                    <textarea className='ml-5 bg-transparent' defaultValue={data.type} {...register('type')}></textarea></li>
                                <li className="flex">
                                    <div className='w-[6rem]'>Release:</div> 
                                    <textarea className='ml-5 bg-transparent' defaultValue={data.releaseYear} {...register('releaseYear')}></textarea></li>
                                <li className="flex">
                                    <div className='w-[6rem]'>Genre:</div> 
                                    <div className='flex gap-1 ml-5 w-[24rem] flex-wrap'>{data.genre.map((item:string,index:number)=>(
                                        <div key={index} className="flex border-2 border-gray-500 bg-transparent rounded-md px-1 pl-[6px]">
                                            <textarea defaultValue={item}  {...register(`genre.${index}`)} className={`flex bg-transparent hover:border-rose-50 rounded-md font-medium min-w-[2.5rem] text-[0.85rem] py-[2px] items-center mr-1 justify-center`}>
                                                
                                            </textarea>
                                            <div className="flex justify-center items-center">
                                                <button onClick={()=>deleteItem("genre",index)} type="button" className="flex text-[0.85rem] rounded-[50%] hover:bg-rose-50 hover:text-[#3C3C3C] h-[1rem] w-[1rem] items-center justify-center">
                                                        ×
                                                </button>
                                            </div>
                                        </div>
                                        ))}
                                        {/* {Array.from({length:genreItems},(_,index)=>(
                                            <textarea {...register(`genre.${data.genre.length + index}`)} key={data.genre.length + index} className='flex border-2 border-gray-500 bg-transparent min-w-[3.5rem] hover:border-rose-50 rounded-md font-medium text-[0.85rem] py-[2px] px-[4px] items-center justify-center'>
                                                
                                            </textarea>
                                        ))} */}
                                        <button type="button" onClick={()=>{/* setGenreItems((prev)=>prev + 1); */
                                            const currentValues = getValues();
                                            const updatedGenre:string[] = [...currentValues.genre,""];
                                            setData((prev) => (prev?{...data,genre:updatedGenre}:undefined));
                                            reset({...currentValues,genre:updatedGenre});
                                        }} className="flex h-[1.75rem] text-white rounded-md px border-gray-500 border-2  px-[6px] items-center justify-center">
                                            +
                                        </button>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className='w-[6rem]'>Studio:</div> 
                                    <textarea className='bg-transparent  ml-5' defaultValue={data.studio.join(', ')} {...register('studio')}></textarea>
                                </li>
                                <li className="flex">
                                    <div className='w-[6rem]'>Episodes:</div> 
                                    <textarea className='bg-transparent  ml-5' defaultValue={data.amountOfEpisode} {...register('amountOfEpisode')}></textarea>
                                </li>
                                <li className="flex">
                                    <div className='w-[6rem]'>Voice:</div>
                                    <div className='ml-5 flex gap-1 w-[17rem] flex-wrap'>{data.voiceActing.map((item:string,index:number)=>(
                                        <div key={index} className="flex items-center bg-[#4eb997] hover:bg-[#43a083] rounded-md px-1 pl-[6px]">
                                            <textarea defaultValue={item} {...register(`voiceActing.${index}`)} className='flex h-[1.50rem] min-w-[2.5rem] bg-transparent rounded-md font-medium text-[0.85rem] py-[2px] px-[2px] items-center justify-center'>
                                                
                                            </textarea>
                                            <div className="flex justify-center items-center">
                                                <button onClick={()=>deleteItem("voiceActing",index)} type="button" className="flex text-[0.85rem] rounded-[50%] hover:bg-rose-50 hover:text-[#3C3C3C] h-[1rem] w-[1rem] items-center justify-center">
                                                        ×
                                                </button>
                                            </div>
                                        </div>
                                        ))}
                                        {/* {Array.from({length:voiceItem},(_,index)=>(
                                            <textarea {...register(`voiceActing.${data.voiceActing.length + index}`)} key={index} className='flex h-[1.50rem] bg-[#4eb997] hover:bg-[#43a083] min-w-[3.5rem] rounded-md font-medium text-[0.85rem] py-[2px] px-[4px] items-center justify-center'>
                                                
                                            </textarea>
                                        ))} */}
                                        <button type="button" onClick={()=>{
                                            const currentValues = getValues();
                                            const updatedVoice = [...currentValues.voiceActing,""];
                                            setData((prev)=>(prev?{...prev,voiceActing:updatedVoice}:undefined));
                                            reset({...currentValues,voiceActing:updatedVoice});
                                        }} className="flex h-[1.75rem] text-white rounded-md px border-gray-500 border-2  px-[6px] items-center justify-center">
                                            +
                                        </button>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className='w-[6rem]'>Rate:</div> 
                                    <textarea className='flex bg-transparent ml-5' defaultValue={data.rate} {...register('rate')}></textarea>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='flex relative break-words w-[43.75rem] mt-9 ml-auto mr-auto'>
                        <textarea className='bg-transparent flex items-start justify-start' defaultValue={data.description} {...register('description')}></textarea>
                    </div>
                    <div className="flex w-full h-[4rem] justify-end">
                        <div className="flex w-[10rem] gap-2 h-full mr-[5rem] items-center font-semibold text-[0.85rem]">
                            <button onClick={()=>handleClear()} type="button" className="flex w-[40%] h-[1.75rem] bg-[#B32C25] rounded-md items-center justify-center">
                                clear
                            </button>
                            <button type='submit' className="flex w-[55%] h-[1.75rem] bg-[#5DC090] rounded-md items-center justify-center">
                                submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ViewSeries;