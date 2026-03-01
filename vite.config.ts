import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'cbc8-2405-201-2003-c0bb-7570-ee6-d7db-92f4.ngrok-free.app',
      '.ngrok-free.app',  // Allow all ngrok subdomains
      '.ngrok.io',        // Allow all ngrok.io domains
    ]
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Chunk three.js separately
          if (id.includes('node_modules/three')) {
            return 'three';
          }
          // Chunk React separately
          if (id.includes('node_modules/react')) {
            return 'react';
          }
          // Chunk Supabase separately
          if (id.includes('node_modules/@supabase')) {
            return 'supabase';
          }
        }
      }
    }
  },
  define: {
    'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
  }
})
