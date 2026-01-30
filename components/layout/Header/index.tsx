'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Search, HelpCircle, User, LogOut, Menu, Settings, ChevronDown, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '../Breadcrumbs';
import { useAuth } from '@/components/auth-provider';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && !isSearchOpen) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* Logo for Mobile */}
          <Link href="/dashboard" className="lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
              <span className="font-bold text-white text-sm">GF</span>
            </div>
          </Link>
          
          {/* Breadcrumbs */}
          <div className="hidden md:block">
            <Breadcrumbs />
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-xl mx-4" ref={searchRef}>
          {isSearchOpen ? (
            <div className="relative animate-fade-in">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search goals, people, documents..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-10 focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden w-full items-center gap-3 rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-left text-gray-500 hover:border-gray-400 hover:bg-gray-100 md:flex"
            >
              <Search className="h-4 w-4" />
              <span>Search...</span>
              <kbd className="ml-auto inline-flex h-5 items-center rounded border border-gray-300 bg-white px-1.5 text-xs font-medium text-gray-500">
                ⌘K
              </kbd>
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Icon for Mobile */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* Help */}
          <Link
            href="/help"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </Link>
          
          {/* Notifications */}
          <div className="relative">
            <button
              className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
          </div>
          
          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-gray-100"
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ') || 'Employee'}</p>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-56 animate-fade-in rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                </div>
                
                <div className="py-2">
                  <Link
                    href="/settings/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Your Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </div>
                
                <div className="border-t border-gray-100 py-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 px-4 py-3 md:hidden animate-slide-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-10 focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}