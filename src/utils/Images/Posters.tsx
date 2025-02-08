'use server'
import axios from '@/components/api/axios';


export default async function Poster({ src, alt ,conteainerClass }:{src:string,alt:string,conteainerClass:string}) {
    let imgSrc: string;

    try {
        // Use a HEAD request to check if the file exists.
        await axios.head(src);
        imgSrc = src;
    } catch (error) {
        // If the file doesn't exist (or there's another error), fallback to your local image.
        imgSrc = '/images/Poster.png'; // Make sure this fallback image is in your public folder.
    }
    return (
        <img
            src={imgSrc}
            alt={alt}
            className={conteainerClass}
        />
    );
}