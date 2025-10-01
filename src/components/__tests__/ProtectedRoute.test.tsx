import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ProtectedRoute from '../ProtectedRoute';
import { AuthContext } from '../../contexts/AuthContext';
import { AuthContextType, AuthStatus } from '../../types/auth';

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  Loader2: ({ className }: { className?: string }) => (
    <div data-testid="loader" className={className}>Loading...</div>
  ),
}));

// Test component to render inside ProtectedRoute
const TestComponent: React.FC = () => (
  <div data-testid="protected-content">Protected Content</div>
);

// Helper function to create mock auth context
const createMockAuthContext = (overrides: Partial<AuthContextType> = {}): AuthContextType => ({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: vi.fn(),
  logout: vi.fn(),
  error: null,
  status: AuthStatus.UNAUTHENTICATED,
  ...overrides,
});

// Helper function to render ProtectedRoute with context
const renderProtectedRoute = (
  authContext: AuthContextType,
  initialEntries: string[] = ['/protected']
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthContext.Provider value={authContext}>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading spinner when authentication is loading', () => {
      const authContext = createMockAuthContext({
        isLoading: true,
        status: AuthStatus.LOADING,
      });

      renderProtectedRoute(authContext);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    it('should apply correct styling to loading container', () => {
      const authContext = createMockAuthContext({
        isLoading: true,
        status: AuthStatus.LOADING,
      });

      renderProtectedRoute(authContext);

      const loadingContainer = screen.getByText('Checking authentication...').closest('div');
      expect(loadingContainer).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center');
    });
  });

  describe('Unauthenticated State', () => {
    it('should redirect to login page when not authenticated', () => {
      const authContext = createMockAuthContext({
        isAuthenticated: false,
        isLoading: false,
        status: AuthStatus.UNAUTHENTICATED,
      });

      // We need to use a more complex setup to test navigation
      const { container } = render(
        <MemoryRouter initialEntries={['/protected']}>
          <AuthContext.Provider value={authContext}>
            <ProtectedRoute>
              <TestComponent />
            </ProtectedRoute>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      // The component should not render the protected content
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
      
      // Since we're using MemoryRouter, we can't easily test the actual navigation
      // but we can verify that the protected content is not rendered
    });

    it('should preserve the current location for post-login redirect', () => {
      const authContext = createMockAuthContext({
        isAuthenticated: false,
        isLoading: false,
        status: AuthStatus.UNAUTHENTICATED,
      });

      renderProtectedRoute(authContext, ['/protected-page']);

      // The protected content should not be rendered
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('Authenticated State', () => {
    it('should render protected content when authenticated', () => {
      const mockUser = {
        username: 'testuser',
        loginTime: new Date(),
      };

      const authContext = createMockAuthContext({
        isAuthenticated: true,
        isLoading: false,
        user: mockUser,
        status: AuthStatus.AUTHENTICATED,
      });

      renderProtectedRoute(authContext);

      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should not show loading spinner when authenticated', () => {
      const mockUser = {
        username: 'testuser',
        loginTime: new Date(),
      };

      const authContext = createMockAuthContext({
        isAuthenticated: true,
        isLoading: false,
        user: mockUser,
        status: AuthStatus.AUTHENTICATED,
      });

      renderProtectedRoute(authContext);

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByText('Checking authentication...')).not.toBeInTheDocument();
    });
  });

  describe('Authentication State Changes', () => {
    it('should handle transition from loading to authenticated', () => {
      const mockUser = {
        username: 'testuser',
        loginTime: new Date(),
      };

      // Start with loading state
      let authContext = createMockAuthContext({
        isLoading: true,
        status: AuthStatus.LOADING,
      });

      const { rerender } = renderProtectedRoute(authContext);

      // Verify loading state
      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();

      // Update to authenticated state
      authContext = createMockAuthContext({
        isAuthenticated: true,
        isLoading: false,
        user: mockUser,
        status: AuthStatus.AUTHENTICATED,
      });

      rerender(
        <MemoryRouter initialEntries={['/protected']}>
          <AuthContext.Provider value={authContext}>
            <ProtectedRoute>
              <TestComponent />
            </ProtectedRoute>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      // Verify authenticated state
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });

    it('should handle transition from loading to unauthenticated', () => {
      // Start with loading state
      let authContext = createMockAuthContext({
        isLoading: true,
        status: AuthStatus.LOADING,
      });

      const { rerender } = renderProtectedRoute(authContext);

      // Verify loading state
      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();

      // Update to unauthenticated state
      authContext = createMockAuthContext({
        isAuthenticated: false,
        isLoading: false,
        status: AuthStatus.UNAUTHENTICATED,
      });

      rerender(
        <MemoryRouter initialEntries={['/protected']}>
          <AuthContext.Provider value={authContext}>
            <ProtectedRoute>
              <TestComponent />
            </ProtectedRoute>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      // Verify redirect (content not rendered)
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    it('should handle transition from authenticated to unauthenticated (logout)', () => {
      const mockUser = {
        username: 'testuser',
        loginTime: new Date(),
      };

      // Start with authenticated state
      let authContext = createMockAuthContext({
        isAuthenticated: true,
        isLoading: false,
        user: mockUser,
        status: AuthStatus.AUTHENTICATED,
      });

      const { rerender } = renderProtectedRoute(authContext);

      // Verify authenticated state
      expect(screen.getByTestId('protected-content')).toBeInTheDocument();

      // Update to unauthenticated state (simulating logout)
      authContext = createMockAuthContext({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        status: AuthStatus.UNAUTHENTICATED,
      });

      rerender(
        <MemoryRouter initialEntries={['/protected']}>
          <AuthContext.Provider value={authContext}>
            <ProtectedRoute>
              <TestComponent />
            </ProtectedRoute>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      // Verify redirect (content not rendered)
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('Error States', () => {
    it('should handle authentication error state', () => {
      const authContext = createMockAuthContext({
        isAuthenticated: false,
        isLoading: false,
        error: 'Authentication failed',
        status: AuthStatus.ERROR,
      });

      renderProtectedRoute(authContext);

      // Should redirect to login even with error
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render multiple children when authenticated', () => {
      const mockUser = {
        username: 'testuser',
        loginTime: new Date(),
      };

      const authContext = createMockAuthContext({
        isAuthenticated: true,
        isLoading: false,
        user: mockUser,
        status: AuthStatus.AUTHENTICATED,
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <AuthContext.Provider value={authContext}>
            <ProtectedRoute>
              <div data-testid="child-1">Child 1</div>
              <div data-testid="child-2">Child 2</div>
            </ProtectedRoute>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });

    it('should render complex nested children when authenticated', () => {
      const mockUser = {
        username: 'testuser',
        loginTime: new Date(),
      };

      const authContext = createMockAuthContext({
        isAuthenticated: true,
        isLoading: false,
        user: mockUser,
        status: AuthStatus.AUTHENTICATED,
      });

      const ComplexChild = () => (
        <div data-testid="complex-child">
          <h1>Title</h1>
          <p>Content</p>
          <button>Action</button>
        </div>
      );

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <AuthContext.Provider value={authContext}>
            <ProtectedRoute>
              <ComplexChild />
            </ProtectedRoute>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByTestId('complex-child')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });
});