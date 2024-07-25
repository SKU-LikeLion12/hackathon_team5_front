/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    fontFamily:{
      'mplusRounded': ['"M PLUS Rounded 1c"', 'sans-serif'],
      'MaplestoryOTFBold': ['MaplestoryOTFBold']
    },
    extend: {
      backgroundImage: {
        stone: "url('img/stone.png')"
      }
    },
  },
  plugins: [],
}