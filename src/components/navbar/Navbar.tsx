
import AuthWindow from '../auth-window/auth-window';
import "@/components/navbar/Navbar.css"
import "@/components/auth-window/auth-window.css"
import Avatar from '../navbar-components/avatar/avatar';
import NavbarLogin from './navbar-login';
import { useEffect } from 'react';
import { setupTokenRefresh } from '../api/setup-token';
import SearchBar from '../navbar-components/search-bar/search-bar';
import { ClientRefresh } from '../mainPageComponent/setupTokenRefreshServer';


const Navbar = ({user}:{user:any}) => {
    return (
            <nav className='bg-[#585454]'>
                <ClientRefresh/>
                <div className='logo-text-container'>
                    <div id='logo-container'>
                        <a href="/" className='leaf'> <img src="/leaf2.png"/> </a>
                        <a href='/' className='text-rose-50' id='logo'>Mori</a>
                    </div>
                </div>
                <div className='test'>
                    <SearchBar/>
                </div>
                <div className='text-align'>
                    <ul className='ul-div'>
                        <li id="nav-element"><a href='/about' className='text-rose-50'>About</a></li>
                        <li id="nav-element"><a href='/contact' className='text-rose-50'>Contact</a></li>
                    </ul>
                </div>
                <div className='avatar-div'>
                    {user === 'registered' ? <Avatar/>:<NavbarLogin/>}
                </div>
            </nav>
    );
};


export default Navbar;