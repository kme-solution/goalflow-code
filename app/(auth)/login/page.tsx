"use client"

import Link from "next/link"
import { Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/auth"

export default function LoginPage() {
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

        <CardContent>
          <LoginForm idPrefix="page" />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
