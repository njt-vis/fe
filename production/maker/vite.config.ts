import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { htmlPlugin } from './vite-plugins/html-plugin';

export default defineConfig({
  plugins: [solidPlugin(), htmlPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
