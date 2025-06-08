import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleCallback = async (code: string, state: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, state }),
            });

            if (!response.ok) {
                throw new Error('Callback failed');
            }

            const data = await response.json();
            
            // Store the token and user data in cookies
            document.cookie = `token=${data.token}; path=/`;
            document.cookie = `user=${JSON.stringify(data.user)}; path=/`;

            return data;
        } catch (error) {
            console.error('Callback error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleCallback,
    };
}; 