export type UserRole = "hr_admin" | "manager" | "employee" | "ceo" | "team_lead" | "system_admin"

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: UserRole
  department: string
  avatar?: string
  title: string
  managerId?: string
}

export interface AuthSession {
  user: Omit<User, "password">
  token: string
  expiresAt: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  user?: Omit<User, "password">
  token?: string
  error?: string
}

export interface AuthResponse {
  success: boolean
  user?: Omit<User, "password">
  error?: string
}
