import axios from "@/components/api/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const setSeriesRate = async(seriesName:string,value:number)=>{
    try{
        const atToken = Cookies.get('accessToken');
        console.log('Access token: ',atToken);
        console.log('Value: ',value);
        
        const req = await axios.put('/catalog/item/rate',{
            seriesName:seriesName,
            value:value
        },
        {
            headers:{
                'Authorization':`Bearer ${atToken}`
            }
        })
        console.log(`User's rate: `,req.data);
        
        toast.success('Rated successfully')
        return req.data.Value
    }catch(err){
        console.error(`Couldn't set rate for the series!Error:${err}`);
        toast.error(`Couldn't rate the series!`)
    }
}
export const getUserRate = async(seriesName:string,atToken:string | undefined)=>{
    try{
        const req = await axios.get('/catalog/user/rate',{
            params:{
                seriesName:seriesName
            },
            headers:{
                'Authorization':`Bearer ${atToken}`
            }
        })
        console.log(`User's rate: `,req.data);
        return req.data.Value
    }catch(err){
        console.error(`Couldn't set rate for the series!Error:${err}`);
    }
}
export const getSeriesRate = async(seriesName:String)=>{
    const data = await axios.get('/catalog/item/rate',{
        params:{
            seriesName:seriesName
        }
    });
    return data.data;
}
export const getItemsRate = async(seriesNames:string[])=>{
    try{
        const itemsRate = await axios.get('catalog/items/rate',{
            params:{
                seriesNames:seriesNames
            }
        })
        console.log(`IT's RESULT DATA: `,itemsRate.data);
        const data = itemsRate.data.map((item:any,index:number)=>{
            return {SeriesName:item.SeriesName,Rate:item._avg.Value}
        })
        return data;
    }catch(err){
        console.error(`Error: ${err}`);
        
    }
}
export const getUserRates = async(atToken:string | undefined)=>{
    try{
        const userRates = await axios.get('/catalog/user/rates',{
            headers:{
                'Authorization':`Bearer ${atToken}`
            }
        })
        return userRates.data;
    }catch(err){
        console.error(`Error: ${err}`);
        
    }
}
export const deleteUserRate = async(seriesName:string)=>{
    try{
        const atToken = Cookies.get('accessToken');
        const req = await axios.delete('catalog/user/rate/delete',{
            headers:{
                'Authorization':`Bearer ${atToken}`
            },
            params:{
                seriesName:seriesName
            }
        });
        toast.info('Deleted successfully!');
        return req;
    }catch(err){
        toast.warning(`Couldn't delete the rate :(`)
        console.error(`Error: ${err}`);
        
    }
}
export const getSeriesData = async(seriesName:string)=>{
    try{
        const res = await axios.get('/catalog/item',{
            params:{
                seriesName:seriesName
        }});
        const seriesRate = await getSeriesRate(seriesName);
        return {data:res.data,seriesRate:seriesRate};
    }catch(err){
        console.error(`Couldn't get series data: ${err}`);
    }
}