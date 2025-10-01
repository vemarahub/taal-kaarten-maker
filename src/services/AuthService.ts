import { AuthConfig, AuthError, AuthErrorType, IAuthService } from '../types/auth';

/**
 * Core authentication service that handles credential validation
 * and secure password operations for session storage
 */
export class AuthService implements IAuthService {
  private config: AuthConfig;

  constructor() {
    try {
      this.config = this.loadEnvironmentConfig();
    } catch (error) {
      console.error('Failed to initialize AuthService:', error);
      throw error;
    }
  }

  /**
   * Load authentication configuration from environment variables
   */
  private loadEnvironmentConfig(): AuthConfig {
    const username = import.meta.env.VITE_AUTH_USERNAME;
    const passwordHash = import.meta.env.VITE_AUTH_PASSWORD_HASH;
    const sessionDuration = import.meta.env.VITE_SESSION_DURATION || '24';

    if (!username || !passwordHash) {
      throw new Error('Authentication configuration missing. Please set VITE_AUTH_USERNAME and VITE_AUTH_PASSWORD_HASH environment variables.');
    }

    return {
      VITE_AUTH_USERNAME: username,
      VITE_AUTH_PASSWORD_HASH: passwordHash,
      VITE_SESSION_DURATION: sessionDuration
    };
  }

  /**
   * Validate user credentials against environment configuration
   */
  async validateCredentials(username: string, password: string): Promise<boolean> {
    try {
      // Input validation
      if (!username || !password) {
        return false;
      }

      if (typeof username !== 'string' || typeof password !== 'string') {
        return false;
      }

      // Validate username
      if (username !== this.config.VITE_AUTH_USERNAME) {
        return false;
      }

      // Hash the provided password and compare with stored hash
      const hashedPassword = await this.hashPassword(password);
      return hashedPassword === this.config.VITE_AUTH_PASSWORD_HASH;
    } catch (error) {
      console.error('Credential validation error:', error);
      throw new Error('Failed to validate credentials due to system error');
    }
  }

  /**
   * Create specific AuthError objects for different scenarios
   */
  createAuthError(type: AuthErrorType, message: string): AuthError {
    return {
      type,
      message,
      timestamp: new Date()
    };
  }

  /**
   * Get user-friendly error message for different error types
   */
  getErrorMessage(errorType: AuthErrorType): string {
    switch (errorType) {
      case AuthErrorType.INVALID_CREDENTIALS:
        return 'Invalid username or password. Please check your credentials and try again.';
      case AuthErrorType.NETWORK_ERROR:
        return 'Unable to connect to authentication service. Please check your internet connection and try again.';
      case AuthErrorType.SESSION_EXPIRED:
        return 'Your session has expired. Please log in again to continue.';
      case AuthErrorType.STORAGE_ERROR:
        return 'Unable to save your login information. You may need to log in again next time.';
      case AuthErrorType.UNKNOWN_ERROR:
      default:
        return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
    }
  }

  /**
   * Hash password using Web Crypto API for secure storage
   */
  async hashPassword(password: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      throw new Error('Failed to hash password');
    }
  }

  /**
   * Generate secure hash for session storage
   */
  async generateSessionHash(username: string, password: string): Promise<string> {
    try {
      const combinedData = `${username}:${password}:${Date.now()}`;
      return await this.hashPassword(combinedData);
    } catch (error) {
      throw new Error('Failed to generate session hash');
    }
  }

  /**
   * Get session duration in milliseconds
   */
  getSessionDuration(): number {
    const hours = parseInt(this.config.VITE_SESSION_DURATION, 10);
    return hours * 60 * 60 * 1000; // Convert hours to milliseconds
  }

  /**
   * Calculate session expiry time
   */
  calculateSessionExpiry(): Date {
    const now = new Date();
    const duration = this.getSessionDuration();
    return new Date(now.getTime() + duration);
  }

  /**
   * Calculate PWA-specific session expiry time
   */
  calculatePWASessionExpiry(): Date {
    const now = new Date();
    // Import sessionManager to check PWA mode
    const { sessionManager } = require('./SessionManager');
    const duration = sessionManager.getPWASessionDuration();
    return new Date(now.getTime() + duration);
  }

  /**
   * Validate environment configuration
   */
  validateConfig(): boolean {
    try {
      return !!(
        this.config.VITE_AUTH_USERNAME &&
        this.config.VITE_AUTH_PASSWORD_HASH &&
        this.config.VITE_SESSION_DURATION
      );
    } catch {
      return false;
    }
  }

  /**
   * Get configuration for debugging (without sensitive data)
   */
  getConfigInfo(): { hasUsername: boolean; hasPasswordHash: boolean; sessionDuration: string } {
    return {
      hasUsername: !!this.config.VITE_AUTH_USERNAME,
      hasPasswordHash: !!this.config.VITE_AUTH_PASSWORD_HASH,
      sessionDuration: this.config.VITE_SESSION_DURATION
    };
  }
}

// Export singleton instance
export const authService = new AuthService();