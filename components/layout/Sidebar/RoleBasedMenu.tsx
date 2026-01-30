"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { getFilteredMenuByRole, type UserRole } from "@/lib/menu-config"
import { useAuth } from "@/components/auth-provider"
import { ChevronRight, Home, Settings, Bell, Search, User } from "lucide-react"

export function RoleBasedMenu() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    if (user) {
      const navigation = getFilteredMenuByRole(user.role as UserRole)
      const activeMenus: Record<string, boolean> = {}

      navigation.forEach((item) => {
        if (item.items) {
          const hasActiveChild = item.items.some(
            (child) => pathname === child.href || pathname.startsWith(child.href + "/"),
          )
          if (hasActiveChild) {
            activeMenus[item.id] = true
          }
        }
      })

      setOpenMenus(activeMenus)
    }
  }, [pathname, user])

  if (!user) return null

  const navigation = getFilteredMenuByRole(user.role as UserRole)

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-1.5 p-4">
      {navigation.map((item) => {
        if (item.items && item.items.length > 0) {
          const isOpen = openMenus[item.id]
          
          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => toggleMenu(item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20",
                  isOpen && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center">
                    {/* {item.icon} */}
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isOpen && "rotate-90"
                  )}
                />
              </button>
              
              {isOpen && (
                <div className="ml-7 space-y-1 border-l border-sidebar-border pl-2">
                  {item.items.map((child) => {
                    const isActive = pathname === child.href || pathname.startsWith(child.href + "/")
                    
                    return (
                      <Link
                        key={child.id}
                        href={child.href || "#"}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                            : "text-sidebar-foreground"
                        )}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        }

        const isActive = pathname === item.href || pathname.startsWith((item.href || "") + "/")
        
        return (
          <Link
            key={item.id}
            href={item.href || "#"}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive
                ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                : "text-sidebar-foreground"
            )}
          >
            <div className="flex h-5 w-5 items-center justify-center">
              {/* {item.icon} */}
            </div>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}