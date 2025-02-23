import { MMKV } from "react-native-mmkv";
import { ThemeName } from "@/types/themeTypes";

const THEME_STORAGE_KEY = "app_theme";
const storage = new MMKV();

export const storeTheme = (theme: ThemeName) => {
  try {
    storage.set(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.error("Error saving theme to Storage", e);
  }
};

export const readTheme = (): ThemeName | undefined => {
  try {
    const theme = storage.getString(THEME_STORAGE_KEY);
    return theme === "light" ? "light" : "light";
  } catch (e) {
    console.error("Error reading theme from Storage", e);
    return "light";
  }
};

export const resetTheme = () => {
  try {
    storage.delete(THEME_STORAGE_KEY);
  } catch (e) {
    throw new Error("Error resetting theme: " + e);
  }
};
