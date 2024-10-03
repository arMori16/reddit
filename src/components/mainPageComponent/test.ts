import  axios from '@/components/api/axios'

export const xui = async () => {
    try {
      console.log('URAAAAAA');
      
      await axios.post('/catalog/item', {
        'SeriesName': 'Wistoria-Wand-and-Sword',
        'Description':"A teen without magical powers enrolls in a magic academy. He can't use a wand, but his skill with a sword fuels his drive to keep a promise to a friend.",
        'SeriesViewName':'Wistoria Wand and Sword',
        'Rate': 7,
        'Status': 'came out',
        'Type': 'series',
        'ReleaseYear': '2024',
        'Genre': ['Fantasy', 'Action','Epic','Adventure'],
        'Studio': ['Actas','Bandai Namco Pictures'],
        'AmountOfEpisode': 12,
        'VoiceActing': ['AnimeVost', 'Anilibria', 'JumClub'],
        'VideoSource': 'Wistoria-Wand-and-Sword-1',
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
  