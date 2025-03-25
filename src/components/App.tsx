import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom'

import { routes } from '@/navigation/routes.tsx';
import {AppRoot} from "@telegram-apps/telegram-ui";

export function App() {
  return (
    <AppRoot
      appearance='dark'
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
