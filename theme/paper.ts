import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#007AFF",
    secondary: "#5856D6",
    background: "#FFFFFF",
    surface: "rgba(255, 255, 255, 0.5)",
    surfaceVariant: "rgba(255, 255, 255, 0.3)",
    error: "#FF3B30",
  },
  roundness: 12,
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#0A84FF",
    secondary: "#5E5CE6",
    background: "#000000",
    surface: "rgba(0, 0, 0, 0.5)",
    surfaceVariant: "rgba(0, 0, 0, 0.3)",
    error: "#FF453A",
  },
  roundness: 12,
};
