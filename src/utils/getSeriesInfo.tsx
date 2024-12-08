import axios from "@/components/api/axios";

const getSeriesInfo = async()=>{
    const getFirstPageCatalog = await axios.get('/catalog/getCatalog');
    console.log('ITS getFirstPageCatalog: ',getFirstPageCatalog.data[0].SeriesName);
    console.log('MESSAGE!!!!!');
    const seriesNames = getFirstPageCatalog.data.map((item:{SeriesName:string}) => item.SeriesName);
    const seriesViewNames = getFirstPageCatalog.data.map((item:{SeriesViewName:string}) => item.SeriesViewName);
    const rate = getFirstPageCatalog.data.map((item:{Rate:number[]}) => item.Rate);
    const genre = getFirstPageCatalog.data.map((item:{Genre:string[][]}) => item.Genre);
    console.log('IT IS SERIESNAMES: ',seriesNames);
    
    const reqAmountOfSeries = await axios.get('/catalog/getAmountOfSeries');
    const amountOfSeries = reqAmountOfSeries.data;
    return {
        amountOfSeries:amountOfSeries,
        seriesNames:seriesNames,
        seriesViewName:seriesViewNames,
        rate:rate,
        genre:genre
    }
}

const getSeasonedCatalog = async()=>{
    
}
export default getSeriesInfo;