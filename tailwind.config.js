/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111e6c',
        secondary: '#ef434e',
        darkGray: '#323232',
        ligthGray: '#969696',
      },
      backgroundImage: {
        'gradient-bold': 'linear-gradient(to right, #111e6c 60%, #ef434e 100%)',
        'gradient-bold-solf': 'linear-gradient(to right, #62315e 40%, #b06477 100%)'
      },
    },
  },
  plugins: [],
}
