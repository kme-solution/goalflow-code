// lib/auth.ts

"use client"

import type { AuthSession } from "@/lib/types/auth.types"

const SESSION_KEY = "goalflow_session"

export function setSession(session: AuthSession) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  }
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null

  const sessionData = localStorage.getItem(SESSION_KEY)
  if (!sessionData) return null

  try {
    const session: AuthSession = JSON.parse(sessionData)

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      clearSession()
      return null
    }

    return session
  } catch {
    return null
  }
}

export function clearSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function getCurrentUser() {
  const session = getSession()
  return session?.user || null
}

export { useAuth } from "@/components/auth-provider"
