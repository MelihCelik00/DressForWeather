import { OutfitRecommendation } from '../types';

const recommendOutfit = ({ temperature, weatherCode }: OutfitRecommendation): string[] => {
  const outfits: string[] = [];

  // Temperature-based recommendations (adjusted for more realistic ranges)
  if (temperature <= 5) {
    // Very cold
    outfits.push('Warm coat', 'Thermal layer', 'Scarf', 'Gloves', 'Winter boots');
  } else if (temperature <= 10) {
    // Cold
    outfits.push('Light coat', 'Warm sweater', 'Long sleeve shirt', 'Jeans', 'Closed shoes');
  } else if (temperature <= 15) {
    // Cool
    outfits.push('Light jacket', 'Long sleeve shirt', 'Casual pants');
  } else if (temperature <= 20) {
    // Mild
    outfits.push('Light sweater', 'T-shirt', 'Casual pants', 'Sneakers');
  } else if (temperature <= 25) {
    // Warm
    outfits.push('T-shirt', 'Light pants', 'Sneakers');
  } else if (temperature <= 30) {
    // Hot
    outfits.push('Light T-shirt', 'Shorts', 'Sandals');
  } else {
    // Very hot
    outfits.push('Light T-shirt', 'Light shorts', 'Sandals', 'Hat');
  }

  // Weather condition based additions
  switch (weatherCode) {
    // Clear conditions
    case 0: // Clear sky
      if (temperature > 20) {
        outfits.push('Sunglasses', 'Hat');
      }
      break;
    case 1: // Mainly clear
      if (temperature > 20) {
        outfits.push('Sunglasses');
      }
      break;
    case 2: // Partly cloudy
    case 3: // Overcast
      if (temperature < 20) {
        outfits.push('Light layer');
      }
      break;

    // Fog conditions
    case 45: // Fog
    case 48: // Depositing rime fog
      outfits.push('Bright colored clothing', 'Reflective accessories');
      break;

    // Drizzle
    case 51: // Light drizzle
      outfits.push('Light rain jacket');
      break;
    case 53: // Moderate drizzle
      outfits.push('Rain jacket', 'Water-resistant shoes');
      break;
    case 55: // Dense drizzle
      outfits.push('Rain jacket', 'Waterproof shoes', 'Small umbrella');
      break;
    case 56: // Light freezing drizzle
    case 57: // Dense freezing drizzle
      outfits.push('Warm waterproof jacket', 'Waterproof boots', 'Gloves');
      break;

    // Rain
    case 61: // Slight rain
      outfits.push('Rain jacket', 'Water-resistant shoes');
      break;
    case 63: // Moderate rain
      outfits.push('Rain jacket', 'Waterproof shoes', 'Umbrella');
      break;
    case 65: // Heavy rain
      outfits.push('Heavy rain jacket', 'Waterproof boots', 'Large umbrella');
      break;
    case 66: // Light freezing rain
    case 67: // Heavy freezing rain
      outfits.push('Warm waterproof jacket', 'Insulated waterproof boots', 'Warm gloves');
      break;

    // Snow
    case 71: // Slight snow
      outfits.push('Warm jacket', 'Winter boots', 'Light gloves');
      break;
    case 73: // Moderate snow
      outfits.push('Winter coat', 'Snow boots', 'Warm gloves', 'Scarf');
      break;
    case 75: // Heavy snow
      outfits.push('Heavy winter coat', 'Insulated snow boots', 'Thermal gloves', 'Scarf', 'Winter hat');
      break;
    case 77: // Snow grains
      outfits.push('Winter jacket', 'Snow boots', 'Light gloves');
      break;

    // Rain showers
    case 80: // Slight rain showers
      outfits.push('Light rain jacket', 'Water-resistant shoes');
      break;
    case 81: // Moderate rain showers
      outfits.push('Rain jacket', 'Waterproof shoes', 'Foldable umbrella');
      break;
    case 82: // Violent rain showers
      outfits.push('Heavy rain jacket', 'Waterproof boots', 'Storm umbrella');
      break;

    // Snow showers
    case 85: // Slight snow showers
      outfits.push('Winter jacket', 'Snow boots', 'Light gloves');
      break;
    case 86: // Heavy snow showers
      outfits.push('Winter coat', 'Insulated snow boots', 'Warm gloves', 'Winter hat');
      break;

    // Thunderstorm
    case 95: // Slight or moderate thunderstorm
      outfits.push('Waterproof jacket', 'Waterproof shoes', 'Storm umbrella');
      break;
    case 96: // Thunderstorm with slight hail
    case 99: // Thunderstorm with heavy hail
      outfits.push('Heavy rain jacket', 'Waterproof boots', 'Storm umbrella');
      break;
  }

  return outfits;
};

export { recommendOutfit }; 