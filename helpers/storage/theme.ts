import { MMKV } from "react-native-mmkv";
import { THEME_STORAGE_KEY } from "../../constants/storageKeys";

const storage = new MMKV();

export const storeTheme = (theme: "light" | "dark") => {
  try {
    storage.set(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.error("Error saving theme to Storage", e);
  }
};

export const readTheme = () => {
  try {
    const theme = storage.getString(THEME_STORAGE_KEY);
    return theme === "light" ? "light" : "dark";
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
