'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { ForecastCard } from '../components/ForecastCard';
import { WeatherInsights } from '../components/WeatherInsights';
import type { WeatherData } from '../types/weather';
import { getWeatherData } from '../utils/weatherApi';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Searching for city:', city);
      const data = await getWeatherData(city);
      console.log('Received weather data:', data);
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherBackground = () => {
    if (!weatherData) return 'weather-bg-sunny';
    switch (weatherData.current.condition.toLowerCase()) {
      case 'cloudy':
        return 'weather-bg-cloudy';
      case 'rainy':
        return 'weather-bg-rainy';
      case 'snowy':
        return 'weather-bg-snowy';
      default:
        return 'weather-bg-sunny';
    }
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 ${getWeatherBackground()}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          >
            {error}
          </motion.div>
        )}

        {weatherData && (
          <>
            <WeatherCard data={weatherData} />
            
            <div className="mt-8">
              <h3 className="font-heading text-xl font-semibold text-dark mb-4">
                5-Day Forecast
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <ForecastCard key={day.date} forecast={day} index={index} />
                ))}
              </div>
            </div>
            
            <WeatherInsights weatherData={weatherData} />
          </>
        )}
      </div>
    </main>
  );
}
