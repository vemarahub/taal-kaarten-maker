import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component that wraps routes requiring authentication
 * 
 * Features:
 * - Checks authentication status before rendering children
 * - Redirects unauthenticated users to login page
 * - Preserves intended destination for post-login navigation
 * - Handles loading states during authentication checks
 * - Responds to authentication state changes
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, error, status } = useAuth();
  const location = useLocation();

  // Show loading spinner while authentication status is being determined
  if (isLoading) {
    return (
      <LoadingSpinner 
        variant="auth" 
        size="lg" 
        message="Verifying your access..." 
        showProgress={true}
      />
    );
  }

  // Show error state if there's an authentication error
  if (error && status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
        <div className="max-w-md mx-auto">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              <strong>Authentication Error:</strong> {error.message}
            </AlertDescription>
          </Alert>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Redirecting to login page...
            </p>
            <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page with return URL
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;