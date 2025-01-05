interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
  };
}

interface PexelsResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
}

const getOutfitImages = async (temperature: number, weatherCode: number, count: number = 3): Promise<PexelsPhoto[]> => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_PEXELS_API_KEY;
    
    // Base query for outfit style
    let query = 'outfit style fashion';
    
    // Add season and temperature context
    if (temperature <= 5) {
      query += ' winter freezing cold';
    } else if (temperature <= 10) {
      query += ' cool autumn fall';
    } else if (temperature <= 15) {
      query += ' mild spring';
    } else if (temperature <= 20) {
      query += ' spring comfortable';
    } else if (temperature <= 25) {
      query += ' warm summer';
    } else if (temperature <= 30) {
      query += ' hot summer';
    } else {
      query += ' very hot summer';
    }

    // Add specific weather condition context
    switch (weatherCode) {
      case 0: // Clear sky
      case 1: // Mainly clear
        query += ' sunny bright day';
        break;
      case 2: // Partly cloudy
      case 3: // Overcast
        query += ' cloudy day';
        break;
      case 45: // Fog
      case 48: // Depositing rime fog
        query += ' foggy day';
        break;
      case 51: // Light drizzle
      case 53: // Moderate drizzle
      case 55: // Dense drizzle
        query += ' light rain day';
        break;
      case 61: // Slight rain
      case 63: // Moderate rain
      case 65: // Heavy rain
        query += ' rainy day';
        break;
      case 80: // Slight rain showers
      case 81: // Moderate rain showers
      case 82: // Violent rain showers
        query += ' rainy weather';
        break;
      case 95: // Thunderstorm
      case 96: // Thunderstorm with slight hail
      case 99: // Thunderstorm with heavy hail
        query += ' stormy weather';
        break;
    }

    // Add context for outfit photos
    query += ' person wearing clothes street';

    // Add random page parameter to get different images
    const page = Math.floor(Math.random() * 5) + 1;
    
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&page=${page}&orientation=portrait`,
      {
        headers: {
          Authorization: apiKey || '',
        },
      }
    );
    
    const data: PexelsResponse = await response.json();
    if (!data.photos || data.photos.length === 0) return [];
    
    // Shuffle the photos array to get random images
    const shuffled = [...data.photos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error fetching outfit images:', error);
    return [];
  }
};

export { getOutfitImages };
export type { PexelsPhoto }; 