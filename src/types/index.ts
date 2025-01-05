export interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
}

export interface OutfitRecommendation {
  temperature: number;
  weatherCode: number;
} 