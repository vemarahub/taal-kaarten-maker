import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  define: {
    'import.meta.env.VITE_AUTH_USERNAME': '"testuser"',
    'import.meta.env.VITE_AUTH_PASSWORD_HASH': '"13d249f2cb4127b40cfa757866850278793f814ded3c587fe5889e889a7a9f6c"',
    'import.meta.env.VITE_SESSION_DURATION': '"24"',
    'import.meta.env.DEV': 'true',
    'import.meta.env.PROD': 'false'
  }
});