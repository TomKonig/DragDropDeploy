import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Explicit Vite config so build script doesn't rely on implicit defaults.
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  }
});
