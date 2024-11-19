import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/u": {
        target: import.meta.mode === "development" ? "http://localhost:5000" : "https://url-buddy.vercel.app/",
        changeOrigin: true
      }
    }
  }
})
