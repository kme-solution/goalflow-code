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

export function getUserFromToken(request: Request) {
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7);
  // Here you would typically verify the token and extract user info
  // For simplicity, we'll just return a mock user if the token is "valid-token"
  if (token === "valid-token") {
    return {
      id: "user-id",
      email: "asdf@mail.com",
      name: "John Doe",
      organizationId: "org-id",
    }
  }

  return null
}
  



export { useAuth } from "@/components/auth-provider"
