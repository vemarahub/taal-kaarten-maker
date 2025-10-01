import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock ResizeObserver for Radix UI components
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock environment variables for testing
vi.stubGlobal('import.meta', {
  env: {
    VITE_AUTH_USERNAME: 'testuser',
    VITE_AUTH_PASSWORD_HASH: '13d249f2cb4127b40cfa757866850278793f814ded3c587fe5889e889a7a9f6c', // SHA-256 of 'testpass'
    VITE_SESSION_DURATION: '24',
    DEV: true,
    PROD: false
  }
});