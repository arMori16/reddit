"use server"
import { getALlCounts, getSeries } from "@/utils/admin.logic";






const AdminPage = async()=>{
    const counts = await getALlCounts();
    const seriesInfo = await getSeries();
    return(
        <div className="flex flex-col w-full min-h-full px-5">
            {/* {`search+logo`} */}
            {/* <div className="flex h-[9.25rem] pt-7 w-full max-w-full">
                <div className="flex items-center w-[85%] justify-center ml-auto mr-auto flex-shrink">
                    <SearchBar/>
                </div>
                <div className="flex flex-col w-[6rem] items-center relative">
                    <Avatar/>
                    <span className="flex text-[#D98C8C] font-semibold text-[1.25rem]">Admin</span>
                </div>
            </div> */}
            <div className="flex font-medium text-[1.5rem] h-[3rem] ml-4 text-rose-50">
                Analytics
            </div>
            {/* {`3labels`} */}
            <div className="flex max-w-fll w-full min-h-[30rem] h-[30rem]">
                {/* SeriesInfo */}
                <div className="flex max-w-[50%] w-[50%] h-full">
                    <div className="flex flex-col w-full max-w-full bg-[#352877] p-5 rounded-lg">
                        {Array.from({length:seriesInfo.length},(_,index)=>(
                            <div key={index} className="flex max-w-full w-full h-[3.5rem] items-center border-b-2 overflow-scroll border-rose-50 text-[1rem] text-rose-50 font-medium">
                                <div className="flex p-1 rounded-md w-auto h-[85%]">
                                    <img src={`http://localhost:3001/media/images/${seriesInfo[index].SeriesName}/images`} className="rounded-sm" alt="" />
                                </div>
                                <div className="flex ml-1">
                                    {seriesInfo[index].SeriesViewName}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* SeriesInfo */}
                <div className="flex flex-col max-w-[48%] w-[48%] h-full text-[1.25rem] text-rose-50 font-light ml-auto">
                    <div className="flex w-full h-[9rem] items-center justify-end gap-5">
                        <button className="flex flex-col max-w-[33.33%] w-[12rem] p-3 h-[5.4rem] bg-[#352877] rounded-lg">
                            <div className="flex">
                                Comments
                            </div>
                            <div className="flex w-full justify-center max-w-full text-[1rem] text-rose-50 font-medium">
                                {counts.comments}
                            </div>
                        </button>
                        <button className="flex flex-col max-w-[33.33%] w-[10rem] p-3 h-[5.4rem] bg-[#352877] rounded-lg">
                            <div className="flex">
                                Series
                            </div>
                            <div className="flex w-full justify-center max-w-full text-[1rem] text-rose-50 font-medium">
                                {counts.series}
                            </div>
                        </button>
                        <button className="flex flex-col  max-w-[33.33%] w-[11rem] p-3 h-[5.4rem] bg-[#352877] rounded-lg">
                            <div className="flex">
                                Users
                            </div>
                            <div className="flex text-[1rem] w-full justify-center max-w-full text-rose-50 font-medium">
                                {counts.users}
                            </div>
                        </button>
                    </div>
                    <div className="flex w-full h-full bg-[#352877] rounded-lg">

                    </div>
                </div>
            </div>
            {/* {`label1`} */}
            <div className="flex flex-col w-full h-[20rem] mt-5 p-5  max-w-full  bg-[#352877] rounded-lg">
                <div className="flex max-w-full w-full h-[3rem] border-b-2 text-[1.25rem] text-rose-50 font-normal items-end">
                    <div className="flex">
                        User
                    </div>
                    <div className="flex ml-auto max-w-[14rem] mr-4 w-[14rem] justify-between">
                        <div className="flex">
                            Id
                        </div>
                        <div className="flex">
                            Comments
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;