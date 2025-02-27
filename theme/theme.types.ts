export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  disabled: string;
  placeholder: string;
  backdrop: string;
  onSurface: string;
  elevation: {
    none: number;
    small: number;
    medium: number;
    large: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  typography: {
    h1: {
      fontSize: number;
      lineHeight: number;
      fontWeight: string;
    };
    h2: {
      fontSize: number;
      lineHeight: number;
      fontWeight: string;
    };
    h3: {
      fontSize: number;
      lineHeight: number;
      fontWeight: string;
    };
    body: {
      fontSize: number;
      lineHeight: number;
      fontWeight: string;
    };
    button: {
      fontSize: number;
      lineHeight: number;
      fontWeight: string;
    };
    caption: {
      fontSize: number;
      lineHeight: number;
      fontWeight: string;
    };
  };
}

export type ThemeName = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
}
