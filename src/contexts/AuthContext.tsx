import React, { createContext, useContext, useReducer, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { AuthContextType, AuthStatus, User, AuthState, AuthErrorType, AuthError, AuthAction, AuthProviderProps } from '../types/auth';
import { authService } from '../services/AuthService';
import { sessionManager } from '../services/SessionManager';
import { toast } from '../components/ui/use-toast';

// Initial authentication state
const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true, // Start with loading true for session restoration
  user: null,
  error: null,
  sessionExpiry: null,
  isSessionExpiringSoon: false
};

// Authentication reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        sessionExpiry: action.payload.sessionExpiry,
        error: null
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        sessionExpiry: null,
        error: action.payload.error
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        sessionExpiry: null,
        error: null
      };

    case 'RESTORE_SESSION_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case 'RESTORE_SESSION_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        sessionExpiry: action.payload.sessionExpiry,
        error: null
      };

    case 'RESTORE_SESSION_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        sessionExpiry: null,
        error: action.payload.error || null
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading
      };

    case 'SESSION_EXPIRING_SOON':
      return {
        ...state,
        isSessionExpiringSoon: action.payload.isExpiringSoon
      };

    case 'EXTEND_SESSION_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case 'EXTEND_SESSION_SUCCESS':
      return {
        ...state,
        sessionExpiry: action.payload.sessionExpiry,
        isSessionExpiringSoon: false,
        isLoading: false,
        error: null
      };

    case 'EXTEND_SESSION_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};

// Create the authentication context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: async () => false,
  logout: () => {},
  error: null,
  status: AuthStatus.IDLE,
  sessionExpiry: null,
  extendSession: async () => false,
  isSessionExpiringSoon: false
});

// Remove local interface since it's now imported from types

