import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import themes from "./theme"; // Import the themes object we just created
import { ThemeContextValue } from "@/types/themeTypes";
const THEME_STORAGE_KEY = "app_theme"; // Key to store theme in AsyncStorage

export const themeContext = createContext<ThemeContextValue>({
  theme: themes.dark,
  toggleTheme: () => {},
  themeName: "dark",
});

type ProviderProps = {
  children: React.ReactNode;
};
export default function ThemeProvider({ children }: ProviderProps) {
  const [themeName, setThemeName] = useState<"dark" | "light">("dark");

  // Load theme from AsyncStorage on component mount (app startup)
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === "light" || storedTheme === "dark") {
          setThemeName(storedTheme); // Use stored theme if available
          console.log("Loaded theme from AsyncStorage");
        }
      } catch (e) {
        console.error("Error loading theme from AsyncStorage:", e);
      }
    };
    loadTheme();
  }, []); // Run only once on mount

  // Update AsyncStorage when themeName changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        if (!themeName) return;
        await AsyncStorage.setItem(THEME_STORAGE_KEY, themeName);
        console.log("Saved theme into AsyncStorage");
      } catch (e) {
        console.error("Error saving theme to AsyncStorage:", e);
      }
    };
    saveTheme();
  }, [themeName]); // Run whenever themeName changes

  if (themeName) {
    const theme = themes[themeName];
    const toggleTheme = () => {
      setThemeName(themeName === "light" ? "dark" : "light"); // State update will trigger useEffect to save
    };
    return (
      <themeContext.Provider value={{ theme, themeName, toggleTheme }}>
        {children}
      </themeContext.Provider>
    );
  }
}

// Custom hook to easily use the theme context in components
export const useTheme = () => useContext(themeContext); // Create a custom hook
