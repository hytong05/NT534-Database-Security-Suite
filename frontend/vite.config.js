import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8000,
    proxy: {
      '/api': {
        target: 'https://10.0.2.148:9000',  // backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
