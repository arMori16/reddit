"use client"
import { useState } from "react";




const Comments = ()=>{
    const [text,setText] = useState<String>('')
    return(
        <div className="h-auto flex flex-col relative w-full rounded-b-xl bg-[#3C3C3C] p-[10px]">
            <div className="flex relative h-[100px] w-auto">
                <input type="text" className="w-[100%] bg-[#222222] rounded-xl text-start" placeholder="text comment..." value={String(text)} onChange={(e) => setText(e.target.value)}/>
            </div>
        </div>
    )
}

export default Comments;