/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Inter cho phần thân, Fraunces (serif) cho tiêu đề mang hơi hướng "báo chí"
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        // Tông nền tối chủ đạo
        ink: { 950: '#05070f', 900: '#080b16', 800: '#0d1120', 700: '#141a2e' },
        // Điểm nhấn vàng đồng
        brass: { 200: '#f7e2bd', 300: '#f4d6a6', 400: '#e7b873', 500: '#d6a25c' },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(231,184,115,0.45)',
        soft: '0 24px 64px -24px rgba(0,0,0,0.75)',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
