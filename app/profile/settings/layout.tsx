'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Shield, Palette, Settings, ChevronRight } from 'lucide-react'

const SETTINGS_SECTIONS = [
  {
    id: 'profile',
    label: 'Profile',
    icon: Settings,
    href: '/profile/settings/profile',
    description: 'Manage your profile information',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    href: '/profile/settings/notifications',
    description: 'Manage notification preferences',
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    href: '/profile/settings/security',
    description: 'Control your security settings',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: Palette,
    href: '/profile/settings/preferences',
    description: 'Customize your experience',
  },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and customize your experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="space-y-1 sticky top-20">
            {SETTINGS_SECTIONS.map((section) => {
              const Icon = section.icon
              const active = isActive(section.href)
              
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    active
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{section.label}</p>
                  </div>
                  {active && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  )
}
