// src/context/themeContext.js
import { createContext, useState, useContext } from "react"; // Import useContext
import { useColorScheme } from "react-native";
import themes from "./theme"; // Import the themes object we just created

export const themeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const colorScheme = useColorScheme(); // Get system color scheme
  const [themeName, setThemeName] = useState(colorScheme);
  const theme = themes[themeName];

  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  return (
    <themeContext.Provider value={{ theme, toggleTheme, themeName }}>
      {children}
    </themeContext.Provider>
  );
}

// Custom hook to easily use the theme context in components
export const useTheme = () => useContext(themeContext); // Create a custom hook