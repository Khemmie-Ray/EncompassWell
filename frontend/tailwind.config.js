/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#030A04',
        'secondary': '#F86737',

        'grey': '#6C6C6C',
        'lightGrey': '#B9A5C4'
      },
      fontFamily: {
        'Geist': ['Geist Sans', 'sans-serif'],
        'InstrumentSerif': ["Instrument Serif", "serif"]
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: false, 
    darkTheme: "dark",
    base: true, 
    styled: true, 
    utils: true, 
    prefix: "",
    logs: true, 
    themeRoot: ":root",
},
}