import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  environment: {
    VITE_BLOGS_URL: 'http://localhost:3000/blogs',
  },
})
