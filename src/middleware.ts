import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Only protect authenticated sections; leave public pages (like "/") alone
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    // If not authenticated, send to login and preserve intended path
    if (!token) {
        const url = new URL('/login', request.url)
        url.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Run middleware only on protected routes
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/cover-page/:path*',
    ],
}