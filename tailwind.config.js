/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Courier New"', 'monospace'],
      },
      colors: {
        '42bg': '#1e1e1e',
        '42text': '#d4d4d4',
        '42accent': '#00babc',
        '42fail': '#f38ba8',
        '42pass': '#a6e3a1',
      }
    },
  },
  plugins: [],
}
