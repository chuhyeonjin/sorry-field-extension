import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
  root: resolve('./src'),
  build: {
    outDir: resolve('dist'),
    rollupOptions: {
      input: resolve(__dirname, './src/popup.html'),
    },
  },
  plugins: [svelte()],
});
