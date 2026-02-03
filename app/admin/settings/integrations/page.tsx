'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function IntegrationsSettingsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/admin/settings')
  }, [router])

  return null
}
