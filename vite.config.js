import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Optimize for production
      jsxRuntime: 'automatic',
    }),
    tailwindcss()
  ],
  build: {
    // Optimize build
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'framer-motion']
        }
      }
    },
    // Enable source maps for debugging
    sourcemap: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  server: {
    // Enable HMR
    hmr: true,
    // Optimize dev server
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    // Pre-bundle dependencies
    include: [
      'react',
      'react-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'react-router-dom',
      'lucide-react',
      'framer-motion'
    ]
  }
})
