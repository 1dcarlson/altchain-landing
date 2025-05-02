// This script prepares a Vercel-specific Vite configuration
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const viteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'client',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
      '@assets': path.resolve(__dirname, 'attached_assets')
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  plugins: [react()]
});
`;

// Write to a new vite config file for Vercel
fs.writeFileSync(path.join(__dirname, 'vite.config.vercel.js'), viteConfig);

// Patch package.json if needed
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
if (!packageJson.scripts) packageJson.scripts = {};
packageJson.scripts.build = "vite build --config vite.config.vercel.js";
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ Vercel-specific build configuration generated');
