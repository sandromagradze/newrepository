import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      
      '/ka/api': {
        target: 'https://dev.ipn.ge/api/docs#/ ',
        changeOrigin: true,
        secure: false,
      },
      '/en/api': {
        target: 'https://dev.ipn.ge/api/docs#/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})