/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
    },
    container: {
        padding: "2rem",
        center: true,
    },
    extend: {
      colors: {
        "weather-primary": "#000000",
        "weather-secondary": "#004E71",
      },
    },
  },
  plugins: [],
};
