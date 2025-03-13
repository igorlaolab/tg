import { Placeholder, AppRoot } from '@telegram-apps/telegram-ui';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { useMemo } from 'react';

// Функция для определения темного цвета (в SDK v2 была isColorDark)
function isColorDark(color: string): boolean {
  // Преобразуем цвет в формат RGB
  const rgb = parseRGB(color);
  if (!rgb) return false;

  // Вычисляем яркость по формуле
  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  return brightness < 128;
}

// Функция для проверки строки на соответствие RGB формату (в SDK v2 была isRGB)
function parseRGB(color: string): number[] | null {
  if (!color) return null;

  // Проверяем формат rgb(r, g, b)
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
  }

  // Проверяем HEX формат #rrggbb
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return [
      parseInt(hexMatch[1], 16),
      parseInt(hexMatch[2], 16),
      parseInt(hexMatch[3], 16)
    ];
  }

  return null;
}

export function EnvUnsupported() {
  const [platform, isDark] = useMemo(() => {
    let platform = 'base';
    let isDark = false;
    try {
      const lp = retrieveLaunchParams();
      const themeParams = lp.themeParams as Record<string, string> || {};
      platform = lp.platform as string || 'base';
      isDark = themeParams.bgColor ? isColorDark(themeParams.bgColor) : false;
    } catch { /* empty */
    }

    return [platform, isDark];
  }, []);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(platform) ? 'ios' : 'base'}
    >
      <Placeholder
        header="Oops"
        description="You are using too old Telegram client to run this application"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    </AppRoot>
  );
}