import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/db"
import type { LoginRequest, LoginResponse } from "@/lib/types/auth.types"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    let body: LoginRequest = {} as LoginRequest;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Request body parse error:", parseError);
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          error: "Invalid request format. Expected JSON.",
        },
        { status: 400 },
      );
    }

    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 },
      );
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        department: true,
        organization: true,
      },
    });

    if (!user) {
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Transform to match the expected User type
    const transformedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department?.name || "",
      title: user.name, // Using name as title for now
      avatar: user.avatar || undefined,
    };

    const response = NextResponse.json<LoginResponse>({
      success: true,
      user: transformedUser,
      token,
    });

    // Set session cookie
    response.cookies.set('session', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      // secure: true, // Uncomment if using HTTPS
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json<LoginResponse>(
      {
        success: false,
        error: "An error occurred during login",
      },
      { status: 500 },
    );
  }
}
