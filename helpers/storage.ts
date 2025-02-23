import { MMKV } from "react-native-mmkv";
import { LocationSearchResult, WeatherData } from "@/types/apiTypes";
import { LAST_LOCATION_KEY, THEME_STORAGE_KEY, WEATHER_KEY } from "@/constants/storageKeys";

const storage = new MMKV();

export const storeWeatherData = (value: WeatherData | null) => {
  try {
    storage.set(WEATHER_KEY, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving data to Storage", e);
  }
};

export function readWeatherData(): WeatherData | null {
  try {
    const jsonValue = storage.getString(WEATHER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading data from Storage", e);
    return null;
  }
}

export const resetWeatherData = () => {
  try {
    storage.delete(WEATHER_KEY);
  } catch (e) {
    throw new Error("Error resetting weather data: " + e);
  }
};

export const saveLastLocation = (location: LocationSearchResult) => {
  try {
    storage.set(LAST_LOCATION_KEY, JSON.stringify(location));
    console.log("Saved last location to Storage");
  } catch (e) {
    console.error("Error saving last location to Storage", e);
  }
};

export const readLastLocation = () => {
  try {
    const jsonValue = storage.getString(LAST_LOCATION_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading last location from Storage", e);
    return null;
  }
};

export const resetLastLocation = () => {
  try {
    storage.delete(LAST_LOCATION_KEY);
  } catch (e) {
    throw new Error("Error resetting last location: " + e);
  }
};

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
