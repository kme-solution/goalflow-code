"use client"

import type * as React from "react"
import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header" 

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64">
            <Sidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuToggle={toggleMobileMenu} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} goalFlow Pro. All rights reserved.
            </p>
            <div className="mt-2 flex space-x-6 text-sm text-gray-600 md:mt-0 items-center">
              <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
              <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
              <a href="/help" className="hover:text-blue-600">Help Center</a>
            
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
