import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiAiGenerate, RiRefreshLine } from 'react-icons/ri';
import { WeatherData } from '../types/weather';
import { generateWeatherInsights } from '../utils/deepseekAi';
import VoiceControl from './VoiceControl';

interface WeatherInsightsProps {
  weatherData: WeatherData;
}

export const WeatherInsights = ({ weatherData }: WeatherInsightsProps) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      setError(null);
      const aiInsights = await generateWeatherInsights(weatherData);
      setInsights(aiInsights);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching insights:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setInsights(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [weatherData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <RiAiGenerate className="text-2xl text-primary" />
          <div className="flex items-center gap-2">
            <RiAiGenerate className="text-2xl text-primary" />
            <h3 className="font-heading text-xl font-semibold text-dark">
              AI Weather Insights
            </h3>
          </div>
          <div className="flex items-center gap-1">
            {insights && <VoiceControl text={insights} />}
            <button
              onClick={fetchInsights}
              disabled={isLoading}
              className="p-2 text-primary hover:text-primary/80 disabled:text-gray-400
                       transition-colors duration-200 ease-in-out"
              title="Refresh insights"
            >
              <RiRefreshLine className={`text-xl ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
            />
            <span className="ml-3 text-gray-600 italic">
              Analyzing forecast trends...
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            {error ? (
              <div className="space-y-2">
                <p className="text-red-600 italic">
                  {error}
                </p>
                <button
                  onClick={fetchInsights}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Try again
                </button>
              </div>
            ) : (
              <p className="text-gray-700 italic leading-relaxed">
                {insights}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
