import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      // Enable TypeScript checking
      typescript: true,
    }),
  ],
  server: {
    // Enable faster reloading
    hmr: {
      overlay: true,
    },
    // Watch for changes in these directories
    watch: {
      usePolling: true,
    },
  },
})
