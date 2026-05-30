import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cấu hình Vite tối giản cho dự án React
export default defineConfig({
  base: '/digital-press-museum/',
  plugins: [react()],
})
