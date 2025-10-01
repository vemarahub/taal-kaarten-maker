import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
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

describe('ProtectedRoute - Basic Tests', () => {
  it('should show loading spinner when authentication is loading', () => {
    const authContext = createMockAuthContext({
      isLoading: true,
      status: AuthStatus.LOADING,
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthContext.Provider value={authContext}>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

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

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthContext.Provider value={authContext}>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should not render protected content when not authenticated', () => {
    const authContext = createMockAuthContext({
      isAuthenticated: false,
      isLoading: false,
      status: AuthStatus.UNAUTHENTICATED,
    });

    render(
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
  });
});