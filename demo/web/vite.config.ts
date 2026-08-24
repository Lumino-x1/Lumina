import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repoRoot = path.resolve(import.meta.dirname, '../..')

// https://vite.dev/config/
export default defineConfig({
  envDir: repoRoot,
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_AUTH_SERVER_URL ?? 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
