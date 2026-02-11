"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types/auth.types"
import { getSession, setSession, clearSession } from "@/lib/auth"

interface AuthContextType {
  user: Omit<User, "password"> | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const session = getSession()
    if (session) {
      setUser(session.user)
      setLoading(false)
    } else {
      // Auto-login test user for development
      const autoLogin = async () => {
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: "employee@goalflow.com",
              password: "password123"
            }),
          })

          const data = await response.json()

          if (data.success && data.user && data.token) {
            const session = {
              user: data.user,
              token: data.token,
              expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            }
            setSession(session)
            setUser(data.user)
          }
        } catch (error) {
          console.error("Auto-login failed:", error)
        } finally {
          setLoading(false)
        }
      }

      autoLogin()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      let data: any
      let text: string = ''
      try {
        text = await response.text()
        data = JSON.parse(text)
      } catch (jsonError) {
        console.error("Login error: Non-JSON response", text)
        return { success: false, error: `Unexpected response: ${text ? text.slice(0, 100) : String(jsonError)}` }
      }

      if (data.success && data.user && data.token) {
        const session = {
          user: data.user,
          token: data.token,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        }
        setSession(session)
        setUser(data.user)
        return { success: true }
      }

      return { success: false, error: data.error || "Login failed" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "An error occurred during login" }
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      clearSession()
      setUser(null)
      router.push("/")
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
