
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // Menggunakan fungsi untuk menghindari error jika process.env kosong saat build awal
  define: {
    'process.env': JSON.stringify(process.env)
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
