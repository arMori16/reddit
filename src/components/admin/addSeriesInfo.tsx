"use client"
import { uploadImage } from "@/utils/admin.logic";
import { useEffect, useState } from "react";



const NewSeries = ()=>{
    const [file, setFile] = useState(null);

    const handleFileChange = (e:any) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };  
    useEffect(()=>{
        console.log('It is a postFile!');
        if(file){
            const postImage = uploadImage(file) ;
        }
    },[file])
    const category = [
    'SeriesName',
    'Description',
    'SeriesViewName',
    'Rate',
    'Status',
    'Type',
    'ReleaseYear',
    'Genre',
    'Studio',
    'AmountOfEpisode',
    'VoiceActing',
    'VideoSource',
    ]
    return(
        <div className="grid grid-cols-3 grid-rows-6 justify-items-center items-end  max-w-full w-full h-[85%] p-5 bg-[#352877] rounded-md">
            {category.map((value,index)=>(
                <div key={index} className="flex flex-col">
                    <div className="flex font-normal text-[1rem] text-rose-50">
                        {value}
                    </div>
                    <div className={`flex w-[12rem] h-[3rem] border-2 rounded-md`}>

                    </div>
                </div>
            ))}
            <div className="flex flex-col w-full h-[60%] my-auto p-4 row-span-2 col-start-2 row-start-5  text-rose-50 font-medium text-[1rem]">
                <div className="flex">
                    Upload the Image!
                </div>
                <input className="flex w-full h-full rounded-lg bg-[#5b3dbe] text-[0.75rem] cursor-pointer " accept="image/*" type="file" onChange={handleFileChange} placeholder="right here!:>">
                
                </input>
            </div>
        </div>
    )
}

export default NewSeries;