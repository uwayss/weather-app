import { MMKV } from "react-native-mmkv";
import { LocationSearchResult } from "../../types/apiTypes";

const LAST_LOCATION_KEY = "last_location";
const storage = new MMKV();
export const saveLastLocation = (location: LocationSearchResult) => {
  try {
    storage.set(LAST_LOCATION_KEY, JSON.stringify(location));
    console.log("Saved last location to Storage");
  } catch (e) {
    console.error("Error saving last location to Storage", e);
  }
};

export const readLastLocation = () => {
  //TODO: bro u need to use it
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
