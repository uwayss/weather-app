import { MMKV } from "react-native-mmkv";
import { WeatherData } from "../../types/apiTypes";

const WEATHER_KEY = "weather";
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
