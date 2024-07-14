/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD700",
        primary_dark: '#1E40AF',
        secondary: "#ff6d33",
      }
    },
  },
  plugins: [],
}