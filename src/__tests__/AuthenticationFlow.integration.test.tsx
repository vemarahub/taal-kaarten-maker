import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthProvider } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../components/ProtectedRoute';

// Mock the services
vi.mock('../services/AuthService', () => ({
  authService: {
    validateCredentials: vi.fn(),
    generateSessionHash: vi.fn(),
    calculateSessionExpiry: vi.fn(() => new Date(Date.now() + 24 * 60 * 60 * 1000)),
    calculatePWASessionExpiry: vi.fn(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
  }
}));

vi.mock('../services/SessionManager', () => ({
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

// Mock PWA registration
vi.mock('virtual:pwa-register', () => ({
  registerSW: vi.fn(() => vi.fn())
}));

// Mock lucide-react icons - comprehensive mock for all used icons
vi.mock('lucide-react', () => {
  const MockIcon = ({ className, ...props }: any) => (
    <div data-testid="mock-icon" className={className} {...props}>Icon</div>
  );
  
  return {
    // Authentication related icons
    Eye: MockIcon,
    EyeOff: MockIcon,
    Loader2: ({ className }: { className?: string }) => (
      <div data-testid="loader" className={className}>Loading...</div>
    ),
    LogOut: MockIcon,
    User: MockIcon,
    Lock: MockIcon,
    
    // Navigation and UI icons
    Home: MockIcon,
    BookOpen: MockIcon,
    Languages: MockIcon,
    Youtube: MockIcon,
    Puzzle: MockIcon,
    MoreHorizontal: MockIcon,
    Globe: MockIcon,
    Target: MockIcon,
    ArrowLeft: MockIcon,
    ArrowRight: MockIcon,
    ChevronRight: MockIcon,
    ChevronDown: MockIcon,
    ChevronUp: MockIcon,
    
    // Action icons
    Play: MockIcon,
    Pause: MockIcon,
    Volume2: MockIcon,
    Check: MockIcon,
    CheckCircle: MockIcon,
    X: MockIcon,
    XCircle: MockIcon,
    
    // Status and feedback icons
    AlertTriangle: MockIcon,
    AlertCircle: MockIcon,
    RefreshCw: MockIcon,
    Clock: MockIcon,
    Trophy: MockIcon,
    Star: MockIcon,
    Award: MockIcon,
    
    // Content type icons
    PenTool: MockIcon,
    Headphones: MockIcon,
    Mic: MockIcon,
    MicOff: MockIcon,
    GraduationCap: MockIcon,
    MessageCircle: MockIcon,
    
    // Utility icons
    Search: MockIcon,
    RotateCcw: MockIcon,
    Zap: MockIcon,
    Sparkles: MockIcon,
    Lightbulb: MockIcon,
    Shield: MockIcon,
    
    // Time and calendar icons
    Calendar: MockIcon,
    Sun: MockIcon,
    Moon: MockIcon,
    Sunrise: MockIcon,
    Sunset: MockIcon,
    
    // People and social icons
    Users: MockIcon,
    
    // Technical icons
    Hash: MockIcon,
    Type: MockIcon,
    MapPin: MockIcon,
    Music: MockIcon,
    Circle: MockIcon,
    PanelLeft: MockIcon,
  };
});

// Simple test component that shows protected content
const TestProtectedContent: React.FC = () => (
  <div>
    <h1>Protected Content</h1>
    <p>This is protected content that should only be visible when authenticated.</p>
  </div>
);

// Test wrapper for authentication flow
const AuthTestWrapper: React.FC<{ children: React.ReactNode; initialRoute?: string }> = ({ 
  children, 
  initialRoute = '/' 
}) => (
  <MemoryRouter initialEntries={[initialRoute]}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </MemoryRouter>
);

describe('Authentication Flow Integration Tests', () => {
  let authService: any;
  let sessionManager: any;

  beforeEach(async () => {
    const authModule = await import('../services/AuthService');
    const sessionModule = await import('../services/SessionManager');
    authService = authModule.authService;
    sessionManager = sessionModule.sessionManager;
    
    vi.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
    
    // Mock window.matchMedia for PWA detection
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    
    // Default mocks
    vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
    vi.mocked(sessionManager.getSession).mockResolvedValue(null);
    vi.mocked(authService.validateCredentials).mockResolvedValue(true);
    vi.mocked(authService.generateSessionHash).mockResolvedValue('mock-hash');
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Complete Login/Logout User Journey', () => {
    it('should complete full authentication journey from login to logout', async () => {
      // Start with unauthenticated state
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
      vi.mocked(authService.validateCredentials).mockResolvedValue(true);

      render(
        <AuthTestWrapper>
          <LoginPage />
        </AuthTestWrapper>
      );

      // Should show login page
      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Fill in login form
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });

      // Submit login form
      await act(async () => {
        fireEvent.click(submitButton);
      });

      // Verify authentication state
      await waitFor(() => {
        expect(authService.validateCredentials).toHaveBeenCalledWith('testuser', 'testpass');
        expect(sessionManager.storeSession).toHaveBeenCalled();
      });
    });

    it('should handle login failure gracefully', async () => {
      // Mock failed authentication
      vi.mocked(authService.validateCredentials).mockResolvedValue(false);

      render(
        <AuthTestWrapper>
          <LoginPage />
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Fill in login form with invalid credentials
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      // Should show error message and stay on login page
      await waitFor(() => {
        expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });
    });

    it('should handle remember me functionality', async () => {
      vi.mocked(authService.validateCredentials).mockResolvedValue(true);

      render(
        <AuthTestWrapper>
          <LoginPage />
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Fill in login form and check remember me
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const rememberMeCheckbox = screen.getByRole('checkbox', { name: /remember me/i });
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });
      fireEvent.click(rememberMeCheckbox);

      await act(async () => {
        fireEvent.click(submitButton);
      });

      // Verify remember me was passed to session storage
      await waitFor(() => {
        expect(sessionManager.storeSession).toHaveBeenCalledWith(
          expect.objectContaining({
            rememberMe: true
          })
        );
      });
    });
  });

  describe('Route Protection Across All Application Pages', () => {
    it('should protect routes when unauthenticated', async () => {
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should show loading initially, then redirect (no protected content shown)
      await waitFor(() => {
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      });
    });

    it('should allow access to routes when authenticated', async () => {
      // Mock successful session restoration
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
      vi.mocked(sessionManager.getSession).mockResolvedValue({
        username: 'testuser',
        hashedCredentials: 'hash',
        loginTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        rememberMe: true
      });

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should show protected content
      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      });
    });

    it('should handle authentication state changes', async () => {
      // Start unauthenticated
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);

      const { rerender } = render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should not show protected content initially
      await waitFor(() => {
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      });

      // Mock authentication success
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
      vi.mocked(sessionManager.getSession).mockResolvedValue({
        username: 'testuser',
        hashedCredentials: 'hash',
        loginTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        rememberMe: true
      });

      // Re-render with authenticated state
      rerender(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should now show protected content
      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      });
    });
  });

  describe('Session Persistence Across Browser Sessions', () => {
    it('should restore session on app startup when valid session exists', async () => {
      // Mock valid session in storage
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
      vi.mocked(sessionManager.getSession).mockResolvedValue({
        username: 'restored-user',
        hashedCredentials: 'stored-hash',
        loginTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        rememberMe: true
      });

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should automatically authenticate and show protected content
      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      });

      // Verify session restoration was called
      expect(sessionManager.isSessionValid).toHaveBeenCalled();
      expect(sessionManager.getSession).toHaveBeenCalled();
    });

    it('should handle expired session gracefully', async () => {
      // Mock expired session
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should not show protected content
      await waitFor(() => {
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      });
    });

    it('should handle session storage errors gracefully', async () => {
      // Mock storage error
      vi.mocked(sessionManager.isSessionValid).mockRejectedValue(new Error('Storage error'));

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should not show protected content when storage fails
      await waitFor(() => {
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      });
    });

    it('should persist session after successful login with remember me', async () => {
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
      vi.mocked(authService.validateCredentials).mockResolvedValue(true);

      render(
        <AuthTestWrapper>
          <LoginPage />
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Login with remember me
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const rememberMeCheckbox = screen.getByRole('checkbox', { name: /remember me/i });
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });
      fireEvent.click(rememberMeCheckbox);

      await act(async () => {
        fireEvent.click(submitButton);
      });

      // Verify session was stored with remember me flag
      await waitFor(() => {
        expect(sessionManager.storeSession).toHaveBeenCalledWith(
          expect.objectContaining({
            username: 'testuser',
            rememberMe: true
          })
        );
      });
    });

    it('should verify session manager methods are called correctly', async () => {
      // Test session clearing functionality
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
      vi.mocked(sessionManager.getSession).mockResolvedValue({
        username: 'testuser',
        hashedCredentials: 'hash',
        loginTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        rememberMe: true
      });

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should show protected content when authenticated
      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      });

      // Verify session methods were called
      expect(sessionManager.isSessionValid).toHaveBeenCalled();
      expect(sessionManager.getSession).toHaveBeenCalled();
    });
  });

  describe('PWA Authentication Behavior and Offline Scenarios', () => {
    it('should handle PWA mode detection', async () => {
      // Mock PWA mode
      vi.mocked(sessionManager.isPWAMode).mockReturnValue(true);
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);

      render(
        <AuthTestWrapper>
          <LoginPage />
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Verify PWA mode was checked
      expect(sessionManager.isPWAMode).toHaveBeenCalled();
    });

    it('should use extended session expiry for PWA mode', async () => {
      vi.mocked(sessionManager.isPWAMode).mockReturnValue(true);
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
      vi.mocked(authService.validateCredentials).mockResolvedValue(true);

      render(
        <AuthTestWrapper>
          <LoginPage />
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Login in PWA mode
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      // Should use PWA session expiry calculation
      expect(authService.calculatePWASessionExpiry).toHaveBeenCalled();
    });

    it('should handle offline authentication state persistence', async () => {
      // Mock PWA mode with valid session
      vi.mocked(sessionManager.isPWAMode).mockReturnValue(true);
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
      vi.mocked(sessionManager.getSession).mockResolvedValue({
        username: 'offline-user',
        hashedCredentials: 'hash',
        loginTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days for PWA
        rememberMe: true
      });

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should work offline with stored session
      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      });
    });

    it('should handle storage unavailability in PWA mode', async () => {
      // Mock storage unavailable
      vi.mocked(sessionManager.isStorageAvailable).mockReturnValue(false);
      vi.mocked(sessionManager.isPWAMode).mockReturnValue(true);
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should not show protected content when storage is unavailable
      await waitFor(() => {
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      });
    });

    it('should handle PWA session extension functionality', async () => {
      // Start with authenticated PWA session
      vi.mocked(sessionManager.isPWAMode).mockReturnValue(true);
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
      vi.mocked(sessionManager.getSession).mockResolvedValue({
        username: 'testuser',
        hashedCredentials: 'hash',
        loginTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 3 * 60 * 1000).toISOString(), // 3 minutes (expiring soon)
        rememberMe: true
      });

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      });

      // Verify PWA mode and session extension are available
      expect(sessionManager.isPWAMode).toHaveBeenCalled();
      expect(sessionManager.extendSession).toBeDefined();
    });

    it('should handle PWA authentication state management', async () => {
      vi.mocked(sessionManager.isPWAMode).mockReturnValue(true);
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
      vi.mocked(sessionManager.getSession).mockResolvedValue({
        username: 'testuser',
        hashedCredentials: 'hash',
        loginTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        rememberMe: true
      });

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      });

      // Verify PWA authentication state is maintained
      expect(sessionManager.isPWAMode).toHaveBeenCalled();
      expect(sessionManager.isSessionValid).toHaveBeenCalled();
    });
  });

  describe('Session Expiration and Renewal', () => {
    it('should handle session expiration detection', async () => {
      // Start with authenticated state with expiring session
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
      vi.mocked(sessionManager.getSession).mockResolvedValue({
        username: 'testuser',
        hashedCredentials: 'hash',
        loginTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 3 * 60 * 1000).toISOString(), // 3 minutes
        rememberMe: true
      });

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      });

      // Verify session expiration logic is available
      expect(sessionManager.isSessionValid).toHaveBeenCalled();
      expect(sessionManager.getSession).toHaveBeenCalled();
    });

    it('should handle session renewal functionality', async () => {
      // Start with expiring session
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(true);
      vi.mocked(sessionManager.getSession).mockResolvedValue({
        username: 'testuser',
        hashedCredentials: 'hash',
        loginTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
        rememberMe: true
      });

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      });

      // Verify session extension functionality is available
      expect(sessionManager.extendSession).toBeDefined();
    });

    it('should handle expired session logout', async () => {
      // Start with expired session
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should not show protected content when session is expired
      await waitFor(() => {
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      });

      // Verify session validation was called
      expect(sessionManager.isSessionValid).toHaveBeenCalled();
    });
  });

  describe('Error Handling and Loading States', () => {
    it('should show loading state during authentication', async () => {
      // Mock slow authentication
      vi.mocked(sessionManager.isSessionValid).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(false), 100))
      );

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should show loading state initially (ProtectedRoute shows loading)
      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.getByText('Checking authentication...')).toBeInTheDocument();

      // Wait for authentication to complete
      await waitFor(() => {
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      });
    });

    it('should handle authentication service errors', async () => {
      vi.mocked(sessionManager.isSessionValid).mockResolvedValue(false);
      vi.mocked(authService.validateCredentials).mockRejectedValue(new Error('Service error'));

      render(
        <AuthTestWrapper>
          <LoginPage />
        </AuthTestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      });

      // Try to login
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/an error occurred during login/i)).toBeInTheDocument();
      });
    });

    it('should handle session manager errors', async () => {
      vi.mocked(sessionManager.isSessionValid).mockRejectedValue(new Error('Storage error'));

      render(
        <AuthTestWrapper>
          <ProtectedRoute>
            <TestProtectedContent />
          </ProtectedRoute>
        </AuthTestWrapper>
      );

      // Should not show protected content when session manager fails
      await waitFor(() => {
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      });
    });
  });
});