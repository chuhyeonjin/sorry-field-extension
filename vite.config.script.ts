import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve('./src'),
  build: {
    outDir: resolve('dist'),
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: '[name].js',
      },
      input: resolve(__dirname, './src/contentScript.ts'),
    },
  },
});
