// lib/auth.server.ts - Server-side authentication utilities

import jwt from "jsonwebtoken"
import { prisma } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface ServerUser {
    id: string
    email: string
    name: string
    role: string
    organizationId: string
    departmentId?: string
    managerId?: string
    avatar?: string
}

export async function getUserFromToken(request: Request): Promise<ServerUser | null> {
    try {
        const authHeader = request.headers.get("authorization")

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return null
        }

        const token = authHeader.substring(7)

        // Verify JWT token
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
            return null
        }

        // Return user data needed for API routes
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            organizationId: user.organizationId || "",
            departmentId: user.departmentId || undefined,
            managerId: user.managerId || undefined,
            avatar: user.avatar || undefined,
        }
    } catch (error) {
        console.error("Error verifying token:", error)
        return null
    }
}