'use client'

import { useRef, useState } from "react";
import usePlayer from "./usePlayer";
import { State } from "../useZustand/zustandStorage";
import { HTMLCustomVideoElement } from "./types/player.type";
import playbackPosition from "../useZustand/zustandStorage";
export function initializeVideoControls(videoSelector:string, playerContainerSelector:string) {
    if(typeof window === "undefined") return;

    const video = document.querySelector(videoSelector) as HTMLCustomVideoElement;
    const currentTimeElement = document.querySelector('.current-time');
    const totalTimeElement = document.querySelector('.total-time');
    const controls = document.querySelector('.controls')
    const fullScreenBtn = document.querySelector('.full-screen-btn');
    const timeLineContainer = document.querySelector('.timeline-container') as HTMLDivElement
    const playerContainer = document.querySelector(playerContainerSelector) as HTMLDivElement;
    if (!video || !playerContainer) {
        console.error("Video or player container not found");
        return;
    }

    let timeout:NodeJS.Timeout | null;
    
    video.addEventListener('mousemove',(e:MouseEvent)=>{
        if (timeout) {
            clearTimeout(timeout);
        }

        // Показать курсор, если он был скрыт
        (playerContainer as HTMLDivElement).style.cursor = 'default';
        (controls as HTMLDivElement).style.visibility = 'visible';
        // Перезапускаем таймер
        if(playerContainer.classList.contains("paused")) return;
        
        timeout = setTimeout(() => {
            // Если курсор не двигался в течение 5 секунд, скрыть его
            (playerContainer as HTMLDivElement).style.cursor = 'none';
            (controls as HTMLDivElement).style.visibility = 'hidden';

        }, 5000);
    })

    /* TIMELINE */

    let isScrubbing = false;
    let wasPaused:any;
    timeLineContainer?.addEventListener('mousemove',handleTimeLineUpdate);
    timeLineContainer?.addEventListener('mousedown',toggleScrubbing);
    document.addEventListener("mouseup",e=>{
        if(isScrubbing) toggleScrubbing(e);
    })
    document.addEventListener("mousemove",e=>{
        if(isScrubbing) handleTimeLineUpdate(e);
    })
    function toggleScrubbing(e:MouseEvent){
        const rect = timeLineContainer?.getBoundingClientRect();
        if(!rect) return;
        const percent = Math.min(Math.max(0,e.x - rect.x,),rect.width)/rect.width;
        isScrubbing = (e.buttons & 1) === 1;
        video.classList.toggle("scrubbing",isScrubbing)
        if(isScrubbing){
            wasPaused = video.paused;
            video.pause();
        }else{
            video.currentTime = percent * video.duration
            if(!wasPaused)video.play();
        }
        handleTimeLineUpdate(e);
    }
    function handleTimeLineUpdate(e:MouseEvent){
        const rect = timeLineContainer?.getBoundingClientRect();
        if(!rect) return;
        const percent = Math.min(Math.max(0,e.x - rect.x,),rect.width)/rect.width;
        timeLineContainer?.style.setProperty("--preview-position",String(percent));
        if(isScrubbing){
            e.preventDefault();
            timeLineContainer?.style.setProperty("--progress-position",String(percent))
        }
    }

    /* TIMELINE */
    video.addEventListener('pause', () => {
        playerContainer.classList.add('paused');
    });

    video.addEventListener("timeupdate",()=>{
        if(!currentTimeElement) return;
        const percent = video.currentTime / video.duration;
        timeLineContainer?.style.setProperty("--progress-position",String(percent));
        currentTimeElement.textContent = formatDuration(video.currentTime);
        const currentTime = String(video.currentTime);
        let isCurrentTimeExists = Number(localStorage.getItem('currentTime'));
        if(!isNaN(isCurrentTimeExists)){
            isCurrentTimeExists = Number(currentTime);
            localStorage.setItem('currentTime', String(isCurrentTimeExists));
        }else{
            isCurrentTimeExists = Number(currentTime);
            localStorage.setItem('currentTime', String(isCurrentTimeExists));
        }
        
    })
    // Когда видео воспроизводится, удалить класс paused
    video.addEventListener('play', () => {
        playerContainer.classList.remove('paused');
    });
    video.addEventListener('play',()=>{
        if(!totalTimeElement) return;
        console.log('ITS TOTALTIME');
        if(!currentTimeElement) return;
        currentTimeElement.textContent = formatDuration(video.currentTime);
        totalTimeElement.textContent = formatDuration(Number(video.duration));
    })
    video.addEventListener('loadedmetadata',()=>{
        if(!totalTimeElement) return;
        console.log('ITS TOTALTIME');
        if(!currentTimeElement) return;
        currentTimeElement.textContent = formatDuration(video.currentTime);
        totalTimeElement.textContent = formatDuration(Number(video.duration))
    })
    const leadingZeroFormatter = new Intl.NumberFormat(undefined,{
        minimumIntegerDigits:2
    })
    const formatDuration = (time:number):any=>{
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60) % 60;
        const hours = Math.floor(time / 3600);
        if(hours === 0){
            return `${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
        }else{
            return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
        }
    }
    console.log('SEICAHS INITIAL');
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

const volumeLogic = ()=>{
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
export default volumeLogic;