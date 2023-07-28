import { defineConfig } from 'vite';
 export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      name: 'rocker-bulder',
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        // Specify the desired output directory and file name
        dir: 'dist',
        format: 'cjs',
        exports: 'auto',
      },
    },
  },
});