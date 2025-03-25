import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { Root } from '@/components/Root.tsx';
import { EnvUnsupported } from '@/components/EnvUnsupported.tsx';
import { init } from '@/init.ts';

// import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';
import './styles/fonts.css'
// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';
import {theme} from "@/theme";
import '@telegram-apps/telegram-ui/dist/styles.css';
const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  // Configure all application dependencies.
  init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
      <Root/>
      </ThemeProvider>
    </StrictMode>,
  );
} catch (e) {
  root.render(<EnvUnsupported/>);
}
