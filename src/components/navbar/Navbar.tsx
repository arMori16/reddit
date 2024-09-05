"use client"


import React from 'react';
import { useEffect,useState,useRef } from 'react';
import AuthWindow from '../auth-window/auth-window';
import "@/components/navbar/Navbar.css"
import "@/components/auth-window/auth-window.css"
import Avatar from '../navbar-components/avatar/avatar';


const Navbar = ({user}:{user:any}) => {
    /* NProgress.start();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [loggedIn,isLoggedIn] = useState(false);
    useEffect(()=>{
        const initialize = async () => {
                const storedToken = localStorage.getItem('accessToken');
                setToken(storedToken);
                setupTokenRefresh();
                if(token){
                    setLoading(false);
                }
                console.log('Token Stored');
            
        };
        initialize();
    },[token])
    useEffect(()=>{
        
        const fetchUserData= async()=>{
            try{
                console.log('Req');
                await fetchUserId(); // Ждем выполнения запроса  // Используем результат запроса
            }
            catch(err){
                console.log(err);
                    
            }
        }
        if(token){
            fetchUserData();
        }
    },[token])
    const fetchUserId = async () => {
        try {
            console.log(token);
            const response = await axios.get('/getUserId',{
                headers: {
                    Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
                }
            });
            const userId = response.data;
            console.log(userId);
            return userId;
            
        } catch (error) {
            console.error('Error fetching userId:', error);
        }
    }
    const [progress,setProgress] = useState(0);
    const [showAuthWindow,setAuthWindow] = useState(false);
    const [user,setUser] = useState(null);

    const handleClickOutside = (event:MouseEvent)=>{
        if(ref.current && !ref.current.contains(event.target as Node)){
        setAuthWindow(false);
        console.log('xuiiiii');
    
        document.removeEventListener('mousedown',handleClickOutside);
    }
    }
    const handleClick = ()=>{ 
        setAuthWindow(true);
        document.addEventListener('mousedown',handleClickOutside);
    }
    const ref = useRef<HTMLDivElement>(null);
    /* if(loading){
        return <div className='loading-bar'></div>;
    } 
    NProgress.done(); */
    var test:boolean = true || false;
    const [showAuthWindow,setAuthWindow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event:MouseEvent)=>{
        if(ref.current && !ref.current.contains(event.target as Node)){
        test = false;
        console.log('xuiiiii');
    
        document.removeEventListener('mousedown',handleClickOutside);
    }
    }
    const handleClick = ()=>{ 
        test = true;
        document.addEventListener('mousedown',handleClickOutside);
    }
    
    return (
        <>
            <header className='navbar-container'>
                <div>
                    <div id='logo-container'>
                        <a href="/" className='leaf'> <img src="/leaf2.png"/> </a>
                        <a href='/' id='logo'><span>Mori</span></a>
                    </div>
                </div>
                <nav>
                    <ul id="text-align">
                        <li><a id="nav-element" href='/contact'>Contact</a></li>
                        {user === 'registered' ? <Avatar/>:<li><button onClick={handleClick} id="login">Log In</button></li>}
                    </ul>
                </nav>
            </header>
            {/* {test && (
            <div className='model-overlay'>
                <div className='model-content' ref={ref}>
                    {<AuthWindow />}
                </div>
            </div> 
            )}  */}
            
        </>
    );
};


export default Navbar;