import backgroundMappings from "../../constants/backgroundMappings";
import weatherDescriptions from "../../constants/descriptions";
import { ImageSourcePropType } from "react-native";

export const weatherCodeToBackgroundImageSource = (
  code?: number,
  isDay?: 1 | 0,
): ImageSourcePropType | undefined => {
  if (code === undefined) return backgroundMappings["default"].day;

  const weatherData = backgroundMappings[code];
  if (!weatherData) {
    console.error(`weatherCodeToBackgroundImageURL: No background mapping found for code ${code}.`);
    return undefined;
  }

  if (isDay === 0) return weatherData.night;
  if (isDay !== 1) {
    console.error(
      `weatherCodeToBackgroundImageURL: Invalid isDay value: ${isDay}. Expected 0 or 1.`,
    );
    return undefined;
  }

  return weatherData.day;
};

export const weatherCodeToCondition = (code: number, isDay?: 0 | 1) => {
  const timeOfDay = isDay === 0 ? "night" : "day";
  return weatherDescriptions[code][timeOfDay].description;
};

export const weatherCodeToImageURL = (code: number, isDay?: 0 | 1) => {
  const timeOfDay = isDay === 0 ? "night" : "day";
  return weatherDescriptions[code][timeOfDay].image;
};
