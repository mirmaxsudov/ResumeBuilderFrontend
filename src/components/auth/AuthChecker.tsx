'use client'

import Role from '@/enums/Role'
import { redirect, useRouter } from 'next/navigation'
import { useAppSelector } from '@/hooks/hooks'
import { useEffect } from 'react'

type AuthCheckerProps = {
    children: React.ReactNode
    roles: Role[]
    withAuth: boolean
}

export default function AuthChecker({
    children,
    roles,
    withAuth
}: AuthCheckerProps) {
    const router = useRouter();
    const { token, user } = useAppSelector((state) => state.auth);

    console.log(window.location.href);

    useEffect(() => {
        if (!withAuth) return;

        if (!withAuth || !token) {
            router.push('/login');
            return;
        }

        if (user && user.roles) {
            const hasRequiredRole = user.roles.some((role: Role) => roles.includes(role));
            if (!hasRequiredRole)
                router.push('/forbidden');
        }

    }, [token, user, roles, withAuth, router]);

    if (!withAuth)
        return <>{children}</>;

    if (!token)
        return null;

    if (user && user.roles) {
        const hasRequiredRole = user.roles.some((role: Role) => roles.includes(role));
        if (!hasRequiredRole) {
            return null;
        }
    }

    return <>{children}</>;
}