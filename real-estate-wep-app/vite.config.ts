import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'src/assets/client/*', dest: 'client' },
        { src: 'src/assets/admin/*', dest: 'admin' }
      ]
    })
  ],
  css: {
    devSourcemap: false,
  },
});