'use client'

import { useState } from "react";


const AdminUsers = ({initialUsers}:{initialUsers:any[]})=>{
    const [users,setUsers] = useState<any[]>(initialUsers);
    return (
        <div className="flex flex-col w-full max-w-full h-full">
            {users.map((item:any,index:number)=>(
                <div key={index} className="flex w-full h-[2.75rem] border-b-2 p-1 custom-md-2:text-[0.85rem]">
                    <div className="flex h-full ml-3 items-center flex-shrink flex-grow min-w-[6rem] overflow-hidden">
                        <img src="/Sweety.jpg" className="w-[1.75rem] rounded-sm h-full mr-2"/>
                        <p className="truncate">{item.firstName}</p>
                    </div>
                    <div className="flex h-full items-center flex-grow max-w-[10rem] mr-7 overflow-x-scroll scrollbar-hide">
                        <p>{item.email}</p>
                    </div>
                    <div className="flex items-center ml-1 h-full flex-grow flex-shrink min-w-[4.5rem] overflow-y-scroll scrollbar-hide">
                        {item.id}
                    </div>
                    <div className="flex items-center h-full flex-shrink min-w-[5rem] flex-grow custom-s-200:hidden overflow-y-scroll scrollbar-hide">
                        {item.createdAt}
                    </div>
                    <div className="flex items-center ml-[1.75rem] h-full custom-lg:hidden flex-shrink flex-grow min-w-[5rem] custom-xs:hidden">
                        {item.role}
                    </div>
                    <div className="flex items-center ml-[1.75rem] h-full custom-xl2:hidden custom-md:hidden flex-grow flex-shrink min-w-[5rem]">
                        {item._count.comments}
                    </div>
                    <div className="flex h-full items-center gap-x-1">
                        <button className="bg-green-400 p-1 rounded-md min-w-[1.75rem]">
                            <i className="fa-solid fa-ban"></i>
                        </button>
                        <button className="bg-green-400 p-1 rounded-md min-w-[1.75rem]">
                            <i className="fa-solid fa-bell-slash"></i>
                        </button>
                        <button className="bg-green-400 p-1 rounded-md min-w-[1.75rem]">
                            <i className="fa-solid fa-exclamation"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
};
export default AdminUsers;