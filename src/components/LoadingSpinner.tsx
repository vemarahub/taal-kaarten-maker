import React from 'react';
import { Loader2, Shield, Clock, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'auth' | 'session' | 'page';
  message?: string;
  className?: string;
  showProgress?: boolean;
}

/**
 * Comprehensive loading spinner component with different variants
 * for different authentication and application states
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  message,
  className,
  showProgress = false
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const getIcon = () => {
    switch (variant) {
      case 'auth':
        return <Shield className={cn(sizeClasses[size], 'text-primary')} />;
      case 'session':
        return <Clock className={cn(sizeClasses[size], 'text-amber-500')} />;
      case 'page':
        return <RefreshCw className={cn(sizeClasses[size], 'text-primary animate-spin')} />;
      default:
        return <Loader2 className={cn(sizeClasses[size], 'animate-spin text-primary')} />;
    }
  };

  const getDefaultMessage = () => {
    switch (variant) {
      case 'auth':
        return 'Verifying your access...';
      case 'session':
        return 'Checking session...';
      case 'page':
        return 'Loading page...';
      default:
        return 'Loading...';
    }
  };

  const displayMessage = message || getDefaultMessage();

  if (variant === 'page') {
    return (
      <div className={cn(
        "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50",
        className
      )}>
        <div className="flex flex-col items-center space-y-4 max-w-md mx-auto p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
            {getIcon()}
          </div>
          <div className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">{displayMessage}</p>
          </div>
          {showProgress && (
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-primary h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {getIcon()}
      {displayMessage && (
        <span className="text-sm text-muted-foreground">{displayMessage}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;