# 🌤️ AI-Powered Weather App

A modern, intelligent weather application built with Next.js that provides weather forecasts enhanced with AI-generated insights and voice narration.

## ✨ Features

- 🔍 **Real-time Weather Data**: Accurate weather information using WeatherAPI.com
- 🤖 **AI-Generated Insights**: Smart weather analysis and recommendations using DeepSeek AI
- 🗣️ **Voice Narration**: Text-to-speech functionality for weather insights
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🎨 **Dynamic Backgrounds**: Weather-appropriate visual themes
- 📊 **5-Day Forecast**: Extended weather predictions
- ⚡ **Fast Performance**: Built with Next.js for optimal speed

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- API keys for:
  - WeatherAPI.com
  - DeepSeek AI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your API keys:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_DEEPSEEK_API_KEY=your_deepseek_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Weather Data**: [WeatherAPI.com](https://www.weatherapi.com/)
- **AI Integration**: [DeepSeek AI](https://deepseek.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📦 Project Structure

```
/src
  /app              # Next.js app router files
  /components       # React components
    - WeatherCard.tsx
    - ForecastCard.tsx
    - SearchBar.tsx
    - WeatherInsights.tsx
    - VoiceControl.tsx
  /types           # TypeScript type definitions
  /utils           # Utility functions
    - weatherApi.ts
    - deepseekAi.ts
```

## 🎯 Features in Detail

### Weather Data
- Current weather conditions
- 5-day forecast
- Temperature, humidity, wind speed, and more
- Location-based weather information

### AI Insights
- Natural language weather summaries
- Practical suggestions based on weather conditions
- Weather pattern analysis
- Voice narration of insights

### User Interface
- Clean, modern design
- Responsive layout
- Dynamic weather-based themes
- Smooth animations
- Intuitive controls

## 🎨 Color Palette

- Primary: `#4A90E2` (Sky Blue)
- Secondary: `#FFD700` (Sunshine Yellow)
- Background variations based on weather conditions
- Glassmorphism effects for weather cards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- AI capabilities powered by [DeepSeek AI](https://deepseek.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
