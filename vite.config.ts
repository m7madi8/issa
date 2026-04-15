import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  server: {
    /** Listen on LAN — use the “Network” URL from the terminal on your phone (same Wi‑Fi). */
    host: true,
    port: 5173,
    strictPort: false,
  },
  resolve: {
    alias: {
      '@heroui/react': fileURLToPath(new URL('./src/vendor/heroui-react.tsx', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
