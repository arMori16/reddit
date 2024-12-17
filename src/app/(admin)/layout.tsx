"use client"
import "@/app/globals.css"
import Avatar from "@/components/navbar-components/avatar/avatar";
import SearchBar from "@/components/navbar-components/search-bar/search-bar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({children}:{children: React.ReactNode}){
  const pathName = usePathname();
  const items= [
    'Dashboard',
    'Users',
    'Series',
    'Comments'
  ]
  const isActive = (url:string) => url === pathName;
  return (
    <html lang="en">
      <body className="min-w-full min-h-screen h-full bg-[#242424]">
        <div className="flex w-full min-h-[100vh] h-[100vh] bg-[#242424]">
            <div className="flex flex-col break-words fixed flex-shrink-0 h-full bg-[#2C2C2C] font-medium text-[1.25rem] text-rose-50 p-5 bg-opacity-50 w-[18rem] max-w-[18rem]">
                <div className="flex font-bold ml-5 mb-3 text-[1.50rem] ">
                    Admin
                </div>
                {Array.from({length:items.length},(_,index)=>(
                    <Link key={index} href={`${items[index] === 'Dashboard'? `http://localhost:3000/admin`:`http://localhost:3000/admin/${items[index].toLowerCase()}`}`} className={`flex mt-2 items-center ${isActive(items[index] === 'Dashboard' ? '/admin' : `/admin/${items[index].toLowerCase()}`) 
                      ? 'bg-[#373737]' 
                      : ''}
                   rounded-xl pl-8 hover:bg-[#373737] duration-500 transition ease-in-out max-w-full w-full h-[4rem]`}>
                      {items[index]}
                    </Link>
                ))}
            </div>
            <div className="flex flex-col h-full pt-7 flex-[1] ml-[18rem] max-w-full">
              <div className="flex max-w-full mb-5 w-full h-[10rem]">
                <div className="flex items-end w-[85%] justify-center ml-auto mr-auto flex-shrink">
                    <SearchBar/>
                </div>
                <div className="flex flex-col w-[6rem] items-center relative">
                    <Avatar/>
                    <span className="flex text-[#D98C8C] font-semibold text-[1.25rem]">Admin</span>
                </div>
              </div>
              <div className="flex min-h-full p-5">{children}</div>
            </div>
        </div>
      </body>
    </html>
  )
}
