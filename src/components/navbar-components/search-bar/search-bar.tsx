'use client'
import axios from '@/components/api/axios';
import '@/components/navbar-components/search-bar/search-bar.css'
import menuStorage from '@/components/useZustand/zustandMenu';
import usePageCounter from '@/components/useZustand/zustandPageCounter';
import useOutsideCommon from '@/utils/hooks/useOutsideCommon';
import InfiniteScroll from '@/utils/infiniteScroll';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SearchBar = ({isAdmin,model}:{isAdmin?:boolean,model?:string})=>{
    const [isFocus,setIsFocus] = useState(false);
    const [text,setText] = useState('');
    const {getSearchPage,searchPage} = usePageCounter();
    const {componentRef} = useOutsideCommon();
    const {getIsShow,updateIsShow,isShow} = menuStorage();
    const [result,setResult] = useState<any[]>([]);
    const [loading,setLoading] = useState(false);
    const handleOnFocus = ()=>{
        setIsFocus(true);
        updateIsShow(true);
    }
    const handleOnBlur = ()=>{
        if(text === ''){
            setIsFocus(false);
        }
    }
    useEffect(()=>{
        if(!getIsShow()){
            setResult([]);
        }
    },[isFocus])
    useEffect(()=>{
        if (!text.trim()) {
            setResult([]); // Clear results if input is empty
            return;
        }
        const fetchedData = async()=>{
            try{
                setLoading(true);
                if(isAdmin && model){
                    const req = await axios.get(`/${model}/search`,{
                        params:{
                            param:text,
                            skip:getSearchPage()
                        }
                    });
                    setResult(req.data);
                }else{
                    const req = await axios.get(`/catalog/search`,{
                        params:{
                            param:text,
                            skip:getSearchPage()
                        }
                    });
                    setResult(req.data);

                }
            }catch(err){
                console.error(`Error!${err}`);
            }
        }
        const debouncedFunc = debounce(fetchedData,400);
        debouncedFunc();
        console.log('SERIES: ',result);
        console.log('SHOW: ',getIsShow());
        
        return () => {
            debouncedFunc.cancel()
            
        };
    },[text]);
    return(
            <div className={`flex items-center ${result.length !== 0 && getIsShow()?'rounded-t-lg':'rounded-lg'} justify-center text-white min-w-[10rem] w-full max-w-[35rem] bg-gray-400`}>
                <div className='flex relative w-full flex-col'>
                    <div className='flex w-full'>
                        <textarea onFocus={handleOnFocus} onBlur={handleOnBlur} onClick={()=>updateIsShow(true)} value={text} onChange={(e) => {setText(e.target.value)}} className='pt-1 pb-[6px] bg-transparent overflow-y-hidden overflow-x-scroll scrollbar-hide whitespace-nowrap flex-nowrap outline-none pr-[0.3125rem] pl-10 max-w-full w-full h-[2rem] bg-[#D1D1D1] rounded-[20px]' placeholder={`${isFocus && text === ''? '':'Search...'}`} ></textarea>
                        <div className='flex justify-end items-center relative mr-4'>
                            <svg viewBox='0 0 20 20' width={16} height={16} fill='white'>
                                <path d="M19.5 18.616 14.985 14.1a8.528 8.528 0 1 0-.884.884l4.515 4.515.884-.884ZM1.301 8.553a7.253 7.253 0 1 1 7.252 7.253 7.261 7.261 0 0 1-7.252-7.253Z"></path>
                            </svg>
                        </div>
                    </div>
                    {result && getIsShow() && (
                        <div className='flex absolute top-[1.75rem] left-0 w-full max-h-[15rem] rounded-b-lg overflow-hidden overflow-y-scroll flex-col bg-gray-400' ref={componentRef}>
                            <InfiniteScroll type='search' fetchedData={result} componentRef={componentRef} width={`100%`} height={`100%`} isFlexCol={true}>
                                {result.map((item,index)=>(
                                    <Link onClick={()=>updateIsShow(false)} href={isAdmin  && model === 'catalog'? `${process.env.NEXT_PUBLIC_FRONT_API}/admin/series/view/${item.SeriesName}` :
                                        model === 'catalog'?`${process.env.NEXT_PUBLIC_FRONT_API}/catalog/item/${item.SeriesName}`:
                                        model === 'user' && isAdmin ? `${process.env.NEXT_PUBLIC_FRONT_API}/admin/users/view`: ``} key={index} className='flex cursor-pointer w-full h-[3rem] font-medium bg-gray-400 items-center border-b-[1px] border-gray-700'>
                                        <div className='flex w-full h-full ml-1 hover:shadow-[-5px_0_0] duration-700 transition-shadow ease-in-out hover:shadow-green-400'>
                                            <div className='flex w-auto h-full py-1 mr-1'>
                                                {<img src={model === 'catalog' ? `${process.env.NEXT_PUBLIC_API}/media/${result[index].SeriesName}/images` : 
                                                model === 'user' ? `/Sweety.jpg`:``} 
                                                className={`flex ${model === 'user'?'w-[2.25rem]':'w-[1.8rem]'} rounded-sm h-full`} alt="" />}
                                            </div>
                                            <div className='flex items-center'>
                                                {model === 'catalog' ? result[index].SeriesViewName: model === 'user' && item.firstName}
                                            </div>

                                        </div>
                                    </Link>
                                ))}
                            </InfiniteScroll>
                        </div>
                    )}
                </div>
            </div>
    )
}

export default SearchBar;