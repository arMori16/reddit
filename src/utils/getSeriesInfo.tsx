import axios from "@/components/api/axios";
import { SeriesInfo } from "./dto/adminDto/seriesInfo.dto";

const getSeriesInfo = async(page:number,take?:number,category?:string,skipPage = 16)=>{
    
   try{
    const req = await axios.get('/catalog/getCatalog',{
        params:{
            take:take || null,
            skip:page*skipPage,
            category:category || null
        }
    });
    console.log(`Catalog for the page ${page} is taken!`,req.data);
    
    return req.data 
}catch(err){
    console.error(`Cannot take the catalog for the page!Error: ${err}`);
}
}
export const getPageCount = async({category,divideNumber = 24}:{category?:string,divideNumber?:number}={})=>{
    try{
        const reqAmountOfSeries = await axios.get('/catalog/getAmountOfSeries',{
            params:{
                category:category || null
            }
        });
        const amountOfPages = Math.ceil(reqAmountOfSeries.data / divideNumber);
        return amountOfPages;
    }catch(err){
        console.error(`Cannot count amount of series for the page! ${err}`);
        return 1;
    }
}

export const getSeasonedCatalog = async()=>{
    const getCarouselItems = await axios.get('/catalog/carousel/items');
    return getCarouselItems;
}
export default getSeriesInfo;