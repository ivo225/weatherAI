import { motion } from 'framer-motion';
import { WeatherData } from '../types/weather';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-md bg-white/30 rounded-2xl p-6 shadow-lg"
    >
      <div className="text-center mb-6">
        <h2 className="font-heading text-3xl font-bold text-dark">
          {data.city}, {data.country}
        </h2>
        <p className="text-sm text-gray-600">Last updated: {data.lastUpdate}</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="text-6xl font-bold text-dark">
          {Math.round(data.current.temp)}°C
        </div>
        <img
          src={`https:${data.current.icon}`}
          alt={data.current.condition}
          className="w-16 h-16"
        />
      </div>

      <div className="text-center mb-6">
        <p className="text-xl text-dark capitalize">{data.current.condition}</p>
        <p className="text-gray-600">
          Feels like {Math.round(data.current.feels_like)}°C
        </p>
      </div>

      <div className="flex justify-around text-dark">
        <div className="flex items-center gap-2">
          <WiHumidity className="text-2xl text-primary" />
          <span>{data.current.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <WiStrongWind className="text-2xl text-primary" />
          <span>{data.current.wind_speed} km/h</span>
        </div>
      </div>
    </motion.div>
  );
};
