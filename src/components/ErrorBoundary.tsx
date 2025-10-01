import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in the child
 * component tree and displays a fallback UI instead of crashing the entire app
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console and any error reporting service
    console.error('🚨 ErrorBoundary caught an error:', error, errorInfo);
    console.error('🔍 Error stack:', error.stack);
    console.error('🧩 Component stack:', errorInfo.componentStack);

    this.setState({
      error,
      errorInfo
    });

    // Here you could send the error to an error reporting service
    // Example: errorReportingService.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    // Reset the error boundary state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleGoHome = () => {
    // Reset error state and navigate to home
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
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
                <CardTitle className="text-destructive">Something went wrong</CardTitle>
                <CardDescription>
                  An unexpected error occurred in the application. This has been logged for investigation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Error Details (only in development) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-xs font-mono">
                      <strong>Error:</strong> {this.state.error.message}
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
                    Don't worry - your data is safe. You can try refreshing the page or return to the home page.
                  </AlertDescription>
                </Alert>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={this.handleRetry}
                    className="flex-1"
                    variant="default"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button
                    onClick={this.handleGoHome}
                    className="flex-1"
                    variant="outline"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Button>
                </div>

                {/* Additional help */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>If this problem persists, please try:</p>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• Refreshing your browser</li>
                    <li>• Clearing your browser cache</li>
                    <li>• Checking your internet connection</li>
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

export default ErrorBoundary;