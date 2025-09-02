import { Home, BookOpen, Languages, Youtube, Puzzle, MoreHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
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
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/vragenlijst',
    label: 'Vragenlijst',
    icon: BookOpen,
  },
  {
    href: '/vocabulary',
    label: 'Woordenlijst',
    icon: Languages,
  },
  {
    href: '/grammar',
    label: 'Grammatica',
    icon: Puzzle,
  },
  {
    href: '/youtube',
    label: 'Video\'s',
    icon: Youtube,
  },
  {
    href: '/misc',
    label: 'Overig',
    icon: MoreHorizontal,
  },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <NavigationMenu className="w-full max-w-none justify-center">
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
    </NavigationMenu>
  );
}