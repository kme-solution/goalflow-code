import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/public',
  '/docs',
  '/pricing',
  '/features'
]
export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  console.log("proxy - Requested Path:", pathname)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next()
  }

  // Check for session token in cookies
  const token = request.cookies.get("session")?.value

  // Redirect unauthenticated users to login
  if (!token) {
    console.log("proxy - No session token found, redirecting to /login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
}
