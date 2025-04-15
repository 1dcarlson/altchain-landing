// Simple startup script for the contact form server
// Run with: node start-contact-server.js

import { exec } from 'child_process';

// Run typescript directly with tsx
exec('npx tsx server/contact-server.ts', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});