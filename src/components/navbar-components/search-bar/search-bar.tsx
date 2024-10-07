import '@/components/navbar-components/search-bar/search-bar.css'

const SearchBar = ()=>{

    return(
            <div className="search-bar-content">
                <input className='input-bar bg-[#D1D1D1]' type="text" placeholder="Search..." />
                <span className='magnifier-bar'>
                    <svg viewBox='0 0 20 20' width={16} height={16}>
                        <path d="M19.5 18.616 14.985 14.1a8.528 8.528 0 1 0-.884.884l4.515 4.515.884-.884ZM1.301 8.553a7.253 7.253 0 1 1 7.252 7.253 7.261 7.261 0 0 1-7.252-7.253Z"></path>
                    </svg>
                </span>
            </div>
    )
}

export default SearchBar;