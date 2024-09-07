import  axios from '@/components/api/axios'

export const xui = async () => {
    try {
      console.log('URAAAAAA');
      
      await axios.post('/catalog/item', {
        'SeriesName': 'ROMA-KVAS-A-YA-PIDORAS',
        'Rate': 2,
        'Status': 'came out',
        'Type': 'series',
        'ReleaseYear': 'January 6,2024',
        'Genre': ['Comedy', 'Fantasy', 'Isekai'],
        'Studio': ['Studio Add'],
        'AmountOfEpisode': 12,
        'VoiceActing': ['AniDub', 'AniVost', 'JumClub'],
        'VideoSource': 'C:/Users/arMori/desktop/VideofilesHosting',
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
  