import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeatherData } from "../types/apiTypes";

export const storeWeatherData = async (value: WeatherData | null) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("weather", jsonValue);
  } catch (e) {
    console.error("Error saving data to AsyncStorage", e);
  }
};
export const readWeatherData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("weather");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading data from AsyncStorage", e);
    return null; // Return null in case of error to avoid app crash
  }
};
export const resetWeatherData = async () => {
  try {
    await AsyncStorage.removeItem("weather");
  } catch (e) {
    throw new Error("Error resetting weather data");
  }
};