// Helper function to create AuthError objects
const createAuthError = (type: AuthErrorType, message: string): AuthError => ({
  type,
  message,
  timestamp: new Date()
});

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, onError }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Memoized status derivation for performance
  const status = useMemo((): AuthStatus => {
    if (state.isLoading) return AuthStatus.LOADING;
    if (state.error) return AuthStatus.ERROR;
    if (state.isAuthenticated) return AuthStatus.AUTHENTICATED;
    return AuthStatus.UNAUTHENTICATED;
  }, [state.isLoading, state.error, state.isAuthenticated]);

  // Memoized error handler
  const handleError = useCallback((error: AuthError) => {
    onError?.(error);
  }, [onError]);

  // Optimized login function with useCallback
  const login = useCallback(async (username: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Validate credentials
      const isValid = await authService.validateCredentials(username, password);
      
      if (!isValid) {
        const error = createAuthError(
          AuthErrorType.INVALID_CREDENTIALS,
          'Invalid username or password. Please check your credentials and try again.'
        );
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: { error }
        });
        
        // Show error toast
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message,
        });
        
        return false;
      }

      // Create user object
      const user: User = {
        username,
        loginTime: new Date()
      };

      // Calculate session expiry (use PWA-specific duration if in PWA mode)
      const sessionExpiry = sessionManager.isPWAMode() 
        ? authService.calculatePWASessionExpiry()
        : authService.calculateSessionExpiry();

      // Store session if remember me is enabled
      if (rememberMe && sessionManager.isStorageAvailable()) {
        try {
          const sessionHash = await authService.generateSessionHash(username, password);
          await sessionManager.storeSession({
            username,
            hashedCredentials: sessionHash,
            loginTime: user.loginTime.toISOString(),
            expiryTime: sessionExpiry.toISOString(),
            rememberMe: true
          });
        } catch (error) {
          console.warn('Failed to store session for remember me:', error);
          // Show warning toast but continue with login
          toast({
            variant: "default",
            title: "Session Storage Warning",
            description: "Unable to save login for next time, but you're still logged in.",
          });
        }
      }

      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user, sessionExpiry }
      });

      // Show success toast
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${username}`,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      const authError = createAuthError(
        AuthErrorType.NETWORK_ERROR,
        'Unable to connect to authentication service. Please check your connection and try again.'
      );
      
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: { error: authError }
      });
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: authError.message,
      });
      
      return false;
    }
  }, [handleError]);

  // Optimized logout function with useCallback
  const logout = useCallback((): void => {
    try {
      // Clear stored session
      sessionManager.clearSession();
      
      // Update state
      dispatch({ type: 'LOGOUT' });
      
      // Show success toast
      toast({
        title: "Logged out successfully",
        description: "You have been securely logged out of your account.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      
      // Still dispatch logout even if session clearing fails
      dispatch({ type: 'LOGOUT' });
      
      // Show warning toast
      toast({
        variant: "default",
        title: "Logged out",
        description: "You have been logged out, but there may have been an issue clearing stored data.",
      });
    }
  }, []);

  // Session restoration function
  const restoreSession = async (): Promise<void> => {
    dispatch({ type: 'RESTORE_SESSION_START' });

    try {
      // Check if session storage is available
      if (!sessionManager.isStorageAvailable()) {
        dispatch({ type: 'RESTORE_SESSION_FAILURE', payload: {} });
        return;
      }

      // Check if there's a valid session
      const isValid = await sessionManager.isSessionValid();
      if (!isValid) {
        dispatch({ type: 'RESTORE_SESSION_FAILURE', payload: {} });
        return;
      }

      // Get session data
      const session = await sessionManager.getSession();
      if (!session) {
        dispatch({ type: 'RESTORE_SESSION_FAILURE', payload: {} });
        return;
      }

      // Create user object from session
      const user: User = {
        username: session.username,
        loginTime: new Date(session.loginTime)
      };

      const sessionExpiry = new Date(session.expiryTime);

      dispatch({ 
        type: 'RESTORE_SESSION_SUCCESS', 
        payload: { user, sessionExpiry }
      });

      // Show welcome back toast for restored sessions
      toast({
        title: "Welcome back!",
        description: `Automatically signed in as ${user.username}`,
      });
    } catch (error) {
      console.error('Session restoration error:', error);
      
      // Create appropriate error based on the type of failure
      const authError = createAuthError(
        AuthErrorType.STORAGE_ERROR,
        'Failed to restore your previous session. Please log in again.'
      );
      
      // Clear potentially corrupted session
      try {
        sessionManager.clearSession();
      } catch (clearError) {
        console.error('Failed to clear corrupted session:', clearError);
      }
      
      dispatch({ 
        type: 'RESTORE_SESSION_FAILURE', 
        payload: { error: authError }
      });
    }
  };

  // Optimized session extension function with useCallback
  const extendSession = useCallback(async (): Promise<boolean> => {
    dispatch({ type: 'EXTEND_SESSION_START' });
    
    try {
      if (!state.isAuthenticated || !state.sessionExpiry) {
        const error = createAuthError(
          AuthErrorType.SESSION_EXPIRED,
          'No active session to extend. Please log in again.'
        );
        dispatch({ 
          type: 'EXTEND_SESSION_FAILURE', 
          payload: { error }
        });
        return false;
      }

      // Calculate new session expiry
      const newSessionExpiry = sessionManager.isPWAMode() 
        ? authService.calculatePWASessionExpiry()
        : authService.calculateSessionExpiry();

      // Update stored session if it exists
      if (sessionManager.isStorageAvailable()) {
        try {
          await sessionManager.extendSession(newSessionExpiry);
        } catch (error) {
          console.warn('Failed to extend stored session:', error);
          // Show warning toast but continue with in-memory session extension
          toast({
            variant: "default",
            title: "Session Extension Warning",
            description: "Session extended in memory, but couldn't update stored session.",
          });
        }
      }

      // Update in-memory session
      dispatch({ 
        type: 'EXTEND_SESSION_SUCCESS', 
        payload: { sessionExpiry: newSessionExpiry }
      });

      // Show success toast
      toast({
        title: "Session Extended",
        description: "Your session has been successfully extended.",
      });

      return true;
    } catch (error) {
      console.error('Session extension error:', error);
      const authError = createAuthError(
        AuthErrorType.UNKNOWN_ERROR,
        'Failed to extend session. Please log in again.'
      );
      
      dispatch({ 
        type: 'EXTEND_SESSION_FAILURE', 
        payload: { error: authError }
      });
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Session Extension Failed",
        description: authError.message,
      });
      
      return false;
    }
  }, [state.isAuthenticated, state.sessionExpiry]);

  // Effect for session restoration on mount
  useEffect(() => {
    restoreSession();
  }, []);

  // Effect for PWA visibility change handling (mobile app switching)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && state.isAuthenticated) {
        // App became visible, check if session is still valid
        try {
          const isValid = await sessionManager.isSessionValid();
          if (!isValid) {
            console.log('Session expired while app was in background, logging out');
            logout();
          }
        } catch (error) {
          console.error('Error checking session validity on app focus:', error);
        }
      }
    };

    // Handle PWA app lifecycle events
    const handleAppInstalled = () => {
      console.log('PWA installed - enabling persistent login features');
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      // Store the event for later use if needed
      console.log('PWA install prompt available');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [state.isAuthenticated]);

  // Effect for session expiry monitoring and renewal prompts
  useEffect(() => {
    if (!state.isAuthenticated || !state.sessionExpiry) {
      // Clear expiring soon flag if not authenticated
      if (state.isSessionExpiringSoon) {
        dispatch({ type: 'SESSION_EXPIRING_SOON', payload: { isExpiringSoon: false } });
      }
      return;
    }

    const checkSessionExpiry = () => {
      const now = new Date();
      const sessionExpiry = state.sessionExpiry!;
      const timeUntilExpiry = sessionExpiry.getTime() - now.getTime();
      
      // Session has expired
      if (timeUntilExpiry <= 0) {
        console.log('Session expired, logging out');
        logout();
        return;
      }

      // Session is expiring soon (within 5 minutes)
      const fiveMinutesInMs = 5 * 60 * 1000;
      const isExpiringSoon = timeUntilExpiry <= fiveMinutesInMs;
      
      // Update expiring soon flag if it has changed
      if (isExpiringSoon !== state.isSessionExpiringSoon) {
        dispatch({ 
          type: 'SESSION_EXPIRING_SOON', 
          payload: { isExpiringSoon }
        });
        
        if (isExpiringSoon) {
          console.log(`Session expiring in ${Math.ceil(timeUntilExpiry / 60000)} minutes`);
        }
      }
    };

    // Check immediately
    checkSessionExpiry();

    // Set up interval to check every 30 seconds for more responsive expiry warnings
    const interval = setInterval(checkSessionExpiry, 30000);

    return () => clearInterval(interval);
  }, [state.isAuthenticated, state.sessionExpiry, state.isSessionExpiringSoon]);

  // Memoized context value for performance
  const contextValue = useMemo((): AuthContextType => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    user: state.user,
    login,
    logout,
    error: state.error,
    status,
    sessionExpiry: state.sessionExpiry,
    extendSession,
    isSessionExpiringSoon: state.isSessionExpiringSoon
  }), [
    state.isAuthenticated,
    state.isLoading,
    state.user,
    state.error,
    state.sessionExpiry,
    state.isSessionExpiringSoon,
    status,
    login,
    logout,
    extendSession
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
export default AuthContext;