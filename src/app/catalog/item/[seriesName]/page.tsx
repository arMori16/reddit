import '@/app/catalog/item/[seriesName]/page.css'
import axios from '@/components/api/axios';
import { setupTokenRefresh } from '@/components/api/setup-token';
import { ClientRefresh } from '@/components/mainPageComponent/setupTokenRefreshServer';
import Player from '@/components/player/player';

type Test={
    SeriesName:string
}
const ItemPage = async({params}:{params:{seriesName:string}})=>{
    const req = async()=>{
        try{
            const res = await axios.get('/catalog/item',{params:{
                SeriesName:params.seriesName
            }});
            return {data:res.data};
        }catch(err){
            console.log(err);
            return false;
        }
    }
    const fetchedData = await req();
    if (!fetchedData) {
        return <div>Ошибка при загрузке данных.</div>;
      }
      
    const videoURL = `../../videos/${fetchedData.data.VideoSource}/${params.seriesName}`
    return(
        <div className="div-main-content-container">
            <ClientRefresh />
            <div>
                <div className='flex relative w-[1000px] mt-[20px] h-auto bg-[#F7F3F7] rounded-[20px] flex-wrap'>
                    <div className='div-content-img h-[350px]'>
                        <img className='div-img' src={`../../posters/${params.seriesName}.jpg`} alt={fetchedData.data.SeriesName}/>
                    </div>
                    <div className='div-info'>
                        <h1 className='text-3xl mt-5 flex'>{fetchedData.data.SeriesViewName}</h1>
                        <ul className='inline-flex flex-col'>
                            <li className='bg-yellow-300 w-auto inline-block' >Status: {fetchedData.data.Status}</li>
                            <li className='bg-yellow-300 w-auto inline-block' >Type: {fetchedData.data.Type}</li>
                            <li className='bg-yellow-300 w-auto inline-block' >Release: {fetchedData.data.ReleaseYear}</li>
                            <li className='bg-yellow-300 w-auto inline-block' >Genre: {fetchedData.data.Genre.join(', ')}</li>
                            <li className='bg-yellow-300 w-auto inline-block' >Studio: {fetchedData.data.Studio.join(', ')}</li>
                            <li className='bg-yellow-300 w-auto inline-block' >Episodes: {fetchedData.data.AmountOfEpisode}</li>
                            <li className='bg-yellow-300 w-auto inline-block' >Voice: {fetchedData.data.VoiceActing.join(', ')}</li>
                            <li className='bg-yellow-300 w-auto inline-block' >Rate: {fetchedData.data.Rate}</li>
                            {/* <li className='bg-yellow-300 w-auto inline-block' >Description: {fetchedData.data.Description}</li> */}
                        </ul>
                    </div>
                    <div className='flex relative w-[700px] ml-auto mr-auto h-[200px]'>
                            <p className='flex items-center'>{fetchedData.data.Description}</p>
                    </div>
                </div>
                <div className='w-[1000px] h-auto mt-[20px] relative flex'>
                    <div className='bg-slate-600 relative w-[100%] max-w-[1000px] h-[500px] flex flex-col mt-[20px] p-[20px] rounded-[20px] '>
                        {/* <video controls={false} className='flex relative w-100% max-w-[1000px] h-auto overflow-hidden object-cover ' src={`../../videos/${fetchedData.data.VideoSource}/${params.seriesName}.mp4`}></video> */}
                        <Player url={videoURL}/>
                    </div>
                </div>
                <div className='bg-slate-50 h-[400px]'>

                </div>
            </div>
        </div>
    )
}

export default ItemPage;