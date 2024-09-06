import '@/app/page.css'

export default async function Home() {
  
  return (
      <body>
        <div className='main-container'>
          <div className='carousel-text'>
              SEASON'S ANIME
          </div>
          <div className='carousel-wrapper'>
            {/* Vinland */}
            <div>
              <a href="/catalog/item/Vinland_Saga">
                <img src="./posters/Vinland.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  Vinland Saga
                </span>
              </a>
            </div>
            {/* SOLO */}
            <div>
              <a href="/catalog/item/Vinland_Saga">
                <img src="./posters/Solo.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  Solo Leveling
                </span>
              </a>
            </div>
            {/* Kaisen */}
            <div>
              <a href="/catalog/item/Vinland_Saga">
                <img src="./posters/JutsuKaisen.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  Jujutsu Kaisen
                </span>
              </a>
            </div>
            {/* Maho */}
            <div>
              <a href="/catalog/item/Vinland_Saga">
                <img src="./posters/Maho.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                The Wrong Way to Use Healing Magic
                </span>
              </a>
            </div>
            {/* Novichok */}
            <div>
              <a href="/catalog/item/Vinland_Saga">
                <img src="./posters/Novichok.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  The Ossan Newbie Adventurer
                </span>
              </a>
            </div>
            {/* Shikaku */}
            <div>
              <a href="/catalog/item/No-Longer-Allowed-in-Another World">
                <img src="./posters/Shikaku.jpg" alt="" className='poster-img'/>
                <span className='poster-span'>
                  No Longer Allowed in Another World
                </span>
              </a>
            </div>
            {/* Tsurugi */}
            <div>
              <a href="/catalog/item/Wistoria_Wand_and_Sword">
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
      </body>
  );

}
