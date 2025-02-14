export interface WeatherData {
  city: string;
  country: string;
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    condition: string;
    icon: string;
  };
  forecast: ForecastDay[];
  lastUpdate: string;
}

export interface ForecastDay {
  date: string;
  day: string;
  temp: {
    max: number;
    min: number;
  };
  condition: string;
  icon: string;
  precipitation: number;
}
