import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationSearchResult, WeatherData } from "@/types/apiTypes";
import { LAST_LOCATION_KEY, THEME_STORAGE_KEY, WEATHER_KEY } from "@/constants/storageKeys";

export const storeWeatherData = async (value: WeatherData | null) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(WEATHER_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving data to Storage", e);
  }
};
export async function readWeatherData(): Promise<WeatherData | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(WEATHER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading data from Storage", e);
    return null;
  }
}
export const resetWeatherData = async () => {
  try {
    await AsyncStorage.removeItem(WEATHER_KEY);
  } catch (e) {
    throw new Error("Error resetting weather data: " + e);
  }
};
export const saveLastLocation = async (location: LocationSearchResult) => {
  try {
    const jsonValue = JSON.stringify(location);
    await AsyncStorage.setItem(LAST_LOCATION_KEY, jsonValue);
    console.log("Saved last location to Storage");
  } catch (e) {
    console.error("Error saving last location to Storage", e);
  }
};
export const readLastLocation = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(LAST_LOCATION_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading last location from Storage", e);
    return null;
  }
};
export const resetLastLocation = async () => {
  try {
    await AsyncStorage.removeItem(LAST_LOCATION_KEY);
  } catch (e) {
    throw new Error("Error resetting last location: " + e);
  }
};
export const storeTheme = async (theme: "light" | "dark") => {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.error("Error saving theme to Storage", e);
  }
};
export const readTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return theme === "light" ? "light" : "dark";
  } catch (e) {
    console.error("Error reading theme from Storage", e);
    return "light";
  }
};
export const resetTheme = async () => {
  try {
    await AsyncStorage.removeItem(THEME_STORAGE_KEY);
  } catch (e) {
    throw new Error("Error resetting theme: " + e);
  }
};
