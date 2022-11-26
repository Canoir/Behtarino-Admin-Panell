import { Theme as MUITheme, ThemeOptions as MUIThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MUITheme {
    bg: {
      main: string;
      dark: string;
      light: string;
    };
    assistive: {
      info: {
        main: string;
        light: string;
      };
    };
    border: {
      light: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions extends MUIThemeOptions {
    bg?: {
      main?: string;
      dark?: string;
      light?: string;
    };
    assistive?: {
      info?: {
        main?: string;
        light?: string;
      };
    };
    border?: {
      light?: string;
    };
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
