
import '@/app/(main)/catalog/item/[seriesName]/page.css'
import axios from '@/components/api/axios';
import Comments from '@/components/comments/comments';
import MediaPlayerSection from '@/components/player/MediaPlayerSection/MediaPlayerSection';
import { notFound } from "next/navigation";

async function getData(seriesName: string) {
    try {
        console.log('SERIESNAME: ',seriesName);
        
        const res = await axios.get('/catalog/item', {
            params: { SeriesName: seriesName }
        });
        return res.data;
    } catch (err) {
        console.log("Ошибка при получении данных:", err);
        return null; // Возвращаем null в случае ошибки
    }
}

type Test={
    SeriesName:string
}
const ItemPage = async({params}:{params:{seriesName:string}})=>{
    const data = await getData(params.seriesName);

    // Если данные не найдены, перенаправляем на страницу 404
    if (!data) {
        console.log('Something with data...');
        
        notFound();
    }

    const req = async()=>{
        try{
            console.log('params.seriesName:,',params.seriesName);
            
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
    const videoURL = `../../videos/${fetchedData.data.VideoSource}/${params.seriesName}`;
    /* useVideo(params.seriesName); */

    return(
        <div className="div-main-content-container bg-[#242424]">
            {/* <ClientRefresh /> */}
            <div className='w-[68rem] max-w-full flex flex-col items-center  h-full'>
                <div className='flex relative p-5 w-[68rem] max-w-[96%] mt-9 h-auto bg-[#3C3C3C] text-rose-50 rounded-[20px] flex-wrap'>
                    <div className='flex relative mr-5 custom-image:mr-0 w-[15.62rem] max-h-[21.87rem] custom-image:h-auto'>
                        <img className='flex max-h-full w-full rounded-[20px]' src={`http://localhost:3001/media/images/${params.seriesName}/images`} alt={fetchedData.data.SeriesName}/>
                    </div>
                    <div className='div-info'>
                        <h1 className='text-3xl custom-xs:mt-0  flex'>{fetchedData.data.SeriesViewName}</h1>
                        <ul className='inline-flex flex-col'>
                            <li className='w-auto inline-block' >Status: {fetchedData.data.Status}</li>
                            <li className='w-auto inline-block' >Type: {fetchedData.data.Type}</li>
                            <li className='w-auto inline-block' >Release: {fetchedData.data.ReleaseYear}</li>
                            <li className='w-auto inline-block' >Genre: {fetchedData.data.Genre.join(', ')}</li>
                            <li className='w-auto inline-block' >Studio: {fetchedData.data.Studio.join(', ')}</li>
                            <li className='w-auto inline-block' >Episodes: {fetchedData.data.AmountOfEpisode}</li>
                            <li className='w-auto inline-block' >Voice: {fetchedData.data.VoiceActing.join(', ')}</li>
                            <li className='w-auto inline-block' >Rate: {fetchedData.data.Rate}</li>
                        </ul>
                    </div>
                    <div className='flex relative break-words w-[43.75rem] ml-auto mr-auto h-auto mt-7'>
                            <p className='flex items-center'>{fetchedData.data.Description}</p>
                    </div>
                </div>
                    <MediaPlayerSection AmountOfEpisode={fetchedData.data.AmountOfEpisode} seriesName={params.seriesName}/>
                <div className='bg-[#242424] h-[100px]'>

                </div>
                <div className='w-[68rem] max-w-[96%]'>
                    <div className="relative flex bg-[#3C3C3C] overflow-hidden w-[100%] h-[40px] rounded-t-lg text-rose-50">
                        <div className='bg-[#222222] flex relative w-[100px] p-2 rounded-br-lg h-full'>Comments</div>
                    </div>
                    <Comments seriesName={params.seriesName}/>
                </div>
            </div>
        </div>
    )
}

export default ItemPage;