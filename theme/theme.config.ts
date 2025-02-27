import { Theme } from "./theme.types";

export const lightTheme: Theme = {
  primary: "#007AFF",
  secondary: "#5856D6",
  accent: "#FF9500",
  background: "#FFFFFF",
  surface: "#F2F2F7",
  text: "#000000",
  error: "#FF3B30",
  success: "#34C759",
  warning: "#FF9500",
  info: "#5856D6",
  disabled: "#999999",
  placeholder: "#C7C7CC",
  backdrop: "rgba(0, 0, 0, 0.5)",
  onSurface: "#1C1C1E",
  elevation: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: "bold",
    },
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "bold",
    },
    h3: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: "bold",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "normal",
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "600",
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "normal",
    },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  primary: "#0A84FF",
  secondary: "#5E5CE6",
  accent: "#FF9F0A",
  background: "#000000",
  surface: "#1C1C1E",
  text: "#FFFFFF",
  error: "#FF453A",
  success: "#32D74B",
  warning: "#FF9F0A",
  info: "#5E5CE6",
  disabled: "#666666",
  placeholder: "#3A3A3C",
  backdrop: "rgba(0, 0, 0, 0.7)",
  onSurface: "#F2F2F7",
};
