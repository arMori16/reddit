import { getSeries } from "@/utils/admin.logic";
import Link from "next/link";


const Series = async()=>{
    const seriesInfo = await getSeries();
    return(
        <div className="flex max-w-full flex-col w-full h-full">
            <div className="flex max-w-full w-full h-[35rem] p-5 bg-[#352877] rounded-md">
                <div className="flex flex-col w-full max-w-full bg-[#352877] p-5 rounded-lg overflow-y-scroll">
                    {Array.from({length:seriesInfo.length},(_,index)=>(
                    <div key={index} className="flex max-w-full w-full h-[3.5rem] items-center border-b-2 overflow-scroll border-rose-50 text-[1rem] text-rose-50 font-medium">
                        <div className="flex p-1 rounded-md w-auto h-[85%]">
                             <img src={`http://localhost:3001/media/images/${seriesInfo[index].SeriesName}/images`} className="rounded-sm" alt="" />
                        </div>
                        <div className="flex ml-1">
                            {seriesInfo[index].SeriesViewName}
                        </div>
                        <div className="flex h-full w-[8rem] gap-2 items-center ml-auto mr-4 text-[0.85rem]">
                            <div className="flex w-[50%] h-[1.50rem]">
                                <Link href={''} className="flex bg-[#5DC090] justify-center items-center w-full rounded-sm">view</Link>
                            </div>
                            <div className="flex w-[50%] h-[1.50rem]">
                                <Link href={''} className="flex bg-[#B32C25] justify-center items-center w-full rounded-sm">delete</Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className="flex max-w-full w-full h-[3.50rem] justify-end items-center mt-5">
                <Link href={'series/add-new-series'} className="flex h-full w-[3.50rem] overflow-hidden rounded-[50%] mr-5 bg-white">
                    <img src={`http://localhost:3001/media/images/plus/icons`} className="flex h-full w-full" alt="" />
                </Link>
            </div>
        </div>
    )
}
export default Series;