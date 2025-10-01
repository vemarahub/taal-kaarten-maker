import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadEnvironmentConfig, validateEnvironmentConfig, getExampleConfig } from '../auth';

describe('Auth Configuration', () => {
  describe('loadEnvironmentConfig', () => {
    it('should load configuration from environment variables', () => {
      const config = loadEnvironmentConfig();
      
      expect(config.auth.VITE_AUTH_USERNAME).toBe('testuser');
      expect(config.auth.VITE_AUTH_PASSWORD_HASH).toBe('13d249f2cb4127b40cfa757866850278793f814ded3c587fe5889e889a7a9f6c');
      expect(config.auth.VITE_SESSION_DURATION).toBe('24');
      expect(config.isDevelopment).toBe(true);
      expect(config.isProduction).toBe(false);
    });

    it('should use default session duration when not provided', () => {
      // Mock environment without session duration
      vi.stubGlobal('import.meta', {
        env: {
          VITE_AUTH_USERNAME: 'testuser',
          VITE_AUTH_PASSWORD_HASH: '13d249f2cb4127b40cfa757866850278793f814ded3c587fe5889e889a7a9f6c',
          DEV: true,
          PROD: false
        }
      });

      const config = loadEnvironmentConfig();
      expect(config.auth.VITE_SESSION_DURATION).toBe('24');

      // Restore original env
      vi.stubGlobal('import.meta', {
        env: {
          VITE_AUTH_USERNAME: 'testuser',
          VITE_AUTH_PASSWORD_HASH: '13d249f2cb4127b40cfa757866850278793f814ded3c587fe5889e889a7a9f6c',
          VITE_SESSION_DURATION: '24',
          DEV: true,
          PROD: false
        }
      });
    });
  });

  describe('validateEnvironmentConfig', () => {
    it('should return no errors for valid configuration', () => {
      const config = loadEnvironmentConfig();
      const errors = validateEnvironmentConfig(config);
      
      expect(errors).toEqual([]);
    });

    it('should return error for missing username', () => {
      const config = {
        auth: {
          VITE_AUTH_USERNAME: '',
          VITE_AUTH_PASSWORD_HASH: 'hash',
          VITE_SESSION_DURATION: '24'
        },
        isProduction: false,
        isDevelopment: true
      };

      const errors = validateEnvironmentConfig(config);
      expect(errors).toContain('VITE_AUTH_USERNAME environment variable is required');
    });

    it('should return error for missing password hash', () => {
      const config = {
        auth: {
          VITE_AUTH_USERNAME: 'user',
          VITE_AUTH_PASSWORD_HASH: '',
          VITE_SESSION_DURATION: '24'
        },
        isProduction: false,
        isDevelopment: true
      };

      const errors = validateEnvironmentConfig(config);
      expect(errors).toContain('VITE_AUTH_PASSWORD_HASH environment variable is required');
    });

    it('should return error for invalid session duration', () => {
      const config = {
        auth: {
          VITE_AUTH_USERNAME: 'user',
          VITE_AUTH_PASSWORD_HASH: 'hash',
          VITE_SESSION_DURATION: 'invalid'
        },
        isProduction: false,
        isDevelopment: true
      };

      const errors = validateEnvironmentConfig(config);
      expect(errors).toContain('VITE_SESSION_DURATION must be a positive number');
    });

    it('should return error for negative session duration', () => {
      const config = {
        auth: {
          VITE_AUTH_USERNAME: 'user',
          VITE_AUTH_PASSWORD_HASH: 'hash',
          VITE_SESSION_DURATION: '-5'
        },
        isProduction: false,
        isDevelopment: true
      };

      const errors = validateEnvironmentConfig(config);
      expect(errors).toContain('VITE_SESSION_DURATION must be a positive number');
    });

    it('should return multiple errors for multiple issues', () => {
      const config = {
        auth: {
          VITE_AUTH_USERNAME: '',
          VITE_AUTH_PASSWORD_HASH: '',
          VITE_SESSION_DURATION: 'invalid'
        },
        isProduction: false,
        isDevelopment: true
      };

      const errors = validateEnvironmentConfig(config);
      expect(errors).toHaveLength(3);
      expect(errors).toContain('VITE_AUTH_USERNAME environment variable is required');
      expect(errors).toContain('VITE_AUTH_PASSWORD_HASH environment variable is required');
      expect(errors).toContain('VITE_SESSION_DURATION must be a positive number');
    });
  });

  describe('getExampleConfig', () => {
    it('should return example configuration', () => {
      const example = getExampleConfig();
      
      expect(example).toEqual({
        VITE_AUTH_USERNAME: 'admin',
        VITE_AUTH_PASSWORD_HASH: 'your-hashed-password-here',
        VITE_SESSION_DURATION: '24'
      });
    });
  });
});