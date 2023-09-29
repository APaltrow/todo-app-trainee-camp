import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/todo-app-trainee-camp/',
  plugins: [react()],
  server: {
    open: true,
    host: true,
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@style': path.resolve(__dirname, './src/style'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
