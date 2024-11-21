/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        primary: "#094074",
        secondary: "#3d9373", 
      },
      backgroundImage: {
        "gradient-color-right": "linear-gradient(to right, #094074, #246953)",
        "gradient-color-left": "linear-gradient(to left, #094074, #246953)",
        "gradient-color-bottom": "linear-gradient(to bottom, #094074, #246953)",
        "gradient-color-top": "linear-gradient(to top, #094074, #246953)",

      }
    },
  },
  plugins: [],
}