'use client';

import { useEffect } from 'react';
import { getMe } from '@/api/requests/auth/auth.api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/hooks/hooks';
import { setValues } from '@/store/auth/authSlice';
import AuthUserPreviewType from '@/types/auth/AuthUserPreviewType';
import useMyNotice from '@/hooks/useMyNotice';
import { NoticeEnum } from '@/enums/NoticeEnum';

export default function CallbackPage() {
    const params = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {  showMessage } = useMyNotice();

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
            router.push('/dashboard');
        };

        showMessage("Fetching", NoticeEnum.LOADING);
        initAuth();
    }, [params, dispatch, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">Loading user…</h1>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            </div>
        </div>
    );
}