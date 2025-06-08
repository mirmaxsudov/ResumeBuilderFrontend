import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Role from '@/enums/Role'

// Add paths that don't require authentication
const publicPaths = ['/login', '/register', '/forbidden', '/callback']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const user = request.cookies.get('user')?.value
    const path = request.nextUrl.pathname

    // Allow public paths
    if (publicPaths.includes(path)) {
        return NextResponse.next()
    }

    // Check if user is authenticated
    if (!token || !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Parse user data
    const userData = JSON.parse(user)

    // Check role-based access
    const isDashboardRoute = path.startsWith('/dashboard')
    if (isDashboardRoute) {
        const hasRequiredRole = userData.roles.some((role: Role) => 
            Object.values(Role).includes(role)
        )

        if (!hasRequiredRole) {
            return NextResponse.redirect(new URL('/forbidden', request.url))
        }
    }

    return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
} 