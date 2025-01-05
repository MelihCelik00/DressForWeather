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
    let query = 'person wearing';
    
    // Add specific clothing items based on temperature
    if (temperature <= 5) {
      query += ' winter coat scarf gloves boots';
    } else if (temperature <= 10) {
      query += ' light coat sweater jeans boots';
    } else if (temperature <= 15) {
      query += ' light jacket long sleeve casual';
    } else if (temperature <= 20) {
      query += ' light sweater casual outfit';
    } else if (temperature <= 25) {
      query += ' tshirt casual summer';
    } else if (temperature <= 30) {
      query += ' summer shorts tshirt';
    } else {
      query += ' summer beach shorts';
    }

    // Add weather-specific modifiers
    switch (weatherCode) {
      case 0: // Clear sky
      case 1: // Mainly clear
        if (temperature > 20) {
          query += ' sunglasses summer fashion';
        } else {
          query += ' sunny day fashion';
        }
        break;
      case 2: // Partly cloudy
      case 3: // Overcast
        query += ' casual street style';
        break;
      case 45: // Fog
      case 48: // Depositing rime fog
        query += ' autumn style';
        break;
      case 51: // Light drizzle
      case 53: // Moderate drizzle
      case 55: // Dense drizzle
        query += ' rain jacket umbrella';
        break;
      case 61: // Slight rain
      case 63: // Moderate rain
      case 65: // Heavy rain
        query += ' raincoat umbrella boots';
        break;
      case 80: // Slight rain showers
      case 81: // Moderate rain showers
      case 82: // Violent rain showers
        query += ' rain outfit umbrella';
        break;
      case 95: // Thunderstorm
      case 96: // Thunderstorm with slight hail
      case 99: // Thunderstorm with heavy hail
        query += ' rain protection outfit';
        break;
    }

    // Add context to ensure we get fashion/outfit photos
    query += ' fashion outfit model';

    // Add random page parameter to get different images
    const page = Math.floor(Math.random() * 5) + 1;
    
    console.log('Search query:', query); // For debugging
    
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