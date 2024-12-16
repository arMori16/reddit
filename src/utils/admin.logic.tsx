import axios from "@/components/api/axios"



export const getALlCounts = async():Promise<{
    comments:number,
    series:number,
    users:number,
}>=>{
    try{
        const allCounts = await axios.get('/catalog/getCounts');
        /* console.log('Here is the counts: ',allCounts.data); */
        return {
            comments: allCounts.data.comments,
            series: allCounts.data.series,
            users: allCounts.data.users
        }
    }catch(err){
        throw new Error('Error when trying to getAllCounts!')
    }
}

export const getSeries = async()=>{
    try{
        const series = await axios.get('/catalog/admin/series');
        console.log('Admin Series: ',series.data);
        
        return series.data
    }catch(err){
        throw new Error('Error when trying to getSeries for admin page(dashboard)!');
    }
}