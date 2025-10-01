import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    devSourcemap: true
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    // THÊM PHẦN NÀY - quan trọng hơn
    hmr: {
      overlay: true
    }
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  
  // Thêm phần này
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router']
        }
      }
    }
  },
  
  // Optimze deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router']
  }
});