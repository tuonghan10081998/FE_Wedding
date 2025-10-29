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
    hmr: {
      overlay: true
    }
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  
  // // SỬA PHẦN NÀY - bỏ manualChunks để gộp tất cả
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: undefined, // Tắt code splitting - gộp tất cả thành 1 file
  //     }
  //   },
  //   chunkSizeWarningLimit: 2000, // Tăng limit vì file sẽ lớn hơn
  // },
  
  // // Giữ nguyên optimizeDeps
  // optimizeDeps: {
  //   include: ['react', 'react-dom', 'react-router']
  // }
    build: {
    rollupOptions: {
      output: {
        // QUAY LẠI code splitting nhưng tối ưu hơn
        manualChunks: (id) => {
          // Tách vendor ra để cache lâu dài
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Các page nặng tách riêng
          if (id.includes('/PlanEditor/')) return 'plan-editor';
          if (id.includes('/StatisticsPage/')) return 'statistics';
        }
      }
    },
    
    // Minify code
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Xóa console.log
        drop_debugger: true,
        keep_classnames: true, // ✅ Giữ tên class
       keep_fnames: true,     // ✅ Giữ tên function
      }
    }
  },
  
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router']
  }
});