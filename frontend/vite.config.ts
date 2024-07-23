import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://v;itejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4001"
      }
    }
  }
})
