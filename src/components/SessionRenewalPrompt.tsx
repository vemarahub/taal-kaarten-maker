import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Clock, RefreshCw, AlertTriangle } from 'lucide-react';
import { toast } from './ui/use-toast';

/**
 * SessionRenewalPrompt component displays a dialog when the user's session
 * is about to expire, offering them the option to extend their session
 */
export const SessionRenewalPrompt: React.FC = () => {
  const { isSessionExpiringSoon, sessionExpiry, extendSession, logout } = useAuth();
  const [isExtending, setIsExtending] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Calculate and update time remaining until session expires
  useEffect(() => {
    if (!isSessionExpiringSoon || !sessionExpiry) {
      setTimeRemaining('');
      return;
    }

    const updateTimeRemaining = () => {
      const now = new Date();
      const timeUntilExpiry = sessionExpiry.getTime() - now.getTime();
      
      if (timeUntilExpiry <= 0) {
        setTimeRemaining('Session expired');
        return;
      }

      const minutes = Math.floor(timeUntilExpiry / (1000 * 60));
      const seconds = Math.floor((timeUntilExpiry % (1000 * 60)) / 1000);
      
      if (minutes > 0) {
        setTimeRemaining(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
      } else {
        setTimeRemaining(`${seconds} second${seconds !== 1 ? 's' : ''}`);
      }
    };

    // Update immediately
    updateTimeRemaining();

    // Update every second for accurate countdown
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [isSessionExpiringSoon, sessionExpiry]);

  // Handle session extension
  const handleExtendSession = async () => {
    setIsExtending(true);
    try {
      const success = await extendSession();
      if (!success) {
        // Show error toast - the extendSession function already shows its own toast
        toast({
          variant: "destructive",
          title: "Session Extension Failed",
          description: "Logging out in 3 seconds...",
        });
        
        // If extension fails, logout after a delay to show the message
        setTimeout(() => {
          logout();
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to extend session:', error);
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Session Extension Error",
        description: "An unexpected error occurred. Logging out in 3 seconds...",
      });
      
      // Logout on error after delay
      setTimeout(() => {
        logout();
      }, 3000);
    } finally {
      setIsExtending(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  // Don't render if session is not expiring soon
  if (!isSessionExpiringSoon) {
    return null;
  }

  return (
    <AlertDialog open={isSessionExpiringSoon}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Session Expiring Soon
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Your session will expire in <strong>{timeRemaining}</strong>.
            </p>
            <p>
              Would you like to extend your session to continue using the application?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel 
            onClick={handleLogout}
            disabled={isExtending}
            className="w-full sm:w-auto"
          >
            Logout
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleExtendSession}
            disabled={isExtending}
            className="w-full sm:w-auto"
          >
            {isExtending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Extending...
              </>
            ) : (
              'Extend Session'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SessionRenewalPrompt;