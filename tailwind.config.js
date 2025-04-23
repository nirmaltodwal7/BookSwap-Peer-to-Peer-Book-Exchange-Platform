/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        paper: '#F5F5DC',
        aged: '#E8DDCB',
        burgundy: '#722F37',
        leather: '#8B4513',
        gold: '#DAA520',
      },
      animation: {
        'page-turn': 'pageTurn 0.6s ease-in-out forwards',
      },
      keyframes: {
        pageTurn: {
          '0%': { transform: 'perspective(1200px) rotateY(0deg)' },
          '100%': { transform: 'perspective(1200px) rotateY(-30deg)' },
        },
      },
    },
  },
  plugins: [],
};