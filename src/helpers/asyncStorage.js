import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeWeatherData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("weather", jsonValue);
  } catch (e) {
    throw new Error("Error saving data to AsyncStorage");
  }
};
export const readWeatherData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("weather");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    throw new Error("Error reading data from AsyncStorage");
  }
};
