'use server'
import AuthWindow from '../auth-window/auth-window';
import "@/components/navbar/Navbar.css"
import "@/components/auth-window/auth-window.css"
import Avatar from '../navbar-components/avatar/avatar';
import NavbarLogin from './navbar-login';
import SearchBar from '../navbar-components/search-bar/search-bar';
import Link from 'next/link';
import axios from '../api/axios';
import { Home } from 'lucide-react';


const Navbar = async({user,userFirstName}:{user:any,userFirstName?:string | null}) => {
    
    return (
        <nav className='flex relative flex-col items-center bg-gray-300'>
            <div className='flex fixed top-0 left-0 w-full h-[80%] bg-[url("http://localhost:3001/media/main3.jpeg/images")] bg-cover z-[-1]' style={{ backgroundPosition: "center -14rem",aspectRatio: "12/4" }}>
            </div>
            <div className='flex absolute h-[3.50rem] w-[80%] bottom-[-2rem] custom-xs:justify-between gap-x-2 shadow-[0px_3px_10px_black] z-20 rounded-lg bg-gray-300'>
                <div className='flex ml-5 relative h-full items-center'>
                    <div className='flex relative justify-items-center items-center h-full'>
                        <div className='flex relative w-[2.50rem] h-[2.50rem]'>
                            <Link href="/"> <img src={`/icons/leafsvg.svg`}/> </Link>
                        </div>
                        <div className='flex relative items-center text-[1.75rem] font-inknut ml-3 font-bold'>
                            <Link href='/' className='text-rose-50'>AniMori</Link>
                        </div>
                    </div>
                </div>
                <div className='flex w-[80%] relative ml-auto items-center justify-center custom-md-lg:hidden'>
                    <SearchBar isAdmin={false} model='catalog'/>
                </div>
                <div className='flex h-full mr-[2rem] gap-x-4 custom-s-200:hidden'>
                    <div className='flex h-full mx-2 gap-x-4 items-center text-[1rem] font-medium text-white uppercase'>
                        <Link href={`/`} className='flex items-center hover:text-green-400 duration-300 ease-in-out'><i className="fa fa-home text-[0.85rem] mr-1" aria-hidden="true"></i>Home</Link>
                    </div>
                    <div className='flex h-full mx-2 gap-x-4 items-center text-[1rem] font-medium text-white uppercase custom-md:hidden'>
                        <Link href={`/catalog`} className='flex items-center hover:text-green-400 duration-300 ease-in-out'><i className="fa-solid fa-newspaper pt-[2px] text-[0.85rem] mr-1" aria-hidden="true"></i>Catalog</Link>
                    </div>
                </div>
                <div className='flex items-center'>
                    {user === 'registered' ? 
                    <div className='relative mr-7'>
                        <Avatar user={userFirstName}/>
                    </div>:<NavbarLogin/>
                    }
                </div>
            </div>
        </nav>
    );
};


export default Navbar;