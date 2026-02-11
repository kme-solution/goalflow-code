import type React from "react"

export const DEMO_CREDENTIALS_TEXT: React.ReactNode = (
  <>
    <strong>Demo Credentials:</strong>
    <br />
    HR Admin: hr@goalflow.com / password123
    <br />
    Manager: manager@goalflow.com / password123
    <br />
    Employee: employee@goalflow.com / password123
    <br />
    CEO: ceo@goalflow.com / password123
  </>
)

export const ROLE_COLORS: Record<string, string> = {
  hr_admin: "bg-blue-500/10 border-blue-200 hover:bg-blue-500/20 text-blue-900",
  manager: "bg-purple-500/10 border-purple-200 hover:bg-purple-500/20 text-purple-900",
  employee: "bg-green-500/10 border-green-200 hover:bg-green-500/20 text-green-900",
  ceo: "bg-amber-500/10 border-amber-200 hover:bg-amber-500/20 text-amber-900",
  team_lead: "bg-rose-500/10 border-rose-200 hover:bg-rose-500/20 text-rose-900",
}

export const GoogleIcon = () => (
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
)
