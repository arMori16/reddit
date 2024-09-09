import  axios from '@/components/api/axios'

export const xui = async () => {
    try {
      console.log('URAAAAAA');
      
      await axios.patch('/catalog/patch', {
        'SeriesName': 'Vinland-Saga',
        'Description':"Vinland Saga is an adaptation of the historical-action manga series by Makoto Yukimura. Centering around young Thorfinn, the story sees the young man on a quest for revenge following the murder of his father by the mercenary Askeladd. To accomplish this feat, Thorfinn joins Askeladd's company to bide his time and prepare to face him in the future. The story starts around 1002 AD and revolves around fictional accounts of the Danish invasion of London.",
        'SeriesViewName':'Vinland Saga',
        'Rate': 9,
        'Status': 'came out',
        'Type': 'series',
        'ReleaseYear': '2019',
        'Genre': ['Fantasy', 'Action','Adventure','Epic'],
        'Studio': ['Wit Studio','MAPPA'],
        'AmountOfEpisode': 48,
        'VoiceActing': ['AniDub', 'AniVost', 'JumClub'],
        'VideoSource': 'VinlandSaga-1',
      });
      
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  
  export const xui2 = async () => {
    const result = await xui(); // Дождитесь завершения промиса
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  