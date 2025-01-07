'use client'
import axios from '@/components/api/axios';
import '@/components/navbar-components/search-bar/search-bar.css'
import menuStorage from '@/components/useZustand/zustandMenu';
import usePageCounter from '@/components/useZustand/zustandPageCounter';
import useOutsideCommon from '@/utils/hooks/useOutsideCommon';
import InfiniteScroll from '@/utils/infiniteScroll';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const SearchBar = ()=>{
    const [isFocus,setIsFocus] = useState(false);
    const [text,setText] = useState('');
    const {getPage,page} = usePageCounter();
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
    },[isShow])
    useEffect(()=>{
        if (!text.trim()) {
            setResult([]); // Clear results if input is empty
            return;
        }
        const fetchedData = async()=>{
            try{
                setLoading(true);
                const req = await axios.get('/catalog/item/search',{
                    params:{
                        seriesName:text,
                        skip:getPage()
                    }
                });
                setResult(req.data);
            }catch(err){
                console.error(`Error!${err}`);
            }
        }
        const debouncedFunc = debounce(fetchedData,400);
        debouncedFunc();
        console.log('SERIES: ',result);
        console.log('SHOW: ',getIsShow());
        
        return () => debouncedFunc.cancel();
    },[text]);
    return(
            <div className={`flex items-center ${result.length !== 0 && getIsShow()?'rounded-t-lg':'rounded-lg'} justify-center min-w-[10rem] w-full max-w-[35rem] bg-[#D1D1D1]`}>
                <div className='flex relative w-full flex-col' ref={componentRef}>
                    <div className='flex w-full'>
                        <textarea onFocus={handleOnFocus} onBlur={handleOnBlur}  value={text} onChange={(e) => setText(e.target.value)} className='py-[0.3125rem] bg-transparent overflow-y-hidden overflow-x-scroll scrollbar-hide whitespace-nowrap flex-nowrap outline-none pr-[0.3125rem] pl-10 max-w-full w-full h-[2rem] bg-[#D1D1D1] rounded-[20px]' placeholder={`${isFocus && text === ''? '':'Search...'}`} ></textarea>
                        <div className='flex justify-end items-center relative mr-4'>
                            <svg viewBox='0 0 20 20' width={16} height={16}>
                                <path d="M19.5 18.616 14.985 14.1a8.528 8.528 0 1 0-.884.884l4.515 4.515.884-.884ZM1.301 8.553a7.253 7.253 0 1 1 7.252 7.253 7.261 7.261 0 0 1-7.252-7.253Z"></path>
                            </svg>
                        </div>
                    </div>
                    {result && getIsShow() && (
                        <div className='flex absolute top-[1.75rem] left-0 w-full max-h-[15rem] rounded-b-lg overflow-hidden overflow-y-scroll flex-col bg-[#D1D1D1]'>
                            <InfiniteScroll fetchedData={result} componentRef={componentRef} width={`100%`} height={`100%`} isFlexCol={true}>
                                {result.map((item,index)=>(
                                    <div key={index} className='flex w-full h-[3rem] px-2 bg-[#D1D1D1] items-center border-b-2 border-gray-400'>
                                        <div className='flex w-[2.25rem] h-full p-1'>
                                            <img src={`http://localhost:3001/media/${result[index].SeriesName}/images`} className='flex w-full h-full' alt="" />
                                        </div>
                                        {result[index].SeriesViewName}
                                    </div>
                                ))}
                            </InfiniteScroll>
                        </div>
                    )}
                </div>
            </div>
    )
}

export default SearchBar;