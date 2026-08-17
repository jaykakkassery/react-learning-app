import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // During development, forward any request starting with /api to Express.
    // This means the React app can call fetch('/api/hotels') and Vite
    // transparently routes it to http://localhost:3001/api/hotels.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
