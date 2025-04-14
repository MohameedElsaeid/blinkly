
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://api.blinkly.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'X-Forwarded-Proto': 'https',
          'X-Forwarded-Host': 'blinkly.app'
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' ? componentTagger() : undefined,
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Blinkly',
        short_name: 'Blinkly',
        description: 'URL Shortener & Link Management Platform',
        theme_color: '#5D5FEF',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
    mode === 'production' ? compression({
      algorithm: 'gzip',
      exclude: [/\.(br|gz)$/, /\.(png|jpe?g|gif|webp)$/i]
    }) : undefined,
    mode === 'production' ? visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    }) : undefined
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@tanstack/react-query',
            'axios',
            'framer-motion'
          ],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip'
          ]
        }
      }
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    'process.env.VITE_ENV': JSON.stringify(process.env.VITE_ENV),
    'process.env.VITE_CSRF_ENDPOINT': JSON.stringify(process.env.VITE_CSRF_ENDPOINT),
    'process.env.VITE_ALLOWED_ORIGINS': JSON.stringify(process.env.VITE_ALLOWED_ORIGINS)
  }
}));
