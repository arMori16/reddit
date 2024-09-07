import '@/app/catalog/item/[seriesName]/page.css'
import axios from '@/components/api/axios';

type Test={
    SeriesName:string
}
const ItemPage = async({params}:{params:{seriesName:string}})=>{
    try{
        const req = await axios.get('/catalog/item',{params:{
            SeriesName:params.seriesName
        }});
    }catch(err){
        console.log(err);
    }
    
    return(
        <div className="div-main-content-container">
            <div className='div-content-container'>
                div
            </div>
        </div>
    )
}

export default ItemPage;