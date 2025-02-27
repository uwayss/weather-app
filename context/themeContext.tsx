import React, { createContext, useState, useContext, useEffect } from "react";
import { lightTheme, darkTheme } from "@/theme/theme.config";
import { ThemeContextValue, Theme, ThemeName } from "@/theme/theme.types";
import { readTheme, storeTheme } from "@/helpers/storage";

export const themeContext = createContext<ThemeContextValue>({
  theme: darkTheme,
  toggleTheme: () => {},
  themeName: "dark",
});

type ProviderProps = {
  children: React.ReactNode;
};
export default function ThemeProvider({ children }: ProviderProps) {
  const [themeName, setThemeName] = useState<"dark" | "light">("dark");

  // Load theme from storage on component mount (app startup)
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = readTheme();
        setThemeName(storedTheme); // Use stored theme if available
        console.log("Loaded theme from storage");
      } catch (e) {
        console.error("Error loading theme from storage:", e);
      }
    };
    loadTheme();
  }, []); // Run only once on mount

  // Update storage when themeName changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        if (!themeName) return;
        storeTheme(themeName);
        console.log("Saved theme into storage");
      } catch (e) {
        console.error("Error saving theme to storage:", e);
      }
    };
    saveTheme();
  }, [themeName]);

  const theme: Theme = themeName === "light" ? lightTheme : darkTheme;
  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light"); // State update will trigger useEffect to save
  };

  return (
    <themeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}

// Custom hook to easily use the theme context in components
export const useTheme = () => useContext(themeContext); // Create a custom hook
