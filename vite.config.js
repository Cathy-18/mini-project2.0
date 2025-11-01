import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mini-project2.0/', // 👈 Important for GitHub Pages
})
