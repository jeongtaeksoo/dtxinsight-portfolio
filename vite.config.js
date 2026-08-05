import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'node:process'

const repositoryName = env.GITHUB_REPOSITORY?.split('/')[1]
const base = env.VITE_BASE_PATH || (repositoryName?.endsWith('.github.io')
  ? '/'
  : repositoryName
    ? `/${repositoryName}/`
    : '/')

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-i18next', 'i18next'],
          'animation-vendor': ['framer-motion'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
