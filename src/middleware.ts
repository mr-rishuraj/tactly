import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/about", "/privacy", "/playground"];
const authRoutes = ["/login", "/signup"];
const protectedRoutes = ["/dashboard", "/onboarding", "/settings", "/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there's a user in the cookies
  // Note: Client-side auth context uses localStorage, so this middleware
  // provides an additional server-side check for better security
  const userCookie = request.cookies.get("tactly_user");

  // If trying to access protected routes without authentication
  // Redirect to login page
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!userCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If trying to access auth routes while authenticated
  // Redirect to onboarding page
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (userCookie) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
