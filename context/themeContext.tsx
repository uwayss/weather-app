import React, { createContext, useState, useContext, useEffect } from "react";
import { readTheme, storeTheme } from "@/helpers/storage/theme";
import { ThemeContextValue } from "@/types/themeTypes";
import themes from "./theme";

export const themeContext = createContext<ThemeContextValue>({
  theme: themes.dark,
  toggleTheme: () => {},
  themeName: "light",
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<"dark" | "light">("light");
  useEffect(() => {
    const storedTheme = readTheme();
    if (storedTheme) {
      setThemeName(storedTheme);
      console.log("Loaded theme from storage");
    }
    return () => {
      storeTheme(themeName);
      console.log("Saved theme into storage");
    };
  }, [themeName]);
  const theme = themes[themeName];
  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };
  return (
    <themeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export const useTheme = () => useContext(themeContext);
