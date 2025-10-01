import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

/**
 * Production-ready error boundary specifically for authentication components
 * Provides specialized error handling for auth-related failures
 */
class AuthErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error for monitoring
    console.error('AuthErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // In a real app, this would send to an error reporting service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: 'anonymous', // Could be actual user ID if available
      context: 'authentication'
    };

    // Mock error reporting - replace with actual service
    console.warn('Error report (would be sent to monitoring service):', errorReport);
  };

  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1
      }));
    }
  };

  handleGoToLogin = () => {
    // Clear any stored auth state that might be corrupted
    try {
      localStorage.removeItem('dutch_app_session');
      localStorage.removeItem('dutch_app_encryption_key');
    } catch (error) {
      console.warn('Failed to clear auth storage:', error);
    }

    // Navigate to login
    window.location.href = '/login';
  };

  private isAuthRelatedError = (error: Error): boolean => {
    const authKeywords = [
      'auth', 'login', 'session', 'credential', 'token',
      'permission', 'unauthorized', 'forbidden'
    ];
    
    const errorMessage = error.message.toLowerCase();
    const errorStack = error.stack?.toLowerCase() || '';
    
    return authKeywords.some(keyword => 
      errorMessage.includes(keyword) || errorStack.includes(keyword)
    );
  };

  private getErrorSeverity = (error: Error): 'low' | 'medium' | 'high' => {
    if (this.isAuthRelatedError(error)) return 'high';
    if (error.name === 'ChunkLoadError') return 'medium';
    if (error.message.includes('Network')) return 'medium';
    return 'low';
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isAuthError = this.isAuthRelatedError(this.state.error);
      const canRetry = this.state.retryCount < this.maxRetries;
      const severity = this.getErrorSeverity(this.state.error);

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg border-destructive/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </div>
                <CardTitle className="text-destructive">
                  {isAuthError ? 'Authentication Error' : 'Something went wrong'}
                </CardTitle>
                <CardDescription>
                  {isAuthError 
                    ? 'There was a problem with the authentication system.'
                    : 'An unexpected error occurred in the application.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Error Details (only in development) */}
                {process.env.NODE_ENV === 'development' && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-xs font-mono">
                      <strong>Error:</strong> {this.state.error.message}
                      <br />
                      <strong>Severity:</strong> {severity}
                      <br />
                      <strong>Retry Count:</strong> {this.state.retryCount}/{this.maxRetries}
                      {this.state.errorInfo && (
                        <details className="mt-2">
                          <summary className="cursor-pointer">Stack trace</summary>
                          <pre className="mt-2 text-xs overflow-auto max-h-32">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </details>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* User-friendly error message */}
                <Alert>
                  <AlertDescription>
                    {isAuthError 
                      ? 'Your authentication session may have been corrupted. Please try logging in again.'
                      : 'Don\'t worry - your data is safe. You can try refreshing or return to the login page.'
                    }
                  </AlertDescription>
                </Alert>

                {/* Retry information */}
                {!canRetry && this.state.retryCount > 0 && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Maximum retry attempts reached. Please refresh the page or contact support.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {canRetry && (
                    <Button 
                      onClick={this.handleRetry}
                      className="flex-1"
                      variant="default"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again ({this.maxRetries - this.state.retryCount} left)
                    </Button>
                  )}
                  <Button 
                    onClick={this.handleGoToLogin}
                    className="flex-1"
                    variant={canRetry ? "outline" : "default"}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    {isAuthError ? 'Go to Login' : 'Start Over'}
                  </Button>
                </div>

                {/* Additional help */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>If this problem persists, please try:</p>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• Clearing your browser cache and cookies</li>
                    <li>• Disabling browser extensions temporarily</li>
                    <li>• Using an incognito/private browsing window</li>
                    {isAuthError && <li>• Checking your internet connection</li>}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AuthErrorBoundary;