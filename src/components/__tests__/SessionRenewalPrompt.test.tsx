import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SessionRenewalPrompt } from '../SessionRenewalPrompt';
import { useAuth } from '../../contexts/AuthContext';

// Mock the useAuth hook
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn()
}));

// Mock the UI components
vi.mock('../ui/alert-dialog', () => ({
  AlertDialog: ({ children, open }: { children: React.ReactNode; open: boolean }) => 
    open ? <div data-testid="alert-dialog">{children}</div> : null,
  AlertDialogAction: ({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) => 
    <button data-testid="extend-session-btn" onClick={onClick} disabled={disabled}>{children}</button>,
  AlertDialogCancel: ({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) => 
    <button data-testid="logout-btn" onClick={onClick} disabled={disabled}>{children}</button>,
  AlertDialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AlertDialogDescription: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AlertDialogFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AlertDialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AlertDialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
}));

vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => <button {...props}>{children}</button>
}));

vi.mock('lucide-react', () => ({
  Clock: () => <span data-testid="clock-icon">Clock</span>,
  RefreshCw: ({ className }: { className?: string }) => <span data-testid="refresh-icon" className={className}>Refresh</span>
}));

describe('SessionRenewalPrompt', () => {
  const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;
  
  const defaultAuthState = {
    isSessionExpiringSoon: false,
    sessionExpiry: null,
    extendSession: vi.fn(),
    logout: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue(defaultAuthState);
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should not render when session is not expiring soon', () => {
    render(<SessionRenewalPrompt />);
    
    expect(screen.queryByTestId('alert-dialog')).not.toBeInTheDocument();
  });

  it('should render when session is expiring soon', () => {
    const sessionExpiry = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now
    
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isSessionExpiringSoon: true,
      sessionExpiry
    });

    render(<SessionRenewalPrompt />);
    
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();
    expect(screen.getByText('Session Expiring Soon')).toBeInTheDocument();
    expect(screen.getByText(/Your session will expire in/)).toBeInTheDocument();
  });

  it('should display correct time remaining in minutes', () => {
    const sessionExpiry = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now
    
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isSessionExpiringSoon: true,
      sessionExpiry
    });

    render(<SessionRenewalPrompt />);
    
    expect(screen.getByText(/3 minutes/)).toBeInTheDocument();
  });

  it('should display correct time remaining in seconds when less than a minute', () => {
    const sessionExpiry = new Date(Date.now() + 30 * 1000); // 30 seconds from now
    
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isSessionExpiringSoon: true,
      sessionExpiry
    });

    render(<SessionRenewalPrompt />);
    
    expect(screen.getByText(/30 seconds/)).toBeInTheDocument();
  });

  it('should call extendSession when extend button is clicked', async () => {
    const mockExtendSession = vi.fn().mockResolvedValue(true);
    const sessionExpiry = new Date(Date.now() + 3 * 60 * 1000);
    
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isSessionExpiringSoon: true,
      sessionExpiry,
      extendSession: mockExtendSession
    });

    render(<SessionRenewalPrompt />);
    
    const extendButton = screen.getByTestId('extend-session-btn');
    fireEvent.click(extendButton);
    
    expect(mockExtendSession).toHaveBeenCalledTimes(1);
  });

  it('should call logout when logout button is clicked', () => {
    const mockLogout = vi.fn();
    const sessionExpiry = new Date(Date.now() + 3 * 60 * 1000);
    
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isSessionExpiringSoon: true,
      sessionExpiry,
      logout: mockLogout
    });

    render(<SessionRenewalPrompt />);
    
    const logoutButton = screen.getByTestId('logout-btn');
    fireEvent.click(logoutButton);
    
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('should show loading state when extending session', async () => {
    const mockExtendSession = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100)));
    const sessionExpiry = new Date(Date.now() + 3 * 60 * 1000);
    
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isSessionExpiringSoon: true,
      sessionExpiry,
      extendSession: mockExtendSession
    });

    render(<SessionRenewalPrompt />);
    
    const extendButton = screen.getByTestId('extend-session-btn');
    fireEvent.click(extendButton);
    
    expect(screen.getByText('Extending...')).toBeInTheDocument();
    expect(screen.getByTestId('refresh-icon')).toBeInTheDocument();
    expect(extendButton).toBeDisabled();
  });

  it('should logout after delay when session extension fails', async () => {
    vi.useFakeTimers();
    
    const mockExtendSession = vi.fn().mockResolvedValue(false);
    const mockLogout = vi.fn();
    const sessionExpiry = new Date(Date.now() + 3 * 60 * 1000);
    
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isSessionExpiringSoon: true,
      sessionExpiry,
      extendSession: mockExtendSession,
      logout: mockLogout
    });

    render(<SessionRenewalPrompt />);
    
    const extendButton = screen.getByTestId('extend-session-btn');
    fireEvent.click(extendButton);
    
    await waitFor(() => {
      expect(mockExtendSession).toHaveBeenCalledTimes(1);
    });
    
    // Fast-forward time to trigger the delayed logout
    vi.advanceTimersByTime(2000);
    
    expect(mockLogout).toHaveBeenCalledTimes(1);
    
    vi.useRealTimers();
  });

  it('should logout after delay when session extension throws error', async () => {
    vi.useFakeTimers();
    
    const mockExtendSession = vi.fn().mockRejectedValue(new Error('Extension failed'));
    const mockLogout = vi.fn();
    const sessionExpiry = new Date(Date.now() + 3 * 60 * 1000);
    
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isSessionExpiringSoon: true,
      sessionExpiry,
      extendSession: mockExtendSession,
      logout: mockLogout
    });

    render(<SessionRenewalPrompt />);
    
    const extendButton = screen.getByTestId('extend-session-btn');
    fireEvent.click(extendButton);
    
    await waitFor(() => {
      expect(mockExtendSession).toHaveBeenCalledTimes(1);
    });
    
    // Fast-forward time to trigger the delayed logout
    vi.advanceTimersByTime(2000);
    
    expect(mockLogout).toHaveBeenCalledTimes(1);
    
    vi.useRealTimers();
  });

  it('should update time remaining countdown', () => {
    vi.useFakeTimers();
    
    const sessionExpiry = new Date(Date.now() + 65 * 1000); // 1 minute 5 seconds from now
    
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isSessionExpiringSoon: true,
      sessionExpiry
    });

    render(<SessionRenewalPrompt />);
    
    // Initially should show 1 minute
    expect(screen.getByText(/1 minute/)).toBeInTheDocument();
    
    // Advance time by 10 seconds
    vi.advanceTimersByTime(10000);
    
    // Should still show 1 minute (55 seconds remaining)
    expect(screen.getByText(/1 minute/)).toBeInTheDocument();
    
    // Advance time by another 50 seconds (total 60 seconds)
    vi.advanceTimersByTime(50000);
    
    // Should now show seconds
    expect(screen.getByText(/5 seconds/)).toBeInTheDocument();
    
    vi.useRealTimers();
  });
});