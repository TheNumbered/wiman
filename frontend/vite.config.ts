/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      components: 'src/components',
      hooks: 'src/hooks',
    },
  },
});
