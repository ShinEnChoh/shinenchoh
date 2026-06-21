/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'shu-iro': '#C04040',      // 朱色（天津神・太陽・高天原）
        'ruri-iro': '#4A5C82',     // 瑠璃色（国津神・大地・葦原中国）
        'kin-iro': '#B8860B',      // 金色（ご神徳・加護）
        'washi': '#faf7f2',        // 和紙の背景色
        'sumi': '#3b3b3b',         // 墨文字
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', 'serif'],
        mincho: ['"Zen Old Mincho"', 'serif'],
      },
    },
  },
  plugins: [],
}