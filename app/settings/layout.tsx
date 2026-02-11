'use client'
 
import { usePathname } from 'next/navigation'
import { Layout } from '@/components/layout'
import { ProtectedRoute } from '@/components/protected-route'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
  )
}
