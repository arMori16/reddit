'use client'



const TabsComponent = ({amountOfSeries}:{amountOfSeries:number})=>{
    return(
        <div className='flex relative flex-wrap w-[1000px] h-[600px]'>
            {Array.from({length:amountOfSeries},(_,index)=>(
              <div key={index} className='flex flex-wrap relative w-[480px] h-[260px]'>
                
              </div>
            ))}
        </div>
    )
}
export default TabsComponent;