'use client'


export function initializeVideoControls(videoSelector:string, playerContainerSelector:string) {
    if(typeof window === "undefined") return;
    const video = document.querySelector(videoSelector) as HTMLVideoElement;
    const playerContainer = document.querySelector(playerContainerSelector) as HTMLDivElement;

    if (!video || !playerContainer) {
        console.error("Video or player container not found");
        return;
    }
    console.log('SEICAHS INITIAL');
    
    video.addEventListener('pause', () => {
        playerContainer.classList.add('paused');
    });

    // Когда видео воспроизводится, удалить класс paused
    video.addEventListener('play', () => {
        playerContainer.classList.remove('paused');
    });
}

export const toggleVolume = () => {
    if(typeof window === "undefined") return;
    const player = document.querySelector('video');
    if (!player) return;

    const toggleMute = () => {
        const volume = player.getAttribute('data-volume-level');

        if (volume === 'high') {
            player.setAttribute('data-volume-level', 'muted');
        } else {
            player.setAttribute('data-volume-level', 'high');
        }

        player.muted = !player.muted;
    };

    // Удаляем ранее добавленный обработчик перед добавлением нового
    player.removeEventListener("click", toggleMute);
    player.addEventListener("click", toggleMute);
};

const testMy = ()=>{
     if(typeof window === "undefined") return;
    const muteBtn = document.querySelector('.mutedBtn') as HTMLButtonElement;
    const video = document.querySelector('video') as HTMLVideoElement;
    const playContainer = document.querySelector('.player-container') as HTMLDivElement;
    const volumeSlider = document.querySelector('.volume-slider') as HTMLDivElement;
    const myTest = document.querySelector('.mytest');
    console.log('IM HEREE');
    const customRange = document.querySelector('input') as HTMLInputElement;
    
    
    muteBtn?.addEventListener("click",toggleMute);
    volumeSlider?.addEventListener('input',e=>{
        const target = e.target as HTMLInputElement
        if(!video) return;
        video.volume = Number(target?.value);
        video.muted = Number(target?.value) === 0;
    }) 
    volumeSlider?.addEventListener('input', e => {
        console.log('SEICAHS VOLUMECHANGE');
        const target = e.target as HTMLInputElement;
        if (!video) return;
        
        // Обновляем громкость видео
        video.volume = Number(target.value);
        video.muted = Number(target.value) === 0;
    
        // Обновляем визуальное состояние кнопок и ползунка сразу
        let volumeLevel;
        if (video.muted || video.volume === 0) {
            volumeLevel = 'muted';
        } else if (video.volume >= 0.4) {
            volumeLevel = 'high';
        } else {
            volumeLevel = 'low';
        }
        
        if (playContainer) {
            playContainer.dataset.volumeLevel = volumeLevel;
        }
    },false);
    function toggleMute(){
        if(!video) return;
        video.muted = !video.muted;
    }
    
}


/* export const useVideoLogic = async(seriesName:any,quality:EnumPlayerQuality)=>{
    console.log('VIDEOLOGIC : ',seriesName);
    
    const res = await useVideo(seriesName,quality);
    return res;
} */
export default testMy;