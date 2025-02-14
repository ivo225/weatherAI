import { WeatherData } from '../types/weather';

interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

function formatWeatherDataForPrompt(weatherData: WeatherData): string {
  const current = `Current conditions in ${weatherData.city}, ${weatherData.country}:
- Temperature: ${weatherData.current.temp}°C (feels like ${weatherData.current.feels_like}°C)
- Condition: ${weatherData.current.condition}
- Humidity: ${weatherData.current.humidity}%
- Wind Speed: ${weatherData.current.wind_speed} km/h\n`;

  const forecast = weatherData.forecast.map(day => 
    `${day.date} (${day.day}):
    - High: ${day.temp.max}°C, Low: ${day.temp.min}°C
    - Condition: ${day.condition}
    - Precipitation Chance: ${day.precipitation}%`
  ).join('\n');

  return `${current}\nForecast for the next 5 days:\n${forecast}`;
}

// Simple cache to store insights
const insightsCache = new Map<string, { insights: string; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export async function generateWeatherInsights(weatherData: WeatherData): Promise<string> {
  const cacheKey = `${weatherData.city}-${weatherData.current.temp}-${weatherData.current.condition}`;
  const cachedData = insightsCache.get(cacheKey);
  
  if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
    return cachedData.insights;
  }
  try {
    const formattedData = formatWeatherDataForPrompt(weatherData);
    
    console.log('Sending request to DeepSeek AI with data:', formattedData);
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a meteorology assistant providing natural-language weather forecasts.'
          },
          {
            role: 'user',
            content: `Analyze this weather data and provide a brief summary (max 3 sentences) with practical suggestions:\n${formattedData}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      }),
    });

    console.log('DeepSeek API response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData);
      throw new Error(`DeepSeek API error: ${response.status} - ${errorData}`);
    }

    const responseText = await response.text();
    console.log('DeepSeek API raw response:', responseText);
    
    const data: DeepSeekResponse = JSON.parse(responseText);
    const insights = data.choices[0].message.content;
    
    // Cache the insights
    insightsCache.set(cacheKey, {
      insights,
      timestamp: Date.now()
    });
    
    return insights;
  } catch (error) {
    console.error('Error generating weather insights:', error);
    return 'AI forecast insights currently unavailable. Please check back later.';
  }
}
