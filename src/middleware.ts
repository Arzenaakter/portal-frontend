import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes that require authentication
  const protectedPaths = ["/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  // Check for token in cookies (set on login)
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
