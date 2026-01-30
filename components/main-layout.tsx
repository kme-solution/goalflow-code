"use client"

import type { ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export function MainLayout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()

  return (
    <div className="flex h-full min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 border-r border-border bg-sidebar">
          <div className="p-6">
            <h1 className="text-xl font-bold text-sidebar-foreground">GoalFlow</h1>
          </div>
          <nav className="space-y-2 px-4">{/* Sidebar navigation links can be added here */}</nav>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-auto ${isMobile ? "pb-20" : ""}`}>{children}</main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-sidebar">
          <div className="flex justify-around p-4">{/* Bottom nav items can be added here */}</div>
        </nav>
      )}
    </div>
  )
}
