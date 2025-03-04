import weatherDescriptions from "@/constants/descriptions";
import backgroundMappings from "@/constants/backgroundMappings"; // Adjust path if needed
import {
  DayWeather,
  HourlyTemperatureGraphProps,
  HourWeather,
  RainProbGraphProps,
  WeatherData,
} from "@/types/apiTypes";
import { ImageSourcePropType } from "react-native";
import { getPublicIP, getLocationFromIP } from "@/helpers/api";
import FetchWeather from "@/hooks/useFetchWeather";
import { readWeatherData, storeWeatherData } from "./storage";

export function findDayWeatherFromTime(
  time: string,
  dailyForecast: DayWeather[] | undefined,
): DayWeather | null {
  if (dailyForecast === undefined) return null;
  const day = dailyForecast.find((day) => day.time.split("T")[0] === time);
  if (!day) return null;
  return day;
}

export async function fetchWeatherDataForContext(
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>,
) {
  try {
    const previousWeatherData = readWeatherData();
    if (isValidWeatherData(previousWeatherData)) {
      console.log("Using previous weather data");
      return setWeather(previousWeatherData);
    }
    await getWeatherDataFromPublicIp(setWeather);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setWeather(null);
  }
}

async function fetchWeatherByIP(
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>,
) {
  const publicIP = await getPublicIP();
  if (!publicIP) {
    console.error("Could not get location from IP. Weather data might be unavailable.");
    return setWeather(null);
  }

  const locationData = await getLocationFromIP(publicIP);
  if (!locationData) {
    console.error("Could not get location from IP. Weather data might be unavailable.");
    return setWeather(null);
  }

  const { lat, lon, city, regionName, country } = locationData;
  const newWeatherData = await FetchWeather({
    lat,
    lon,
    name: city,
    display_name: `${city}, ${regionName}, ${country}`,
    address: { country },
  });

  storeWeatherData(newWeatherData);
  console.log("Saved weather data into storage");
  setWeather(newWeatherData);
}

export async function getWeatherDataFromPublicIp(
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>,
) {
  console.log("Generating new data based on public IP address");
  try {
    await fetchWeatherByIP(setWeather);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setWeather(null);
  }
}

export function isValidWeatherData(weatherData: WeatherData | null): WeatherData | null {
  if (weatherData?.currentWeather) {
    console.log("Valid weather data found in storage");
    return weatherData;
  }
  return null;
}

export const calculateMinMax = (data: { day: string; minTemp: number; maxTemp: number }[]) => {
  const minTemps = data.map((element) => Math.round(element.minTemp) || 0);
  const maxTemps = data.map((element) => Math.round(element.maxTemp) || 0);
  return { max: Math.max(...maxTemps), min: Math.min(...minTemps) };
};

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

export function processDailyWeatherData(dailyForecast: DayWeather[]): DayWeather[] | null {
  if (!Array.isArray(dailyForecast)) {
    console.error("Error: Invalid input to processDailyWeatherData. Expected an array.");
    return null;
  }

  if (dailyForecast.length === 0) {
    console.error("Warning: Empty dailyForecast array provided.");
    return [];
  }

  return dailyForecast.filter((dayData) => dayData && typeof dayData === "object" && dayData.time);
}

export function processPrecipitationData(data: RainProbGraphProps, type = "daily") {
  if (!Array.isArray(data)) {
    throw new Error("Input must be an array.");
  }

  return data.map((item) => {
    const baseError = "Invalid data format in array. Each object must have";
    if (type === "daily") {
      if (
        typeof item !== "object" ||
        item === null ||
        !item.day ||
        item.precipitation === null ||
        item.precipitation === undefined
      ) {
        throw new Error(`${baseError} 'day' and 'precipitation' properties.`);
      }
      return { label: item.day, value: item.precipitation };
    } else {
      if (
        typeof item !== "object" ||
        item === null ||
        item.hour === null ||
        item.hour === undefined ||
        item.precipitation === null ||
        item.precipitation === undefined
      ) {
        throw new Error(`${baseError} 'hour' and 'precipitation' properties.`);
      }
      return { value: item.precipitation, label: item.hour };
    }
  });
}

export function transformWeatherDataToChartData(
  weatherData: { day: string; minTemp: number; maxTemp: number }[],
) {
  const maxTempFrontColor = "lightblue";
  const maxTempGradientColor = "#1E90FF";
  const minTempFrontColor = "orange";
  const minTempGradientColor = "gold";

  return weatherData.flatMap((dayData) => [
    {
      value: Math.round(dayData.maxTemp),
      frontColor: minTempFrontColor,
      gradientColor: minTempGradientColor,
      spacing: 6,
      label: dayData.day,
    },
    {
      value: Math.round(dayData.minTemp),
      frontColor: maxTempFrontColor,
      gradientColor: maxTempGradientColor,
    },
  ]);
}

export function transformHourlyDataToChartData(hourlyData: HourlyTemperatureGraphProps) {
  if (!Array.isArray(hourlyData)) {
    console.error("transformHourlyDataToChartData: hourlyData is not an array", hourlyData);
    return [];
  }

  return hourlyData.map((hourData) => ({
    value: Math.round(hourData.temperature),
    frontColor: "orange",
    gradientColor: "gold",
    label: hourData.hour,
  }));
}

export function getHourlyDataForDate(hourlyForecast: HourWeather[], dateString: string) {
  if (!hourlyForecast || !Array.isArray(hourlyForecast)) {
    console.error("getHourlyDataForDate: Invalid hourlyForecast provided:", hourlyForecast);
    return [];
  }

  if (!dateString || typeof dateString !== "string") {
    console.error("getHourlyDataForDate: Invalid dateString provided:", dateString);
    return [];
  }

  return hourlyForecast.filter((hourlyData) => hourlyData.time.split("T")[0] === dateString);
}
