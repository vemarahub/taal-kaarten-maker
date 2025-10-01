import { Home, BookOpen, Languages, Youtube, Puzzle, MoreHorizontal, Globe, Target, LogOut, User, Loader2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/vocabulary',
    label: 'Vocabulary',
    icon: Languages,
  },
  {
    href: '/vragenlijst',
    label: 'Interactions',
    icon: BookOpen,
  },
  {
    href: '/grammar',
    label: 'Grammer',
    icon: Puzzle,
  },
  {
    href: '/youtube',
    label: 'Video\'s',
    icon: Youtube,
  },
  {
    href: '/culture',
    label: 'Culture',
    icon: Globe,
  },
  {
    href: '/practice-a2',
    label: 'Practice A2',
    icon: Target,
  },
  {
    href: '/misc',
    label: 'Misc',
    icon: MoreHorizontal,
  },
];

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      logout();
      // Small delay to show the loading state
      setTimeout(() => {
        navigate('/login');
        setIsLoggingOut(false);
      }, 500);
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <NavigationMenu className="w-full max-w-none justify-between">
      <NavigationMenuList className="flex flex-wrap gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <NavigationMenuItem key={item.href}>
              <Link to={item.href}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex items-center gap-2 px-3 py-2",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>

      {/* Authentication Status and Logout */}
      {isAuthenticated && (
        <NavigationMenuList className="flex items-center gap-2">
          {/* User Status Display */}
          <NavigationMenuItem>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">
                {user?.username || 'User'}
              </span>
            </div>
          </NavigationMenuItem>

          {/* Logout Button with Confirmation Dialog */}
          <NavigationMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 px-3 py-2"
                  disabled={isLoading || isLoggingOut}
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to log out? You will need to enter your credentials again to access the application.
                    {user?.username && (
                      <span className="block mt-2 text-sm font-medium">
                        Currently logged in as: {user.username}
                      </span>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging out...
                      </>
                    ) : (
                      'Logout'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </NavigationMenuItem>
        </NavigationMenuList>
      )}
    </NavigationMenu>
  );
}