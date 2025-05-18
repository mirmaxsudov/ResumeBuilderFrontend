import { cookies } from 'next/headers'
import Role from '@/enums/Role'
import { redirect } from 'next/navigation'

type ServerAuthCheckerProps = {
    children: React.ReactNode
    roles: Role[]
    withAuth: boolean
}

export default async function ServerAuthChecker({ 
    children, 
    roles, 
    withAuth 
}: ServerAuthCheckerProps) {
    if (!withAuth) {
        return <>{children}</>
    }

    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const userCookie = cookieStore.get('user')?.value

    if (!token || !userCookie) {
        redirect('/login')
    }

    const user = JSON.parse(userCookie)
    const hasRequiredRole = user.roles.some((role: Role) => roles.includes(role))

    if (!hasRequiredRole) {
        redirect('/forbidden')
    }

    return <>{children}</>
} 