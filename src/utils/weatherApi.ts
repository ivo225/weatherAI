import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'e873c5d0adbb44fa9a9104213251402';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    console.log('Fetching weather data for:', city);
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 5,
        aqi: 'no'
      }
    });

    const data = response.data;
    
    console.log('Weather API data:', data);
    return {
      city: data.location.name,
      country: data.location.country,
      current: {
        temp: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_kph,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
      },
      forecast: data.forecast.forecastday.map((day: any) => ({
        date: new Date(day.date).toLocaleDateString(),
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: {
          max: day.day.maxtemp_c,
          min: day.day.mintemp_c,
        },
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        precipitation: day.day.daily_chance_of_rain,
      })),
      lastUpdate: new Date(data.current.last_updated).toLocaleTimeString(),
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error.message || 'Failed to fetch weather data');
    }
    throw new Error('Failed to fetch weather data');
  }
}
