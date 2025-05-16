import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs'; 
import path from 'path'; 

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
  
      key: fs.readFileSync(path.resolve(__dirname, '../../certs/key.pem')), // Assuming certs is one level up from frontend
      cert: fs.readFileSync(path.resolve(__dirname, '../../certs/cert.pem')),
    },
    port: 5173, 

    proxy: {
      '/api': {
        target: 'https://localhost:8443',
        changeOrigin: true,
        secure: false, 
      
      }
    }
  }
});