import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthProvider, useAuth } from '../AuthContext';
import { AuthStatus } from '../../types/auth';

// Mock the services
vi.mock('../../services/AuthService', () => ({
  authService: {
    validateCredentials: vi.fn(),
    generateSessionHash: vi.fn(),
    calculateSessionExpiry: vi.fn(() => new Date(Date.now() + 24 * 60 * 60 * 1000)),
    calculatePWASessionExpiry: vi.fn(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
  }
}));

vi.mock('../../services/SessionManager', () => ({
  sessionManager: {
    isStorageAvailable: vi.fn(() => true),
    storeSession: vi.fn(),
    clearSession: vi.fn(),
    isSessionValid: vi.fn(),
    getSession: vi.fn(),
    extendSession: vi.fn(),
    isPWAMode: vi.fn(() => false)
  }
}));

// Test component that uses the auth context
const TestComponent: React.FC = () => {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    login, 
    logout, 
    error, 
    status,
    sessionExpiry,
    extendSession,
    isSessionExpiringSoon
  } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{status}</div>
      <div data-testid="is-authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="user">{user?.username || 'null'}</div>
      <div data-testid="error">{error || 'null'}</div>
      <div data-testid="session-expiry">{sessionExpiry?.toISOString() || 'null'}</div>
      <div data-testid="is-session-expiring-soon">{isSessionExpiringSoon.toString()}</div>
      <button 
        data-testid="login-btn" 
        onClick={() => login('testuser', 'testpass', false)}
      >
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
      <button 
        data-testid="extend-session-btn" 
        onClick={() => extendSession()}
      >
        Extend Session
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  let authService: any;
  let sessionManager: any;

  beforeEach(async () => {
    const authModule = await import('../../services/AuthService');
    const sessionModule = await import('../../services/SessionManager');
    authService = authModule.authService;
    sessionManager = sessionModule.sessionManager;
    
    vi.clearAllMocks();
    // Reset localStorage
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should provide initial authentication state', async () => {
    // Mock session restoration failure
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for session restoration to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent(AuthStatus.UNAUTHENTICATED);
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('null');
  });

  it('should handle successful login', async () => {
    // Mock session restoration failure
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock successful credential validation
    vi.mocked(authService.validateCredentials).mockResolvedValue(true);
    vi.mocked(authService.generateSessionHash).mockResolvedValue('mock-hash');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Perform login
    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent(AuthStatus.AUTHENTICATED);
    expect(screen.getByTestId('user')).toHaveTextContent('testuser');
    expect(screen.getByTestId('error')).toHaveTextContent('null');
  });

  it('should handle failed login', async () => {
    // Mock session restoration failure
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock failed credential validation
    vi.mocked(authService.validateCredentials).mockResolvedValue(false);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Perform login
    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('error')).not.toHaveTextContent('null');
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent(AuthStatus.ERROR);
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('Invalid username or password');
  });

  it('should handle logout', async () => {
    // Mock session restoration failure
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock successful credential validation
    vi.mocked(authService.validateCredentials).mockResolvedValue(true);
    vi.mocked(authService.generateSessionHash).mockResolvedValue('mock-hash');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Login first
    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    // Now logout
    await act(async () => {
      screen.getByTestId('logout-btn').click();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent(AuthStatus.UNAUTHENTICATED);
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('null');
    expect(sessionManager.clearSession).toHaveBeenCalled();
  });

  it('should restore session on mount', async () => {
    // Mock successful session restoration
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
    vi.mocked(sessionManager.getSession).mockResolvedValue({
      username: 'restored-user',
      hashedCredentials: 'hash',
      loginTime: new Date().toISOString(),
      expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      rememberMe: true
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for session restoration to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent(AuthStatus.AUTHENTICATED);
    expect(screen.getByTestId('user')).toHaveTextContent('restored-user');
    expect(screen.getByTestId('error')).toHaveTextContent('null');
  });

  it('should handle session restoration failure', async () => {
    // Mock session restoration failure
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for session restoration to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent(AuthStatus.UNAUTHENTICATED);
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('null');
  });

  it('should handle login with remember me', async () => {
    // Mock session restoration failure initially
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock successful credential validation
    vi.mocked(authService.validateCredentials).mockResolvedValue(true);
    vi.mocked(authService.generateSessionHash).mockResolvedValue('mock-hash');

    const TestComponentWithRememberMe: React.FC = () => {
      const { login } = useAuth();
      return (
        <button 
          data-testid="login-remember-btn" 
          onClick={() => login('testuser', 'testpass', true)}
        >
          Login with Remember Me
        </button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
        <TestComponentWithRememberMe />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Perform login with remember me
    await act(async () => {
      screen.getByTestId('login-remember-btn').click();
    });

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    expect(sessionManager.storeSession).toHaveBeenCalledWith(
      expect.objectContaining({
        username: 'testuser',
        rememberMe: true
      })
    );
  });

  it('should handle login error gracefully', async () => {
    // Mock session restoration failure
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock credential validation error
    vi.mocked(authService.validateCredentials).mockRejectedValue(new Error('Network error'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Perform login
    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('error')).not.toHaveTextContent('null');
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent(AuthStatus.ERROR);
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('An error occurred during login. Please try again.');
  });

  it('should detect when session is expiring soon', async () => {
    vi.useFakeTimers();
    
    // Mock session restoration failure initially
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock successful credential validation
    vi.mocked(authService.validateCredentials).mockResolvedValue(true);
    vi.mocked(authService.generateSessionHash).mockResolvedValue('mock-hash');
    
    // Mock session expiry to be 3 minutes from now
    const sessionExpiry = new Date(Date.now() + 3 * 60 * 1000);
    vi.mocked(authService.calculateSessionExpiry).mockReturnValue(sessionExpiry);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Login
    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    // Initially should not be expiring soon
    expect(screen.getByTestId('is-session-expiring-soon')).toHaveTextContent('false');

    // Fast forward to within 5 minutes of expiry (should trigger expiring soon)
    vi.setSystemTime(Date.now() + 2.5 * 60 * 1000); // 2.5 minutes later
    
    // Advance timers to trigger the session check
    await act(async () => {
      vi.advanceTimersByTime(30000); // 30 seconds
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-session-expiring-soon')).toHaveTextContent('true');
    });

    vi.useRealTimers();
  });

  it('should logout when session expires', async () => {
    vi.useFakeTimers();
    
    // Mock session restoration failure initially
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock successful credential validation
    vi.mocked(authService.validateCredentials).mockResolvedValue(true);
    vi.mocked(authService.generateSessionHash).mockResolvedValue('mock-hash');
    
    // Mock session expiry to be 1 minute from now
    const sessionExpiry = new Date(Date.now() + 60 * 1000);
    vi.mocked(authService.calculateSessionExpiry).mockReturnValue(sessionExpiry);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Login
    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    // Fast forward past session expiry
    vi.setSystemTime(Date.now() + 2 * 60 * 1000); // 2 minutes later
    
    // Advance timers to trigger the session check
    await act(async () => {
      vi.advanceTimersByTime(30000); // 30 seconds
    });

    // Should be logged out
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent(AuthStatus.UNAUTHENTICATED);

    vi.useRealTimers();
  });

  it('should extend session successfully', async () => {
    // Mock session restoration failure initially
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock successful credential validation
    vi.mocked(authService.validateCredentials).mockResolvedValue(true);
    vi.mocked(authService.generateSessionHash).mockResolvedValue('mock-hash');
    
    const originalExpiry = new Date(Date.now() + 3 * 60 * 1000);
    const extendedExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    vi.mocked(authService.calculateSessionExpiry)
      .mockReturnValueOnce(originalExpiry) // For login
      .mockReturnValueOnce(extendedExpiry); // For extension
    
    vi.mocked(sessionManager.extendSession).mockResolvedValue(undefined);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Login
    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    // Check initial session expiry
    expect(screen.getByTestId('session-expiry')).toHaveTextContent(originalExpiry.toISOString());

    // Extend session
    await act(async () => {
      screen.getByTestId('extend-session-btn').click();
    });

    // Should have extended session expiry
    await waitFor(() => {
      expect(screen.getByTestId('session-expiry')).toHaveTextContent(extendedExpiry.toISOString());
    });

    expect(screen.getByTestId('is-session-expiring-soon')).toHaveTextContent('false');
    expect(sessionManager.extendSession).toHaveBeenCalledWith(extendedExpiry);
  });

  it('should handle session extension failure', async () => {
    // Mock session restoration failure initially
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock successful credential validation
    vi.mocked(authService.validateCredentials).mockResolvedValue(true);
    vi.mocked(authService.generateSessionHash).mockResolvedValue('mock-hash');
    
    const originalExpiry = new Date(Date.now() + 3 * 60 * 1000);
    vi.mocked(authService.calculateSessionExpiry).mockReturnValue(originalExpiry);
    
    // Mock session extension failure
    vi.mocked(sessionManager.extendSession).mockRejectedValue(new Error('Extension failed'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Login
    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    // Extend session (should fail)
    await act(async () => {
      screen.getByTestId('extend-session-btn').click();
    });

    // Should show error
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to extend session. Please log in again.');
    });
  });

  it('should clear expiring soon flag when not authenticated', async () => {
    vi.useFakeTimers();
    
    // Mock session restoration failure initially
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    // Mock successful credential validation
    vi.mocked(authService.validateCredentials).mockResolvedValue(true);
    vi.mocked(authService.generateSessionHash).mockResolvedValue('mock-hash');
    
    // Mock session expiry to be 3 minutes from now
    const sessionExpiry = new Date(Date.now() + 3 * 60 * 1000);
    vi.mocked(authService.calculateSessionExpiry).mockReturnValue(sessionExpiry);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Login
    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    // Fast forward to trigger expiring soon
    vi.setSystemTime(Date.now() + 2.5 * 60 * 1000);
    
    await act(async () => {
      vi.advanceTimersByTime(30000);
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-session-expiring-soon')).toHaveTextContent('true');
    });

    // Logout
    await act(async () => {
      screen.getByTestId('logout-btn').click();
    });

    // Should clear expiring soon flag
    expect(screen.getByTestId('is-session-expiring-soon')).toHaveTextContent('false');

    vi.useRealTimers();
  });

});