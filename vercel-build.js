import { writeFileSync } from 'fs';
import path from 'path';

const config = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'client',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@assets': path.resolve(__dirname, './attached_assets'),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
`;

writeFileSync('vite.config.vercel.js', config);