import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app',  // Permite todos os subdomínios do ngrok
      '.ngrok.io',        // Permite domínios antigos do ngrok
      '.ngrok.app',       // Permite novos domínios do ngrok
    ],
    hmr: {
      clientPort: 5173,
    },
    proxy: {
      '/api': {
        target: 'https://0a22eca0af3c.ngrok-free.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
      '/static': {
        target: 'https://0a22eca0af3c.ngrok-free.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },
})
