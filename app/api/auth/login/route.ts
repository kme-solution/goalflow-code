import { type NextRequest, NextResponse } from "next/server"
import { MOCK_USERS } from "@/lib/mock-data/users"
import type { LoginRequest, LoginResponse } from "@/lib/types/auth.types"

export async function POST(request: NextRequest) {
  console.log("[v0] Login API route called")
  try {
    let body: LoginRequest = {} as LoginRequest;
    try {
      body = await request.json();
      console.log("[v0] Parsed request body successfully")
    } catch (parseError) {
      console.error("[v0] Request body parse error:", parseError);
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          error: "Invalid request format. Expected JSON.",
        },
        { status: 400 },
      );
    }

    const { email, password } = body;
    console.log("[v0] Login attempt - email:", email);
    if (!email || !password) {
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 },
      );
    }

    console.log("[v0] Looking for user with email:", email);

    // Find user in mock data
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Generate token (mock)
    const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));

    console.log("[v0] Login successful for user:", user.id);

    const response = NextResponse.json<LoginResponse>({
      success: true,
      user: userWithoutPassword,
      token,
    });
    // Set session cookie (mock)
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
