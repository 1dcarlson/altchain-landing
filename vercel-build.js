// This script prepares the vite.config.ts file for Vercel deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function prepareForVercel() {
  try {
    // Read the package.json to add necessary build script
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Ensure the build script exists and is correct
    if (!packageJson.scripts || !packageJson.scripts.build) {
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts.build = 'vite build';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Added build script to package.json');
    }
    
    // Create temporary vite.config.js for Vercel that uses __dirname
    const viteConfigPath = path.join(__dirname, 'vite.config.vercel.js');
    const viteConfig = `
      import { defineConfig } from 'vite';
      import react from '@vitejs/plugin-react';
      import path from 'path';
      
      export default defineConfig({
        plugins: [react()],
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './client/src'),
            '@shared': path.resolve(__dirname, './shared'),
            '@assets': path.resolve(__dirname, './attached_assets'),
          },
        },
        root: path.resolve(__dirname, 'client'),
        build: {
          outDir: path.resolve(__dirname, 'dist/public'),
          emptyOutDir: true,
        },
      });
    `;
    
    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log('Created Vercel-compatible vite config');
    
    return true;
  } catch (error) {
    console.error('Error preparing for Vercel:', error);
    return false;
  }
}

prepareForVercel();
