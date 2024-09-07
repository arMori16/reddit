import '@/components/mainPageComponent/carouselWrapper/carouselWrapper.css'


const CarouselWrapper = ()=>{
    return(
        <div className='main-container'>
          <div className='carousel-text'>
              SEASON'S ANIME
          </div>
          <div className='carousel-wrapper'>
            {/* Vinland */}
            <div>
              <a href="/catalog/item/Vinland-Saga">
                <img src="./posters/Vinland.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  Vinland Saga
                </span>
              </a>
            </div>
            {/* SOLO */}
            <div>
              <a href="/catalog/item/Solo-Leveling">
                <img src="./posters/Solo.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  Solo Leveling
                </span>
              </a>
            </div>
            {/* Kaisen */}
            <div>
              <a href="/catalog/item/Jujutsu-Kaisen">
                <img src="./posters/JutsuKaisen.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  Jujutsu Kaisen
                </span>
              </a>
            </div>
            {/* Maho */}
            <div>
              <a href="/catalog/item/The-wrong-way-to-use-healing-magic">
                <img src="./posters/Maho.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                The Wrong Way to Use Healing Magic
                </span>
              </a>
            </div>
            {/* Novichok */}
            <div>
              <a href="/catalog/item/The-Ossan-Newbie-Adventurer">
                <img src="./posters/Novichok.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  The Ossan Newbie Adventurer
                </span>
              </a>
            </div>
            {/* Shikaku */}
            <div>
              <a href="/catalog/item/No-Longer-Allowed-in-Another-World">
                <img src="./posters/Shikaku.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  No Longer Allowed in Another World
                </span>
              </a>
            </div>
            {/* Tsurugi */}
            <div>
              <a href="/catalog/item/Wistoria-Wand-and-Sword">
                <img src="./posters/Tsurugi.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  Wistoria: Wand and Sword
                </span>
              </a>
            </div>
          </div>
            <div className="tabs-content">

            </div>
        </div>
    )
}


export default CarouselWrapper;