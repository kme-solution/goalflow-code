'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { RoleBasedMenu } from './RoleBasedMenu';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useAuth();

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2.5 overflow-hidden transition-all",
            collapsed && "justify-center"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
            <span className="font-bold text-white text-sm">GF</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white">GoalFlow</span>
              <span className="text-xs text-sidebar-foreground/60">Pro</span>
            </div>
          )}
        </Link>
        
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* User Profile */}
      <div className="border-b border-sidebar-border p-4">
        <div
          className={cn(
            "flex items-center gap-3 transition-all",
            collapsed && "justify-center"
          )}
        >
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sidebar bg-green-500" />
          </div>
          
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="truncate font-medium text-white">{user?.name || 'User'}</p>
              <p className="truncate text-xs text-sidebar-foreground/70 capitalize">
                {user?.role?.replace('_', ' ') || 'Employee'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <RoleBasedMenu />
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white",
            collapsed && "justify-center"
          )}
        >
          <div className="flex h-5 w-5 items-center justify-center">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}