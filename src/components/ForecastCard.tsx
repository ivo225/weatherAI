import { motion } from 'framer-motion';
import { ForecastDay } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastDay;
  index: number;
}

export const ForecastCard = ({ forecast, index }: ForecastCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="backdrop-blur-md bg-white/30 rounded-xl p-4 shadow-md"
    >
      <div className="text-center">
        <p className="font-heading font-semibold text-dark">{forecast.day}</p>
        <p className="text-sm text-gray-600">{forecast.date}</p>
      </div>

      <div className="my-2">
        <img
          src={`https:${forecast.icon}`}
          alt={forecast.condition}
          className="w-12 h-12 mx-auto"
        />
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-dark">
          {Math.round(forecast.temp.max)}° / {Math.round(forecast.temp.min)}°
        </p>
        <p className="text-xs text-gray-600">{forecast.precipitation}% rain</p>
      </div>
    </motion.div>
  );
};
