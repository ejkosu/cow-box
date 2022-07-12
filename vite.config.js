import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      // overwrite default index.html entry
      input: '/src/main.jsx',
      output: {
        assetFileNames: "bundles/[name]-[hash][extname]",
        entryFileNames: "bundles/[name]-[hash].js"
      }
    }
  }
})
