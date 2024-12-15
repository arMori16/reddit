import '@/components/navbar-components/search-bar/search-bar.css'

const SearchBar = ()=>{

    return(
            <div className="flex items-center justify-center min-w-[10rem] w-full max-w-[35rem] rounded-[20px] bg-[#D1D1D1]">
                <div className='flex w-full '>
                    <input className='py-[0.3125rem] outline-none pr-[0.3125rem] pl-10 max-w-full w-full h-[2.50rem] bg-[#D1D1D1] rounded-[20px]' type="text" placeholder="Search..." />
                    <div className='flex justify-end items-center relative mr-4'>
                        <svg viewBox='0 0 20 20' width={16} height={16}>
                            <path d="M19.5 18.616 14.985 14.1a8.528 8.528 0 1 0-.884.884l4.515 4.515.884-.884ZM1.301 8.553a7.253 7.253 0 1 1 7.252 7.253 7.261 7.261 0 0 1-7.252-7.253Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
    )
}

export default SearchBar;