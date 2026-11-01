import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `vite preview` serves the same security headers as production (vercel.json),
// so CSP regressions show up locally before deploy.
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf-8'))
const productionHeaders = Object.fromEntries(
  vercel.headers.find((h) => h.source === '/(.*)').headers.map(({ key, value }) => [key, value]),
)

export default defineConfig({
  plugins: [react()],
  preview: {
    headers: productionHeaders,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          motion: ['framer-motion'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
