import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { useTheme } from "./themeContext";
import { lightTheme, darkTheme } from "@/theme/paper";

type PaperThemeProviderProps = {
  children: React.ReactNode;
};

export function PaperThemeProvider({ children }: PaperThemeProviderProps) {
  const { themeName } = useTheme();
  const theme = themeName === "dark" ? darkTheme : lightTheme;

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
