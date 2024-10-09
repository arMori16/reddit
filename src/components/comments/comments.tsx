"use client"
import { useState } from "react";




const Comments = ()=>{
    const [text,setText] = useState<String>('');
    const [isOnFocus,setIsOnFocus] = useState(false);
    const handleOnFocus = ()=>{
        setIsOnFocus(true); 
    }
    const handleOnBlur = ()=>{
        if (text === '') {
            setIsOnFocus(false);
        }
    }

    return(
        <div className="h-auto flex flex-col relative w-full rounded-b-xl bg-[#3C3C3C] p-[10px]">
            <div className="flex relative h-[100px] w-auto">
                <textarea onFocus={handleOnFocus} onBlur={handleOnBlur} className="w-[100%] bg-[#222222] p-2 caret-white text-rose-50 h-full resize-none rounded-lg outline-none placeholder:m-2 text-start" placeholder={isOnFocus && text === ''? "":"text comment..."} value={String(text)} onChange={(e) => setText(e.target.value)}/>

            </div>
            <div className="flex relative  h-[35px] mt-2 justify-end">
                <button className="bg-[#71C997] w-[100px] h-auto rounded-lg justify-center items-center flex relative text-[#E8E8E8]">Send</button>
            </div>
        </div>
    )
}

export default Comments;