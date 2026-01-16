/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D2B53',
        secondary: '#FFB534',
        accent: '#FF8A08',
        background: '#F7F1E5',
      },
      boxShadow: {
        '3d': '4px 4px 0px 0px #000',
        '3d-hover': '2px 2px 0px 0px #000',
      }
    },
  },
  plugins: [],
}