/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //ici on redéfinit des couleurs personnalisées
      colors: {
        black: 'rgba(24 ,24 ,24 ,1)',
        black_05: 'rgba(24 ,24 ,24 ,0.5)',
        white: 'rgba(245 ,245 ,245 ,1)',
        white_05: 'rgba(255 ,255 ,255 ,0.5)',
        white_01: 'rgba(255 ,255 ,255 ,0.1)',
        green: 'rgba(30, 215, 96, 1)',
        green_08: 'rgba(30, 215, 96, 0.8)',
        green_06: 'rgba(30, 215, 96, 0.6)',
        green_top: 'rgba(26, 173, 78, 1)',
      },
      animation:{
        slideup: 'slideup 1s ease-in-out',
        slideup2: 'slideup 500ms ease-in-out',
      },
      keyframes:{
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
      }
    },
  },
  plugins: [],
}
