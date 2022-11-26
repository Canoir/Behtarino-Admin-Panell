import { ThemeProvider, createTheme } from '@mui/material/styles';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { getCSSVariable } from '@utils/CSSVariables';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin]
});

type Props = {
  children: React.ReactNode;
};
export default function AppThemeProvider({ children }: Props) {
  const theme =
    process.env.REACT_APP_ENV !== 'test'
      ? createTheme({
          direction: 'rtl', // Both here and <body dir="rtl">
          spacing: 4,
          shape: { borderRadius: 8 },
          typography: {
            fontFamily: ['Dana', 'Arial', 'sans-serif'].join(',')
          },
          assistive: {
            info: {
              main: getCSSVariable('--color-assistive-info-main'),
              light: getCSSVariable('--color-assistive-info-light')
            }
          },
          bg: {
            light: getCSSVariable('--color-bg-disabled-light')
          },
          palette: {
            primary: {
              main: getCSSVariable('--color-primary-main'),
              light: getCSSVariable('--color-primary-lighter')
            },
            secondary: {
              main: getCSSVariable('--color-secondary-main')
            },
            bg: {
              primary: getCSSVariable('--color-bg-primary'),
              dark: getCSSVariable('--color-bg-dark'),
              light: getCSSVariable('--color-bg-disabled-light')
            },
            success: {
              main: getCSSVariable('--color-assistive-success'),
              light: getCSSVariable('--color-assistive-success-light'),
              lighter: getCSSVariable('--color-assistive-success-lighter'),
              dark: getCSSVariable('--color-assistive-success-dark')
            },
            error: {
              main: getCSSVariable('--color-assistive-error'),
              lighter: getCSSVariable('--color-assistive-error-lighter'),
              dark: getCSSVariable('--color-assistive-error-dark')
            },
            text: {
              primary: getCSSVariable('--color-text-primary'),
              secondary: getCSSVariable('--color-text-secondary'),
              disabled: getCSSVariable('--color-text-disabled')
            }
          },
          border: {
            light: getCSSVariable('--color-border-light')
          },
          breakpoints: {
            values: {
              xs: 0,
              sm: 769,
              md: 1024,
              lg: 1440,
              xl: 1920
            }
          }
        })
      : createTheme({
          direction: 'rtl', // Both here and <body dir="rtl">
          spacing: 4,
          shape: { borderRadius: 8 },
          bg: {
            light: '#fff'
          },
          typography: {
            fontFamily: ['Dana', 'Arial', 'sans-serif'].join(',')
          },
          assistive: {
            info: {
              main: '#fff',
              light: '#aaa'
            }
          },
          border: {
            light: '#EEE'
          }
        });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
