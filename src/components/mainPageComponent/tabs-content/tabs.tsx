'use client'



const TabsComponent = ({amountOfSeries,seriesNames}:{amountOfSeries:number,seriesNames:string})=>{
    console.log('ITS TABSCONTENT : seriesNames',seriesNames[0]);
    
    return(
        <div className='flex relative flex-wrap w-[980px] h-[2000px]'>
            <div className="flex flex-col relative border-b-[#FFD04B] border-b-[3px] bg-slate-500 rounded-t-2xl w-[100%] text-rose-50">
                <p className="flex relative m-2">Catalog</p>
                {/* <hr className="w-[100%] border-[#FFD04B] border-t-[3px]"/> */}
            </div>
            <div className='flex relative flex-wrap w-[100%] h-[100%]'>
                {Array.from({length:amountOfSeries},(_,index)=>(
                <div key={index} className={`flex bg-slate-600 ${(index + 1) % 2 === 0? ``:`mr-[20px]`} ${index} rounded-b-lg overflow-hidden relative w-[480px] h-[260px]`}>
                    <img srcSet={`http://localhost:3001/catalog/images/${seriesNames[index]} 5x` } /* src={`http://localhost:3001/catalog/images/${seriesNames[index]}`} */ className="w-[180px] h-[100%]" />
                </div>
                ))}
            </div>
        </div>
    )
}
export default TabsComponent;