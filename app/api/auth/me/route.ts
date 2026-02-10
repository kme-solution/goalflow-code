import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/db"
import type { AuthResponse } from "@/lib/types/auth.types"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

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

    // Verify JWT token
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

      // Find user in database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          department: true,
          organization: true,
        },
      })

      if (!user) {
        return NextResponse.json<AuthResponse>(
          {
            success: false,
            error: "User not found",
          },
          { status: 404 },
        )
      }

      // Transform to match the expected User type
      const transformedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department?.name || "",
        title: user.name, // Using name as title for now
        avatar: user.avatar || undefined,
      }

      return NextResponse.json<AuthResponse>({
        success: true,
        user: transformedUser,
      })
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError)
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
