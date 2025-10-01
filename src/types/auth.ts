// Authentication types and interfaces

/**
 * User information interface
 */
export interface User {
  readonly username: string;
  readonly loginTime: Date;
}

/**
 * Complete authentication state interface
 */
export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly user: User | null;
  readonly error: AuthError | null;
  readonly sessionExpiry: Date | null;
  readonly isSessionExpiringSoon: boolean;
}

/**
 * Session data stored in localStorage
 */
export interface StoredSession {
  readonly username: string;
  readonly hashedCredentials: string;
  readonly loginTime: string;
  readonly expiryTime: string;
  readonly rememberMe: boolean;
}

/**
 * Environment configuration for authentication
 */
export interface AuthConfig {
  readonly VITE_AUTH_USERNAME: string;
  readonly VITE_AUTH_PASSWORD_HASH: string;
  readonly VITE_SESSION_DURATION: string; // in hours
}

/**
 * Authentication status enumeration
 */
export const enum AuthStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  ERROR = 'error'
}

/**
 * Error types for authentication operations
 */
export const enum AuthErrorType {
  INVALID_CREDENTIALS = 'invalid_credentials',
  NETWORK_ERROR = 'network_error',
  SESSION_EXPIRED = 'session_expired',
  STORAGE_ERROR = 'storage_error',
  UNKNOWN_ERROR = 'unknown_error'
}

/**
 * Authentication error interface
 */
export interface AuthError {
  readonly type: AuthErrorType;
  readonly message: string;
  readonly timestamp: Date;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  readonly username: string;
  readonly password: string;
  readonly rememberMe?: boolean;
}

/**
 * Session validation result
 */
export interface SessionValidationResult {
  readonly isValid: boolean;
  readonly session?: StoredSession;
  readonly error?: string;
}

/**
 * Authentication service interface
 */
export interface IAuthService {
  validateCredentials(username: string, password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  generateSessionHash(username: string, password: string): Promise<string>;
  calculateSessionExpiry(): Date;
  calculatePWASessionExpiry(): Date;
  getSessionDuration(): number;
  validateConfig(): boolean;
  createAuthError(type: AuthErrorType, message: string): AuthError;
  getErrorMessage(errorType: AuthErrorType): string;
}

/**
 * Session manager interface
 */
export interface ISessionManager {
  storeSession(sessionData: StoredSession): Promise<void>;
  getSession(): Promise<StoredSession | null>;
  isSessionValid(): Promise<boolean>;
  clearSession(): void;
  extendSession(newExpiryTime: Date): Promise<void>;
  getSessionExpiry(): Promise<Date | null>;
  isStorageAvailable(): boolean;
  isPWAMode(): boolean;
  getPWASessionDuration(): number;
  cleanupExpiredSessions(): Promise<void>;
}

/**
 * Authentication context interface
 */
export interface AuthContextType {
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly user: User | null;
  readonly error: AuthError | null;
  readonly status: AuthStatus;
  readonly sessionExpiry: Date | null;
  readonly isSessionExpiringSoon: boolean;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
  extendSession: () => Promise<boolean>;
}

/**
 * Authentication action types for reducer
 */
export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; sessionExpiry: Date } }
  | { type: 'LOGIN_FAILURE'; payload: { error: AuthError } }
  | { type: 'LOGOUT' }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'RESTORE_SESSION_START' }
  | { type: 'RESTORE_SESSION_SUCCESS'; payload: { user: User; sessionExpiry: Date } }
  | { type: 'RESTORE_SESSION_FAILURE'; payload: { error?: AuthError } }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean } }
  | { type: 'SESSION_EXPIRING_SOON'; payload: { isExpiringSoon: boolean } }
  | { type: 'EXTEND_SESSION_START' }
  | { type: 'EXTEND_SESSION_SUCCESS'; payload: { sessionExpiry: Date } }
  | { type: 'EXTEND_SESSION_FAILURE'; payload: { error: AuthError } };

/**
 * Protected route props interface
 */
export interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Auth provider props interface
 */
export interface AuthProviderProps {
  children: React.ReactNode;
  onError?: (error: AuthError) => void;
}

/**
 * Login form data interface
 */
export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Authentication metrics interface for monitoring
 */
export interface AuthMetrics {
  readonly loginAttempts: number;
  readonly successfulLogins: number;
  readonly failedLogins: number;
  readonly sessionExtensions: number;
  readonly logouts: number;
  readonly errors: Record<AuthErrorType, number>;
}

/**
 * Type guards for authentication types
 */
export const isAuthError = (error: unknown): error is AuthError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error &&
    'timestamp' in error &&
    Object.values(AuthErrorType).includes((error as AuthError).type)
  );
};

export const isUser = (user: unknown): user is User => {
  return (
    typeof user === 'object' &&
    user !== null &&
    'username' in user &&
    'loginTime' in user &&
    typeof (user as User).username === 'string' &&
    (user as User).loginTime instanceof Date
  );
};

export const isStoredSession = (session: unknown): session is StoredSession => {
  return (
    typeof session === 'object' &&
    session !== null &&
    'username' in session &&
    'hashedCredentials' in session &&
    'loginTime' in session &&
    'expiryTime' in session &&
    'rememberMe' in session &&
    typeof (session as StoredSession).username === 'string' &&
    typeof (session as StoredSession).hashedCredentials === 'string' &&
    typeof (session as StoredSession).loginTime === 'string' &&
    typeof (session as StoredSession).expiryTime === 'string' &&
    typeof (session as StoredSession).rememberMe === 'boolean'
  );
};