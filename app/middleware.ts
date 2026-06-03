// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth'; // Import your auth instance

export async function middleware(request: NextRequest) {
  // Define protected routes
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard) {
    // Check session using the auth API
    // We pass the request headers to better-auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware only to necessary routes to keep the rest of the site fast
  matcher: ['/dashboard/:path*'],
};
