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
          primary: '#0045A5',
          secondary: '#80cfff',
          background: '#ffffff',
        },
        dark: {
          primary: '#0045A5',
          secondary: '#80cfff',
          background: '#7378AB',
        },
      }
    },
  },
  plugins: [],
}

