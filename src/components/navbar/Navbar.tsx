
import AuthWindow from '../auth-window/auth-window';
import "@/components/navbar/Navbar.css"
import "@/components/auth-window/auth-window.css"
import Avatar from '../navbar-components/avatar/avatar';
import NavbarLogin from './navbar-login';
import SearchBar from '../navbar-components/search-bar/search-bar';
import Link from 'next/link';


const Navbar = ({user}:{user:any}) => {
    return (
        <nav className='flex flex-col bg-[#F7F3F7] mb-[2rem]'>
            <div className='flex relative w-full max-w-full h-[14rem]'>
                <img src="http://localhost:3001/media/main3.jpeg/images" className='object-cover w-full h-full' alt="" />
            </div>
            <div className='flex relative w-full border-y-2 border-[#B3DCC5] bg-[#585454]'>
                <div className='flex ml-5 relative h-[3.50rem] items-center'>
                    <div className='flex relative justify-items-center items-center h-full'>
                        <div className='flex relative w-[2.50rem] h-[2.50rem]'>
                            <Link href="/"> <img src="/leaf2.png"/> </Link>
                        </div>
                        <div className='flex relative items-center text-[2rem] ml-3 font-medium'>
                            <Link href='/' className='text-rose-50'>AniMori</Link>
                        </div>
                    </div>
                </div>
                <div className='flex w-[80%] relative ml-auto items-center justify-center custom-lg:hidden'>
                    <SearchBar/>
                </div>
                <div className='text-align'>
                    <ul className='flex relative custom-s:hidden'>
                        <li id="nav-element"><a href='/about' className='text-rose-50'>About</a></li>
                        <li id="nav-element"><a href='/contact' className='text-rose-50'>Contact</a></li>
                    </ul>
                </div>
                <div className='flex'>
                    {user === 'registered' ? 
                    <div className='relative top-[2.2rem] mr-7'>
                        <Avatar/>
                    </div>:<NavbarLogin/>
                    }
                </div>
            </div>
        </nav>
    );
};


export default Navbar;