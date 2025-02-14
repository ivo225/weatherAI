/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        secondary: "#FFD700",
        dark: "#2C3E50",
        warm: "#E74C3C",
        neutral: "#F5F5F5",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
      }),
    },
  },
  plugins: [],
  safelist: [
    'weather-bg-sunny',
    'weather-bg-cloudy',
    'weather-bg-rainy',
    'weather-bg-snowy',
    'weather-bg-night',
    'from-blue-400',
    'from-gray-400',
    'from-blue-800',
    'from-gray-200',
    'from-gray-900',
    'to-blue-200',
    'to-blue-400',
    'to-white',
    'to-blue-900',
  ],
}
