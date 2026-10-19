import path from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],

  server: {
    host: '0.0.0.0',
    port: 5173,

    // Allow requests coming through ngrok
    allowedHosts: true,

    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'http://localhost:3002',
        changeOrigin: true,
        ws: true,
      },
      '/recommendation': {
        target: process.env.VITE_PROXY_TARGET || 'http://localhost:3002',
        changeOrigin: true,
      },
      '/health': {
        target: process.env.VITE_PROXY_TARGET || 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'motion/react': 'framer-motion',
      '@designcodeio/threeui/style.css': path.resolve(
        __dirname,
        'src/shaders/threeui.css',
      ),
      '@designcodeio/threeui': path.resolve(
        __dirname,
        'src/shaders/index.ts',
      ),
    },
  },
})
