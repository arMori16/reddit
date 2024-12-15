"use client"

import Avatar from "@/components/navbar-components/avatar/avatar";
import SearchBar from "@/components/navbar-components/search-bar/search-bar";
import { usePathname, useRouter } from "next/navigation";





const AdminPage = ()=>{
    return(
        <div className="flex flex-col w-full min-h-full px-5">
            {/* {`search+logo`} */}
            <div className="flex h-[9.25rem] pt-7 w-full max-w-full">
                <div className="flex items-center w-[85%] justify-center ml-auto mr-auto flex-shrink">
                    <SearchBar/>
                </div>
                <div className="flex flex-col w-[6rem] items-center relative">
                    <Avatar/>
                    <span className="flex text-[#D98C8C] font-semibold text-[1.25rem]">Admin</span>
                </div>
            </div>
            {/* {`3labels`} */}
            <div className="flex max-w-fll w-full min-h-[30rem] h-[30rem]">
                {/* {`labels2`} */}
                <div className="flex max-w-[50%] w-[50%] h-full">
                    <div className="flex w-full max-w-full bg-[#3A2A8D] bg-opacity-70 rounded-lg">

                    </div>
                </div>
                {/* <div className="flex w-full max-w-full justify-between max-h-[20rem] h-[20rem]">
                </div> */}
                <div className="flex flex-col max-w-[48%] w-[48%] h-full text-[1.25rem] text-rose-50 font-light ml-auto">
                    <div className="flex w-full h-[9rem] items-center justify-end gap-5">
                        <button className="flex flex-col max-w-[33.33%] w-[12rem] p-3 h-[5.4rem] bg-[#3A2A8D] bg-opacity-70 rounded-lg">
                            <div className="flex">
                                Comments
                            </div>
                        </button>
                        <button className="flex flex-col max-w-[33.33%] w-[10rem] p-3 h-[5.4rem] bg-[#3A2A8D] bg-opacity-70 rounded-lg">
                            <div className="flex">
                                Series
                            </div>
                        </button>
                        <button className="flex flex-col  max-w-[33.33%] w-[11rem] p-3 h-[5.4rem] bg-[#3A2A8D] bg-opacity-70 rounded-lg">
                            <div className="flex">
                                Users
                            </div>
                        </button>
                    </div>
                    <div className="flex w-full h-full bg-[#3A2A8D] bg-opacity-70 rounded-lg">

                    </div>
                </div>
            </div>
            {/* {`label1`} */}
            <div className="flex flex-col w-full h-[20rem] mt-5 p-5  max-w-full  bg-[#3A2A8D] bg-opacity-70 rounded-lg">
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