import Role from '@/enums/Role'
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie'

type AuthCheckerProps = {
    children: React.ReactNode
    roles: Role[]
    withAuth: boolean
}

export default async function AuthChecker({
    children,
    roles,
    withAuth
}: AuthCheckerProps) {
    if (!withAuth) {
        return <>{children}</>
    }

    const token = Cookies.get('token')
    const user = (Cookies.get('user')) ? JSON.parse(Cookies.get('user')!) : null

    if (!token)
        redirect('/login')

    const hasRequiredRole = user.roles.some((role: Role) => roles.includes(role))

    if (!hasRequiredRole) {
        redirect('/forbidden')
    }

    return <>{children}</>
}