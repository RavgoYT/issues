import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // For dev: any unknown route serves index.html (SPA fallback)
    historyApiFallback: true,
  },
})