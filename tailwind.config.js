/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#0045A5',
        secondary: '#80cfff',
        light: {
          background: '#ffffff',
        },
        dark: {
          background: '#7378AB',
        },
      }
    },
  },
  plugins: [],
}

