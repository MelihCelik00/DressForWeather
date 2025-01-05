import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Provider as PaperProvider, Text, Card } from 'react-native-paper';
import { getLocation, getWeather } from './src/utils/locationWeather';
import { recommendOutfit } from './src/utils/outfitRecommendation';
import { getOutfitImages, PexelsPhoto } from './src/utils/imageApi';
import { OutfitCard } from './src/components/OutfitCard';
import { PremiumCard } from './src/components/PremiumCard';
import { WeatherData } from './src/types';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [outfits, setOutfits] = useState<string[]>([]);
  const [outfitImage, setOutfitImage] = useState<PexelsPhoto | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const fetchOutfitImage = async () => {
    if (weather?.current_weather) {
      setImageLoading(true);
      const images = await getOutfitImages(
        weather.current_weather.temperature,
        weather.current_weather.weathercode
      );
      setOutfitImage(images[0] || null);
      setImageLoading(false);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const location = await getLocation();
      if (location) {
        const { latitude, longitude } = location.coords;
        const weatherData = await getWeather(latitude, longitude);
        setWeather(weatherData);
        if (weatherData && weatherData.current_weather) {
          const outfitSuggestions = recommendOutfit({
            temperature: weatherData.current_weather.temperature,
            weatherCode: weatherData.current_weather.weathercode,
          });
          setOutfits(outfitSuggestions);
          fetchOutfitImage();
        }
      }
    };
    fetchWeather();
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text variant="displaySmall" style={styles.title}>
            DressForWeather
          </Text>
          
          {weather && weather.current_weather ? (
            <Card style={styles.card}>
              <Card.Content>
                <Text variant="headlineMedium" style={styles.temperature}>
                  {weather.current_weather.temperature}°C
                </Text>
              </Card.Content>
            </Card>
          ) : (
            <Text variant="bodyLarge" style={styles.loadingText}>
              Loading weather data...
            </Text>
          )}

          {outfits.length > 0 && (
            <OutfitCard
              outfits={outfits}
              outfitImage={outfitImage}
              imageLoading={imageLoading}
              onRefresh={fetchOutfitImage}
            />
          )}

          <PremiumCard />
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  temperature: {
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginHorizontal: 16,
  },
});

export default App; 