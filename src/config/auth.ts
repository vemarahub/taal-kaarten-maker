import { AuthConfig } from '../types/auth';

/**
 * Environment variable configuration interface for authentication
 */
export interface EnvironmentConfig {
  auth: AuthConfig;
  isProduction: boolean;
  isDevelopment: boolean;
}

/**
 * Load and validate environment configuration
 */
export function loadEnvironmentConfig(): EnvironmentConfig {
  const auth: AuthConfig = {
    VITE_AUTH_USERNAME: import.meta.env.VITE_AUTH_USERNAME || '',
    VITE_AUTH_PASSWORD_HASH: import.meta.env.VITE_AUTH_PASSWORD_HASH || '',
    VITE_SESSION_DURATION: import.meta.env.VITE_SESSION_DURATION || '24'
  };

  const isProduction = import.meta.env.PROD;
  const isDevelopment = import.meta.env.DEV;

  return {
    auth,
    isProduction,
    isDevelopment
  };
}

/**
 * Validate required environment variables
 */
export function validateEnvironmentConfig(config: EnvironmentConfig): string[] {
  const errors: string[] = [];

  if (!config.auth.VITE_AUTH_USERNAME) {
    errors.push('VITE_AUTH_USERNAME environment variable is required');
  }

  if (!config.auth.VITE_AUTH_PASSWORD_HASH) {
    errors.push('VITE_AUTH_PASSWORD_HASH environment variable is required');
  }

  if (!config.auth.VITE_SESSION_DURATION) {
    errors.push('VITE_SESSION_DURATION environment variable is required');
  } else {
    const duration = parseInt(config.auth.VITE_SESSION_DURATION, 10);
    if (isNaN(duration) || duration <= 0) {
      errors.push('VITE_SESSION_DURATION must be a positive number');
    }
  }

  return errors;
}

/**
 * Get example environment configuration
 */
export function getExampleConfig(): Record<string, string> {
  return {
    VITE_AUTH_USERNAME: 'admin',
    VITE_AUTH_PASSWORD_HASH: 'your-hashed-password-here',
    VITE_SESSION_DURATION: '24'
  };
}