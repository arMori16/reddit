'use client'


export function initializeVideoControls(videoSelector:string, playerContainerSelector:string) {
    if(typeof window === "undefined") return;
    const video = document.querySelector(videoSelector);
    const playerContainer = document.querySelector(playerContainerSelector);

    if (!video || !playerContainer) {
        console.error("Video or player container not found");
        return;
    }
    video.addEventListener('pause', () => {
        playerContainer.classList.add('paused');
    });

    // Когда видео воспроизводится, удалить класс paused
    video.addEventListener('play', () => {
        playerContainer.classList.remove('paused');
    });
}

/* export const toggleVolume = () => {
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
}; */

const testMy = ()=>{
    if(typeof window === "undefined") return;
    const muteBtn = document.querySelector('.mutedBtn') as HTMLButtonElement;
    const video = document.querySelector('video');
    const playContainer = document.querySelector('.player-container') as HTMLDivElement;
    const volumeSlider = document.querySelector('.volume-slider') as HTMLInputElement;
    console.log('IM HEREE');
    
    muteBtn?.addEventListener("click",toggleMute);
    volumeSlider?.addEventListener('input',e=>{
        const target = e.target as HTMLInputElement
        if(!video) return;
        video.volume = Number(target?.value);
        video.muted = Number(target?.value) === 0;
    })
    function toggleMute(){
        if(!video) return;
        video.muted = !video.muted;
    }
    video?.addEventListener("volumechange",()=>{
        if(!volumeSlider) return;
        volumeSlider.value = String(video.volume);
        let volumeLevel;
        if(video.muted || video.volume === 0){
            volumeSlider.value = String(0);
            volumeLevel = 'muted';
        }else if(video.volume >= .4){
            volumeLevel = 'high';
        }else{
            volumeLevel = 'low';
        }
        if(!playContainer) return;
        playContainer.dataset.volumeLevel = volumeLevel;
    })

}

export default testMy;