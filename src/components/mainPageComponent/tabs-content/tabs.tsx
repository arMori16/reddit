'use server'
import '@/components/mainPageComponent/tabs-content/tabs.css'


const TabsComponent = ({amountOfSeries,seriesNames,rate,genre}:{amountOfSeries:number,seriesNames:string,rate:number[],genre:string[][]})=>{
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
                <a key={index} href={`http://localhost:3000/catalog/item/${seriesNames[index]}`} className={`flex relative h-[260px] w-[480px] ${(index + 1) % 2 === 0? ``:`mr-[20px]`}`}>
                    <div key={index} className={`flex bg-[#3C3C3C] rounded-b-lg mb-[20px] overflow-hidden relative w-[480px] h-[260px]`}>
                        <div className='flex relative'>
                            <img src={`http://localhost:3001/catalog/images/${seriesNames[index]}`} className="w-[184px] skeleton h-[100%]" />
                        </div>
                        <div className='flex flex-col  relative text-rose-50 p-[10px] pb-0 h-auto'>
                            <h1 className='uppercase text-[14px] font-semibold flex'>{seriesNames[index]}</h1>
                            <p>Genre: {genre[index].join(', ')}</p>
                            <p>Rate: {rate[index]}</p>
                        </div>
                    </div>

                </a>
                ))}
            </div>
        </div>
    )
}
export default TabsComponent;