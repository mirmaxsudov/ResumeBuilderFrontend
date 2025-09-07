'use client';

import { useEffect } from 'react';
import { getMe } from '@/api/requests/auth/auth.api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/hooks/hooks';
import { setValues } from '@/store/auth/authSlice';
import AuthUserPreviewType from '@/types/auth/AuthUserPreviewType';
import useMyNotice from '@/hooks/useMyNotice';
import { NoticeEnum } from '@/enums/NoticeEnum';
import LoadingAnimation from '@/helpers/LoadingAnimation';

export default function CallbackPage() {
    const params = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { showMessage } = useMyNotice();

    useEffect(() => {
        const initAuth = async () => {
            const token = params.get('token');
            if (!token) {
                showMessage("Something went wrong, Try again!", NoticeEnum.ERROR)
                router.push('/login');
                return;
            }

            dispatch(setValues({ token, user: {} as AuthUserPreviewType }));

            try {
                const response = await getMe();
                const user = response.data as AuthUserPreviewType;

                dispatch(setValues({ token: user.accessToken, user }));
            } catch (err) {
                console.error(err);
            }

            showMessage("Successfully", NoticeEnum.SUCCESS)

            // Determine where to go after auth
            let target = '/dashboard';
            try {
                const param = params.get('redirect');
                let saved: string | null = null;
                try { saved = localStorage.getItem('redirectAfterLogin'); } catch (e) { /* ignore */ }
                const candidate = param || saved;
                if (candidate && candidate.startsWith('/')) {
                    target = candidate;
                }
                if (saved) localStorage.removeItem('redirectAfterLogin');
            } catch (e) {
                // ignore errors and fallback to dashboard
            }

            router.push(target);
        };

        showMessage("Fetching", NoticeEnum.LOADING);
        initAuth();
    }, [params, dispatch, router]);

    return (
        <LoadingAnimation title='Loading user' />
    );
}
