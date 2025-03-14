import { initData, useSignal } from '@telegram-apps/sdk-react';

/**
 * Hook to get the user's photo URL from Telegram or a fallback random avatar
 * @returns URL of the user's photo or a randomly generated avatar
 */
export const useUserPhoto = (): string => {
    const initDataState = useSignal(initData.state);

    // If we have user data and the user has a photoUrl, use it
    if (initDataState?.user?.photoUrl) {
        return initDataState.user.photoUrl;
    }

    // Otherwise generate a random avatar as fallback
    // We use the userId as seed if available for consistency between renders
    const seed = initDataState?.user?.id ? initDataState.user.id.toString() : Math.random().toString();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
}; 