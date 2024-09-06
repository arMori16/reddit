
import AuthWindow from '../auth-window/auth-window';
import "@/components/navbar/Navbar.css"
import "@/components/auth-window/auth-window.css"
import Avatar from '../navbar-components/avatar/avatar';
import NavbarLogin from './navbar-login';
import { useEffect } from 'react';
import { setupTokenRefresh } from '../api/setup-token';
import SearchBar from '../navbar-components/search-bar/search-bar';


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
    return (
            <header>
                <div className='logo-text-container'>
                    <div id='logo-container'>
                        <a href="/" className='leaf'> <img src="/leaf2.png"/> </a>
                        <a href='/' id='logo'><span>Mori</span></a>
                    </div>
                </div>
                <div className='test'>
                    <SearchBar/>
                </div>
                <nav className='text-align'>
                    <ul /* id="text-align" */>
                        <li><a id="nav-element" href='/contact'>Contact</a></li>
                        {user === 'registered' ? <Avatar/>:<NavbarLogin/>}
                    </ul>
                </nav>
            </header>
    );
};


export default Navbar;