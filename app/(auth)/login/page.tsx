"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MOCK_USERS } from "@/lib/mock-data/users"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      router.push("/dashboard")
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

    console.log("Quick login result:", result)
    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Login failed")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Target className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Sign in to your GoalFlow Pro account</CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert>
              <AlertDescription className="text-xs">
                <strong>Demo Credentials:</strong>
                <br />
                HR Admin: hr@goalflow.com / password123
                <br />
                Manager: manager@goalflow.com / password123
                <br />
                Employee: employee@goalflow.com / password123
                <br />
                CEO: ceo@goalflow.com / password123
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
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
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent" size="lg">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>

            <div className="space-y-2 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Quick Login - Development
              </p>
              <div className="grid grid-cols-1 gap-2">
                {MOCK_USERS.map((user) => {
                  const roleColors: Record<string, string> = {
                    hr_admin: "bg-blue-500/10 border-blue-200 hover:bg-blue-500/20 text-blue-900",
                    manager: "bg-purple-500/10 border-purple-200 hover:bg-purple-500/20 text-purple-900",
                    employee: "bg-green-500/10 border-green-200 hover:bg-green-500/20 text-green-900",
                    ceo: "bg-amber-500/10 border-amber-200 hover:bg-amber-500/20 text-amber-900",
                    team_lead: "bg-rose-500/10 border-rose-200 hover:bg-rose-500/20 text-rose-900",
                  }

                  const roleColor = roleColors[user.role] || "bg-gray-500/10 border-gray-200 hover:bg-gray-500/20"

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
                      <span className="text-xs font-medium mt-1 px-2 py-0.5 rounded bg-white/40">
                        {user.role.replace("_", " ").charAt(0).toUpperCase() + user.role.replace("_", " ").slice(1)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
