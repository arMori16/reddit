"use client"
import "@/app/globals.css"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathName = usePathname();
  const items= [
    'Dashboard',
    'Users',
    'Series',
    'Comments'
  ]
  const isActive = (url:string) => {
    if(url === pathName){
      return true;
    }else{
      return false;
    }
  }
  /* const handleRedirectUser = (url:string)=>{
      router.push(`http://localhost:3000/admin/${url}`)
  } */
 /* className={`flex mt-2 items-center ${isActive('/admin/users')?'bg-[#6A4CFF] bg-opacity-30':''} rounded-xl pl-8 hover:bg-[#6A4CFF] duration-500 transition ease-in-out hover:bg-opacity-30 max-w-full w-full h-[4rem]`} */
  return (
    <html lang="en">
      <body className="min-w-full min-h-screen h-full bg-[#242424]">
        <div className="flex w-full min-h-[100vh] h-[100vh] bg-[#242424]">
            <div className="flex flex-col break-words fixed flex-shrink-0 h-full bg-[#3A2A8D] font-medium text-[1.25rem] text-rose-50 p-5 bg-opacity-40 w-[18rem] max-w-[18rem]">
                <div className="flex font-bold ml-5 text-[1.50rem] ">
                    Admin
                </div>
                
                <Link href={''} className={`flex mt-2 items-center ${isActive('/admin/users')?'bg-[#6A4CFF] bg-opacity-30':''} rounded-xl pl-8 hover:bg-[#6A4CFF] duration-500 transition ease-in-out hover:bg-opacity-30 max-w-full w-full h-[4rem]`}>

                </Link>
            </div>
            <div className="ml-[18rem] flex-[1] min-h-full">{children}</div>
        </div>
      </body>
    </html>
  )
}
