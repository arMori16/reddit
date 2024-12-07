import  axios from '@/components/api/axios'

export const xui = async () => {
    try {
      console.log('URAAAAAA');
      
      await axios.post('/catalog/item', {
        'SeriesName': 'Jujutsu-Kaisen',
        'Description':"Jujutsu Kaisen follows the story of Yuji Itadori, an ordinary boy who crosses paths with Megumi Fushiguro, a Jujutsu Sorcerer searching for a powerful Cursed Object known as Ryomen Sukuna's finger. Unintentionally, Yuji's friends unseal the Cursed Object, attracting dangerous Curses to their location. In a desperate attempt to protect his friends, Yuji consumes the finger, becoming the host of Sukuna's power.",
        'SeriesViewName':'Jujutsu Kaisen',
        'Rate': 9.5,
        'Status': 'came out',
        'Type': 'series',
        'ReleaseYear': '2020',
        'Genre': ['Fantasy', 'Action','Epic'],
        'Studio': ['Studio MAPPA'],
        'AmountOfEpisode': 47,
        'VoiceActing': ['AnimeVost', 'Anilibria', 'JumClub'],
        'VideoSource': 'Jujutsu-Kaisen',
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
  