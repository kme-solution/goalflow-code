"use client"

import { Bell, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserMenu } from "@/components/user-menu"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardHeaderProps {
  userName?: string
}

export function DashboardHeader({ userName = "John" }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="flex flex-1 items-center gap-4">
          <h2 className="text-lg font-semibold">
            Welcome back, <span className="text-primary">{userName}</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search goals, reviews..." className="w-64 pl-9" />
          </div>

          <Button size="sm" className="hidden md:flex">
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
