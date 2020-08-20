import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function TestUserAgent(win = window, expr) {
  return expr.test(win.navigator.userAgent);
}

export function IsIpad(win = window) {
  return TestUserAgent(win, /iPad/i);
}

export function IsIphone(win = window) {
  return TestUserAgent(win, /iPhone/i);
}

export function IsIOS(win = window) {
  return TestUserAgent(win, /iPad|iPhone|iPod/i);
}

export function IsAndroid(win = window) {
  return TestUserAgent(win, /android/i);
}

export function IsMobile(win = window) {
  return IsIOS(win) || IsAndroid(win);
}

export function IsDesktop(win = window) {
  return !IsIOS(win) && !IsAndroid(win);
}

export function IsDesktopScreenSize() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });
}

export const PLATFORM_CONFIGS = [
  {
    name: 'ipad',
    isMatch: IsIpad
  },
  {
    name: 'iphone',
    isMatch: IsIphone
  },
  {
    name: 'ios',
    isMatch: IsIOS
  },
  {
    name: 'android',
    isMatch: IsAndroid
  },
  {
    name: 'mobile',
    isMatch: IsMobile
  },
  {
    name: 'desktop',
    isMatch: IsDesktop
  }
];

export function detectPlatform(win = window, platforms = PLATFORM_CONFIGS) {
  return platforms.filter((p) => p.isMatch(win));
}
