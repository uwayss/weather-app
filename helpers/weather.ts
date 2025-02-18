import weatherDescriptions from "@/constants/descriptions";
import backgroundMappings from "@/constants/backgroundMappings"; // Adjust path if needed
import { DayWeather, HourWeather, WeatherData } from "@/types/apiTypes";
import { ImageSourcePropType } from "react-native";
import { getPublicIP, getLocationFromIP } from "@/helpers/api";
import FetchWeather from "@/hooks/useFetchWeather";
import { readWeatherData, storeWeatherData } from "./storage";

export async function fetchWeatherDataForContext(
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>,
) {
  try {
    const previousWeatherData = await readWeatherData();
    if (!isValidWeatherData(previousWeatherData)) {
      await getWeatherDataFromPublicIp(setWeather);
      return;
    }
    console.log("Using previous weather data");
    return setWeather(previousWeatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setWeather(null); // Set weather to null in case of any error
  }
}

export async function getWeatherDataFromPublicIp(
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>,
) {
  console.log("Generating new data based on public IP address");
  const publicIP = await getPublicIP();
  if (!publicIP) {
    console.warn("Could not get location from IP. Weather data might be unavailable.");
    setWeather(null); // Or set to a specific error state if needed
    return;
  }
  const locationData = await getLocationFromIP(publicIP);
  if (!locationData) {
    console.warn("Could not get location from IP. Weather data might be unavailable.");
    setWeather(null);
    return;
  }
  const { lat, lon, city, regionName, country } = locationData;
  const newWeatherData = await FetchWeather({
    lat,
    lon,
    name: city,
    display_name: `${city}, ${regionName}, ${country}`,
    address: {
      country,
    },
  });
  storeWeatherData(newWeatherData);
  console.log("Saved weather data into storage");
  return setWeather(newWeatherData);
}
export function isValidWeatherData(weatherData: WeatherData | null): WeatherData | null {
  if (weatherData && weatherData.currentWeather) {
    console.warn("Valid weather data found in storage");
    return weatherData;
  }
  return null;
}
export function calculateMinMax(
  data: {
    day: string;
    minTemp: number;
    maxTemp: number;
  }[],
) {
  const minTemps = data.map((element) => Math.round(element.minTemp) || 0);
  const maxTemps = data.map((element) => Math.round(element.maxTemp) || 0);
  return {
    max: Math.max(...maxTemps),
    min: Math.min(...minTemps),
  };
}

export function weatherCodeToBackgroundImageSource(
  code?: number,
  isDay?: 1 | 0,
): ImageSourcePropType | undefined {
  if (code === undefined) {
    return backgroundMappings["default"].day;
  }
  const weatherData = backgroundMappings[code];

  if (!weatherData) {
    console.warn(`weatherCodeToBackgroundImageURL: No background mapping found for code ${code}.`);
    return undefined; // Or a default image URL
  }

  let imageSource = weatherData.day; // Default to day

  if (isDay === 0) {
    imageSource = weatherData.night;
  } else if (isDay !== 1 && isDay !== undefined) {
    console.warn(
      `weatherCodeToBackgroundImageURL: Invalid isDay value: ${isDay}.  Expected 0 or 1.`,
    );
    return undefined; // Or a default image URL
  }

  return imageSource;
}

export function weatherCodeToCondition(code: number, isDay?: 0 | 1) {
  const timeOfDay = isDay === 0 ? "night" : "day";
  return weatherDescriptions[code][timeOfDay].description;
}

export function weatherCodeToImageURL(code: number, isDay?: 0 | 1) {
  const timeOfDay = isDay === 0 ? "night" : "day";
  return weatherDescriptions[code][timeOfDay].image;
}

export function processDailyWeatherData(dailyForecast: DayWeather[]): DayWeather[] | null {
  if (!Array.isArray(dailyForecast)) {
    console.error("Error: Invalid input to processDailyWeatherData. Expected an array.");
    return null;
  }

  if (dailyForecast.length === 0) {
    console.warn("Warning: Empty dailyForecast array provided.");
    return [];
  }

  const result: DayWeather[] = [];

  for (const dayData of dailyForecast) {
    if (!dayData || typeof dayData !== "object" || !dayData.time) {
      console.error("Error: Invalid day data object within dailyForecast:", dayData);
      continue;
    }
    result.push(dayData);
  }

  return result;
}

export function processPrecipitationData(
  data: { day?: string; hour?: string; precipitation: number }[],
  type = "daily",
) {
  if (!Array.isArray(data)) {
    throw new Error("Input must be an array.");
  }

  return data.map((item) => {
    if (type === "daily") {
      if (
        typeof item !== "object" ||
        item === null ||
        !item.day ||
        item.precipitation === null ||
        item.precipitation === undefined
      ) {
        throw new Error(
          "Invalid data format in array. Each object must have 'day' and 'precipitation' properties.",
        );
      }
      return {
        label: item.day,
        value: item.precipitation,
      };
    } else {
      if (
        typeof item !== "object" ||
        item === null ||
        item.hour === null ||
        item.hour === undefined ||
        item.precipitation === null ||
        item.precipitation === undefined
      ) {
        throw new Error(
          "Invalid data format in array. Each object must have 'hour' and 'precipitation' properties.",
        );
      }
      return {
        value: item.precipitation,
        label: item.hour,
      };
    }
  });
}

type ChartDataProp = {
  value: number;
  frontColor?: string;
  gradientColor?: string;
  spacing?: number;
  label?: string;
};

export function transformWeatherDataToChartData(
  weatherData: { day: string; minTemp: number; maxTemp: number }[],
) {
  const chartData: ChartDataProp[] = [];
  const maxTempFrontColor = "lightblue";
  const maxTempGradientColor = "#1E90FF";
  const minTempFrontColor = "orange";
  const minTempGradientColor = "gold";

  weatherData.forEach((dayData) => {
    chartData.push({
      value: Math.round(dayData.maxTemp),
      frontColor: minTempFrontColor,
      gradientColor: minTempGradientColor,
      spacing: 6,
      label: dayData.day,
    });
    chartData.push({
      value: Math.round(dayData.minTemp),
      frontColor: maxTempFrontColor,
      gradientColor: maxTempGradientColor,
    });
  });

  return chartData;
}

export function transformHourlyDataToChartData(
  hourlyData: { hour: string; temperature: number }[],
) {
  if (!Array.isArray(hourlyData)) {
    console.error("transformHourlyDataToChartData: hourlyData is not an array", hourlyData);
    return [];
  }

  const chartData: ChartDataProp[] = hourlyData.map((hourData) => ({
    value: Math.round(hourData.temperature),
    frontColor: "orange",
    gradientColor: "gold",
    label: hourData.hour,
  }));
  return chartData;
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

  return hourlyForecast.filter((hourlyData) => {
    const dataDate = hourlyData.time.split("T")[0];
    return dataDate === dateString;
  });
}
