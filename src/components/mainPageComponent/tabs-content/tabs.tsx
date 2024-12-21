'use server'
import '@/components/mainPageComponent/tabs-content/tabs.css'
import Link from 'next/link';


const TabsComponent = ({amountOfSeries,seriesNames,seriesViewNames,rate,genre}:{amountOfSeries:number,seriesNames:string,seriesViewNames:string,rate:number[],genre:string[][]})=>{
    console.log('ITS TABSCONTENT : seriesNames',seriesNames[0]);
    console.log('ITS ARRAY OF NUMBRES: ',rate);
    
    return(
        <div className='flex relative flex-wrap w-[980px] h-auto'>
            <div className="flex flex-col relative border-b-[#FFD04B] border-b-[3px] bg-[#3C3C3C] rounded-t-2xl w-[100%] text-rose-50">
                <p className="flex relative m-2 ">Catalog</p>
                {/* <hr className="w-[100%] border-[#FFD04B] border-t-[3px]"/> */}
            </div>
            <div className='flex relative flex-wrap w-[100%] h-[100%]'>
                {Array.from({length:amountOfSeries},(_,index)=>(
                <Link key={index} href={`http://localhost:3000/catalog/item/${seriesNames[index]}`} className={`flex mb-3 relative h-[16.25rem] w-[30rem] ${(index + 1) % 2 === 0? ``:`mr-5`}`}>
                    <div className={`flex bg-[#3C3C3C] ${index >= 2 ? 'rounded-md':'rounded-b-md'} overflow-hidden relative max-w-full w-full h-full`}>
                        <div className='flex relative w-[11.5rem] max-w-[11.5rem]'>
                            <img src={`http://localhost:3001/media/images/${seriesNames[index]}/images`} className="w-[11.5rem] skeleton h-[100%]" />
                        </div>
                        <div className='flex flex-col w-[18.5rem] relative text-rose-50 p-[10px] pb-0 h-full'>
                            <h1 className='uppercase text-[14px] font-semibold flex'>{seriesViewNames[index]}</h1>
                            <p>Genre: {genre[index]?.join(', ')}</p>
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