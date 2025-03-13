import { miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react'

import { routes } from '@/navigation/routes.tsx';
import { useLaunchParams } from '@/hooks/useLaunchParams';

// Объявляем типы для Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        setupSwipeBehavior?: (params: { swipe_enabled: boolean }) => void;
      };
    };
  }
}

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  useEffect(() => {
    // В версии 3 API изменился, поэтому используем более безопасную проверку
    try {
      if (typeof window !== 'undefined' &&
        window.Telegram &&
        window.Telegram.WebApp &&
        typeof window.Telegram.WebApp.setupSwipeBehavior === 'function') {
        window.Telegram.WebApp.setupSwipeBehavior({ swipe_enabled: false });
      }
    } catch (error) {
      console.error('Ошибка при настройке swipeBehavior:', error);
    }
  }, []);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform as string) ? 'ios' : 'base'}
    >
      <BrowserRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppRoot>
  );
}
