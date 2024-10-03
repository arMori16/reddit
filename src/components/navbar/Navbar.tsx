
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
            <nav>
                <ClientRefresh/>
                <div className='logo-text-container'>
                    <div id='logo-container'>
                        <a href="/" className='leaf'> <img src="/leaf2.png"/> </a>
                        <a href='/' id='logo'><span>Mori</span></a>
                    </div>
                </div>
                <div className='test'>
                    <SearchBar/>
                </div>
                <div className='text-align'>
                    <ul className='ul-div'>
                        <li id="nav-element"><a href='/about'>About</a></li>
                        <li id="nav-element"><a href='/contact'>Contact</a></li>
                    </ul>
                </div>
                <div className='avatar-div'>
                    {user === 'registered' ? <Avatar/>:<NavbarLogin/>}
                </div>
            </nav>
    );
};


export default Navbar;