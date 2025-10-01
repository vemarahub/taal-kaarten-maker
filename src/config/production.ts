/**
 * Production configuration for authentication system
 * Handles environment-specific settings and optimizations
 */

export interface ProductionConfig {
  readonly enableErrorReporting: boolean;
  readonly enablePerformanceMonitoring: boolean;
  readonly enableDebugMode: boolean;
  readonly sessionTimeout: number;
  readonly maxRetryAttempts: number;
  readonly cacheTimeout: number;
}

/**
 * Production configuration settings
 */
export const productionConfig: ProductionConfig = {
  // Error reporting (would integrate with services like Sentry)
  enableErrorReporting: process.env.NODE_ENV === 'production',
  
  // Performance monitoring
  enablePerformanceMonitoring: process.env.NODE_ENV === 'production',
  
  // Debug mode (only in development)
  enableDebugMode: process.env.NODE_ENV === 'development',
  
  // Session timeout in milliseconds (24 hours)
  sessionTimeout: 24 * 60 * 60 * 1000,
  
  // Maximum retry attempts for failed operations
  maxRetryAttempts: 3,
  
  // Cache timeout for authentication state (5 minutes)
  cacheTimeout: 5 * 60 * 1000
};

/**
 * Error reporting service interface
 * In production, this would integrate with services like Sentry, LogRocket, etc.
 */
export interface ErrorReportingService {
  captureException(error: Error, context?: Record<string, any>): void;
  captureMessage(message: string, level?: 'info' | 'warning' | 'error'): void;
  setUser(user: { id: string; username?: string }): void;
  addBreadcrumb(breadcrumb: { message: string; category?: string; level?: string }): void;
}

/**
 * Mock error reporting service for development
 * Replace with actual service integration in production
 */
class MockErrorReportingService implements ErrorReportingService {
  captureException(error: Error, context?: Record<string, any>): void {
    if (productionConfig.enableErrorReporting) {
      console.error('Error captured:', error, context);
      // In production: send to actual error reporting service
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
    if (productionConfig.enableErrorReporting) {
      console[level]('Message captured:', message);
      // In production: send to actual error reporting service
    }
  }

  setUser(user: { id: string; username?: string }): void {
    if (productionConfig.enableErrorReporting) {
      console.info('User context set:', user);
      // In production: set user context in error reporting service
    }
  }

  addBreadcrumb(breadcrumb: { message: string; category?: string; level?: string }): void {
    if (productionConfig.enableErrorReporting) {
      console.debug('Breadcrumb added:', breadcrumb);
      // In production: add breadcrumb to error reporting service
    }
  }
}

/**
 * Performance monitoring service interface
 */
export interface PerformanceMonitoringService {
  startTransaction(name: string): void;
  finishTransaction(): void;
  recordMetric(name: string, value: number): void;
}

/**
 * Mock performance monitoring service
 * Replace with actual service integration in production
 */
class MockPerformanceMonitoringService implements PerformanceMonitoringService {
  private startTime: number = 0;

  startTransaction(name: string): void {
    if (productionConfig.enablePerformanceMonitoring) {
      this.startTime = performance.now();
      console.time(name);
    }
  }

  finishTransaction(): void {
    if (productionConfig.enablePerformanceMonitoring) {
      const duration = performance.now() - this.startTime;
      console.timeEnd('transaction');
      console.info(`Transaction completed in ${duration.toFixed(2)}ms`);
    }
  }

  recordMetric(name: string, value: number): void {
    if (productionConfig.enablePerformanceMonitoring) {
      console.info(`Metric recorded: ${name} = ${value}`);
      // In production: send to actual performance monitoring service
    }
  }
}

// Export singleton instances
export const errorReporting = new MockErrorReportingService();
export const performanceMonitoring = new MockPerformanceMonitoringService();

/**
 * Production utilities for authentication system
 */
export const productionUtils = {
  /**
   * Log authentication events for monitoring
   */
  logAuthEvent(event: string, details?: Record<string, any>): void {
    if (productionConfig.enableDebugMode) {
      console.info(`Auth Event: ${event}`, details);
    }
    
    errorReporting.addBreadcrumb({
      message: `Authentication: ${event}`,
      category: 'auth',
      level: 'info'
    });
  },

  /**
   * Measure authentication operation performance
   */
  measureAuthOperation<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    return new Promise(async (resolve, reject) => {
      performanceMonitoring.startTransaction(`auth_${operation}`);
      
      try {
        const result = await fn();
        performanceMonitoring.finishTransaction();
        resolve(result);
      } catch (error) {
        performanceMonitoring.finishTransaction();
        errorReporting.captureException(error as Error, { operation });
        reject(error);
      }
    });
  },

  /**
   * Sanitize sensitive data for logging
   */
  sanitizeForLogging(data: Record<string, any>): Record<string, any> {
    const sensitiveKeys = ['password', 'token', 'hash', 'secret', 'key'];
    const sanitized = { ...data };
    
    Object.keys(sanitized).forEach(key => {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      }
    });
    
    return sanitized;
  }
};