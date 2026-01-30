import { type NextRequest, NextResponse } from "next/server"
import { MOCK_USERS } from "@/lib/mock-data/users"
import type { AuthResponse } from "@/lib/types/auth.types"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      )
    }

    const token = authHeader.substring(7)

    // Decode token (mock)
    try {
      const decoded = JSON.parse(atob(token))
      const user = MOCK_USERS.find((u) => u.id === decoded.userId)

      if (!user) {
        return NextResponse.json<AuthResponse>(
          {
            success: false,
            error: "User not found",
          },
          { status: 404 },
        )
      }

      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json<AuthResponse>({
        success: true,
        user: userWithoutPassword,
      })
    } catch {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: "Invalid token",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        error: "An error occurred",
      },
      { status: 500 },
    )
  }
}
