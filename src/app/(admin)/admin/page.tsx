"use client"

import Avatar from "@/components/navbar-components/avatar/avatar";
import SearchBar from "@/components/navbar-components/search-bar/search-bar";
import { usePathname, useRouter } from "next/navigation";





const AdminPage = ()=>{
    return(
        <div className="flex flex-col relative w-full min-h-full">
            {/* {`search+logo`} */}
            <div className="flex h-[9.25rem] pt-7 w-full max-w-full">
                <div className="flex items-center w-[85%] justify-center pl-7">
                    <SearchBar/>
                </div>
                <div className="flex flex-col items-center relative">
                    <Avatar/>
                    <span className="flex text-[#D98C8C] font-semibold text-[1.25rem]">Admin</span>
                </div>
            </div>
            {/* {`3labels`} */}
            <div className="">

            </div>
            {/* {`labels2`} */}
            <div className="">

            </div>
            {/* {`label1`} */}
            <div className="">

            </div>
        </div>
    )
}

export default AdminPage;