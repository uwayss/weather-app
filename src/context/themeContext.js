import { createContext, useState } from "react";
import { useColorScheme } from "react-native";

export const themeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(useColorScheme());
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}
