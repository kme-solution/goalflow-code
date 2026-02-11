"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { MOCK_USERS } from "@/lib/mock-data/users"
import { DEMO_CREDENTIALS_TEXT, ROLE_COLORS, GoogleIcon } from "./constants"

export interface LoginFormProps {
  /** Called after successful login. When provided, caller handles navigation (e.g. modal closes). */
  onSuccess?: () => void
  /** Called when user clicks a link that navigates away (e.g. forgot password, sign up). For modal to close before nav. */
  onNavigateAway?: () => void
  /** Prefix for input IDs to avoid conflicts when multiple forms on page */
  idPrefix?: string
  /** CSS class for the divider "Or continue with" - bg-card for Card, bg-background for modal */
  dividerBgClass?: string
}

export function LoginForm({
  onSuccess,
  onNavigateAway,
  idPrefix = "login",
  dividerBgClass = "bg-card",
}: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess()
    } else {
      router.push("/dashboard")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      handleSuccess()
    } else {
      setError(result.error || "Login failed")
    }

    setLoading(false)
  }

  const handleQuickLogin = async (mockEmail: string, mockPassword: string) => {
    setError("")
    setLoading(true)
    setEmail(mockEmail)
    setPassword(mockPassword)

    const result = await login(mockEmail, mockPassword)

    if (result.success) {
      handleSuccess()
    } else {
      setError(result.error || "Login failed")
      setLoading(false)
    }
  }

  const linkProps = onNavigateAway
    ? { onClick: onNavigateAway }
    : {}

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Alert>
        <AlertDescription className="text-xs">{DEMO_CREDENTIALS_TEXT}</AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-email`}>Email</Label>
        <Input
          id={`${idPrefix}-email`}
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={`${idPrefix}-password`}>Password</Label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
            {...linkProps}
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id={`${idPrefix}-password`}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button className="w-full" size="lg" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className={`${dividerBgClass} px-2 text-muted-foreground`}>Or continue with</span>
        </div>
      </div>

      <Button variant="outline" className="w-full bg-transparent" size="lg" type="button">
        <GoogleIcon />
        Sign in with Google
      </Button>

      <div className="space-y-2 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Quick Login - Development
        </p>
        <div className="grid grid-cols-1 gap-2">
          {MOCK_USERS.map((user) => {
            const roleColor = ROLE_COLORS[user.role] || "bg-gray-500/10 border-gray-200 hover:bg-gray-500/20"
            const roleLabel =
              user.role.replace("_", " ").charAt(0).toUpperCase() + user.role.replace("_", " ").slice(1)

            return (
              <button
                key={user.id}
                type="button"
                onClick={() => handleQuickLogin(user.email, user.password)}
                disabled={loading}
                className={`flex flex-col items-start rounded-md border-2 p-3 text-left transition-all hover:shadow-sm disabled:opacity-50 ${roleColor}`}
              >
                <span className="font-semibold text-sm">{user.name}</span>
                <span className="text-xs opacity-75 mt-0.5">{user.email}</span>
                <span className="text-xs font-medium mt-1 px-2 py-0.5 rounded bg-white/40">{roleLabel}</span>
              </button>
            )
          })}
        </div>
      </div>
    </form>
  )
}
