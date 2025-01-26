import axios from "@/components/api/axios";
import { SeriesInfo } from "./dto/adminDto/seriesInfo.dto";

const getSeriesInfo = async(page:number)=>{
    
   try{
    const req = await axios.get('/catalog/getCatalog',{
        params:{
            skip:page*16
        }
    })
    const seriesNames = req.data.map((item:{SeriesName:string}) => item.SeriesName);
    const seriesViewNames = req.data.map((item:{SeriesViewName:string}) => item.SeriesViewName);
    const rate = req.data.map((item:{Rate:number[]}) => item.Rate);
    const genre = req.data.map((item:{Genre:string[][]}) => item.Genre);
    const reqAmountOfSeries = await axios.get('/catalog/getAmountOfSeries');
    const amountOfSeries = reqAmountOfSeries.data;
    
    return {
        amountOfSeries:amountOfSeries,
        seriesNames:seriesNames,
        seriesViewName:seriesViewNames,
        rate:rate,
        genre:genre
    } 
   }catch(err){
    console.error(`Cannot take the catalog for the page!Error: ${err}`);
    return {
        amountOfSeries:0,
        seriesNames:[''],
        seriesViewName:[''],
        rate:0,
        genre:['']
    } 
   }
}
export const getPageCount = async()=>{
    try{
        const req = await axios.get('/catalog/getCounts',{
            params:{
                series:true
            }
        })
        
        const amountOfPages = Math.ceil(req.data.count / 16);
        console.log('Amount Of pages! ',amountOfPages);
        
        return amountOfPages;
    }catch(err){
        console.error(`Cannot count amount of series for the page! ${err}`);
        return 1;
    }
}

export const getSeasonedCatalog = async()=>{
    const getFirstPageCatalog = await axios.get('/catalog/getCatalog',{
        params:{
            take:21
        }
    });
    
    const seriesViewNames = getFirstPageCatalog.data.map((item:{SeriesViewName:string}) => item.SeriesViewName);
    const seriesNames = getFirstPageCatalog.data.map((item:{SeriesName:string}) => item.SeriesName);
    console.log('SERIES: ',{
        seriesName:seriesNames,
        seriesViewName:seriesViewNames,
    });
    return {
        seriesName:seriesNames,
        seriesViewName:seriesViewNames,
    }
}
export default getSeriesInfo;