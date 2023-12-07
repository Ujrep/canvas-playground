/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    colors: {
      black: '#000',
      white: '#FFF',
      primary: '#C209C1',
    },
    fontFamily: {
      spaceGrotesk: ['SpaceGrotesk'],
    },
  },
  plugins: [],
}
