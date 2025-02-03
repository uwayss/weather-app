import { createContext, useState, useContext, useEffect } from "react"; // Import useContext
import { useColorScheme, Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import themes from "./theme"; // Import the themes object we just created

export const themeContext = createContext();
const THEME_STORAGE_KEY = "app_theme"; // Key to store theme in AsyncStorage

export default function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [themeName, setThemeName] = useState(systemColorScheme); // Initialize with system theme

  // Load theme from AsyncStorage on component mount (app startup)
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme) {
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
        await AsyncStorage.setItem(THEME_STORAGE_KEY, themeName);
        console.log("Saved theme into AsyncStorage");
      } catch (e) {
        console.error("Error saving theme to AsyncStorage:", e);
      }
    };
    saveTheme();
  }, [themeName]); // Run whenever themeName changes

  // System Appearance Change Listener
  useEffect(() => {
    const appearanceListener = Appearance.addChangeListener(
      ({ colorScheme }) => {
        setThemeName(colorScheme); // Update theme state when system theme changes
      }
    );

    return () => {
      appearanceListener.remove(); // Clean up listener on unmount
    };
  }, []); // Run only once on mount and cleanup on unmount
  const theme = themes[themeName];
  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light"); // State update will trigger useEffect to save
  };

  return (
    <themeContext.Provider value={{ theme, toggleTheme, themeName }}>
      {children}
    </themeContext.Provider>
  );
}

// Custom hook to easily use the theme context in components
export const useTheme = () => useContext(themeContext); // Create a custom hook
