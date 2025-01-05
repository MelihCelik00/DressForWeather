import * as Location from 'expo-location';

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location;
};

const getWeather = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data = await response.json();
    console.log('Weather data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export { getLocation, getWeather }; 