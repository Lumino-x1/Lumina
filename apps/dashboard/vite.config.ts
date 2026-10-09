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
    host: true,

    // Allow requests coming through ngrok
    allowedHosts: true,

    proxy: {
      '/api/unsplash': {
        target: 'https://unsplash.com/napi',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/unsplash/, ''),
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'application/json',
        },
      },

      '/api': {
        target: 'http://localhost:3002',
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
