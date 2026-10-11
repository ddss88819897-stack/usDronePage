/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        apple: {
          bg: '#f5f5f7',
          text: '#1d1d1f',
          gray: '#86868b',
          blue: '#0071e3',
        }
      }
    },
  },
  plugins: [],
}