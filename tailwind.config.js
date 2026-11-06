/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // 딥 네이비 항공 톤. 브랜드 블루·오렌지는 로고에서 가져온 색
        navy: { 950: '#060f24', 900: '#0a1733', 800: '#12224a', 700: '#1b3062' },
        ink: '#060f24',
        mist: '#f4f6fa',
        brand: { DEFAULT: '#1d4aa1', light: '#4d7fe0' },
        sun: '#f2a414',
        line: '#e2e6ee',
        muted: '#5a6478',
      },
      borderRadius: { DEFAULT: '4px' },
      maxWidth: { wrap: '1240px' },
    },
  },
  plugins: [],
};
