'use client'
import Image from "next/image";
import { useState } from "react";

const ClientPoster = ({ src, alt ,containerClass }:{src:string,alt:string,containerClass:string})=>{
    const [imgSrc, setImgSrc] = useState(src);
    return (
          <img className={containerClass} src={imgSrc} alt={alt} onError={() => setImgSrc("/images/Poster.png")}/>
      );
}
export default ClientPoster;