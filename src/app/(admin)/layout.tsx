"use client"
import "@/app/globals.css"
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathName = usePathname();
  const isActive = (url:string) => {
    if(url === pathName){
      return true;
    }else{
      return false;
    }
  }
  const handleRedirectUser = (url:string)=>{
      router.push(`http://localhost:3000/admin/${url}`)
  }
  return (
    <html lang="en">
      <body className="w-full min-h-full bg-[#242424]">
        <div className="flex relative w-full min-h-[100vh] h-[100vh] bg-[#242424]">
            <div className="flex flex-col bg-[#3A2A8D] font-semibold text-[1.25rem] text-rose-50 p-5 bg-opacity-40 w-[22.5rem] max-w-full">
                <div className="flex font-bold ml-5 text-[1.50rem] ">
                    Admin
                </div>
                <button onClick={()=>{
                  handleRedirectUser('');
                  }} className={`flex mt-5 items-center ${isActive('/admin')?'bg-[#6A4CFF] bg-opacity-30':''} rounded-xl pl-8 hover:bg-[#6A4CFF] hover:bg-opacity-30 max-w-full w-full h-[4rem]`}>
                    Dashboard
                </button>
                <button onClick={()=>{
                  handleRedirectUser('users');
              }} className={`flex  items-center ${isActive('/admin/users')?'bg-[#6A4CFF] bg-opacity-30':''} rounded-xl pl-8 hover:bg-[#6A4CFF] hover:bg-opacity-30 max-w-full w-full h-[4rem]`}>
                    Users
                </button>
                <button onClick={()=>{
                  handleRedirectUser('series');
              }} className={`flex items-center ${isActive('/admin/series')?'bg-[#6A4CFF] bg-opacity-30':''} rounded-xl pl-8 hover:bg-[#6A4CFF] hover:bg-opacity-30 max-w-full w-full h-[4rem]`}>
                    Series
                </button>
                <button onClick={()=>{
                  handleRedirectUser('comments');
              }} className={`flex items-center ${isActive('/admin/comments')?'bg-[#6A4CFF] bg-opacity-30':''} rounded-xl pl-8 hover:bg-[#6A4CFF] hover:bg-opacity-30 max-w-full w-full h-[4rem]`}>
                    Comments
                </button>
            </div>
            <div>
                
            </div>
          {children}
        </div>
      </body>
    </html>
  )
}
