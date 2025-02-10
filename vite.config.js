import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Define the config without any additional plugins
export default defineConfig({
  plugins: [react()],
  base: "/"
});

