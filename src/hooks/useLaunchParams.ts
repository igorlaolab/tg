import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useMemo } from 'react';

/**
 * A hook that returns the mini application's launch parameters.
 * Replacement for the removed hook in v3 of the SDK.
 * 
 * @returns Launch parameters of the mini app
 */
export const useLaunchParams = () => {
    // Используем явное возвращаемое значение функции, без типизации результата
    return useMemo(() => retrieveLaunchParams(), []);
}; 