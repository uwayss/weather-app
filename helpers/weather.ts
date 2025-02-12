import weatherDescriptions from "../constants/descriptions";
import backgroundMappings from "../constants/backgroundMappings"; // Adjust path if needed
import {
  DaysForecast,
  HoursForecast,
  DayWeather,
  HourWeather,
} from "../types/apiTypes";
import { ImageSourcePropType } from "react-native";

export function weatherCodeToBackgroundImageSource(
  code?: number,
  isDay?: 1 | 0
): ImageSourcePropType | undefined {
  if (typeof code === "undefined") {
    return backgroundMappings["default"].day;
  }
  const weatherData = backgroundMappings[code];

  if (!weatherData) {
    console.warn(
      `weatherCodeToBackgroundImageURL: No background mapping found for code ${code}.`
    );
    return undefined; // Or a default image URL
  }

  if (typeof isDay === "undefined") {
    // If isDay is undefined, default to day (1)
    return weatherData.day;
  }

  if (isDay === 1) {
    return weatherData.day;
  } else if (isDay === 0) {
    return weatherData.night;
  } else {
    console.warn(
      `weatherCodeToBackgroundImageURL: Invalid isDay value: ${isDay}.  Expected 0 or 1.`
    );
    return undefined; // Or a default image URL
  }
}
export function weatherCodeToCondition(code: number, isDay?: 0 | 1) {
  if (typeof isDay == undefined) {
    return weatherDescriptions[code].day.description;
  }
  if (isDay) {
    return weatherDescriptions[code].day.description;
  } else {
    return weatherDescriptions[code].night.description;
  }
}
export function weatherCodeToImageURL(code: number, isDay?: 0 | 1) {
  if (typeof isDay == undefined) {
    return weatherDescriptions[code].day.image;
  }
  if (isDay) {
    return weatherDescriptions[code].day.image;
  } else {
    return weatherDescriptions[code].night.image;
  }
}
export function processDailyWeatherData(
  dailyForecast: DayWeather[]
): DayWeather[] | null {
  // Changed parameter to dailyForecast, expecting an array
  // No longer expecting apiResponse.daily, directly using dailyForecast
  if (!dailyForecast || !Array.isArray(dailyForecast)) {
    // Check if dailyForecast is a valid array
    console.error(
      "Error: Invalid input to processDailyWeatherData. Expected an array of daily forecast objects."
    );
    return null;
  }

  if (dailyForecast.length === 0) {
    console.warn("Warning: Empty dailyForecast array provided.");
    return []; // Return empty array if the forecast is empty, not null
  }

  const result: any[] = [];

  for (const dayData of dailyForecast) {
    // Iterate directly over the array of dayData objects
    if (!dayData || typeof dayData !== "object" || !dayData.time) {
      // Basic check for each dayData object
      console.error(
        "Error: Invalid day data object within dailyForecast:",
        dayData
      );
      continue; // Skip invalid day data and continue processing other days
    }
    result.push(dayData); // Directly push the dayData object as it's already in the desired format
  }

  return result;
}
export function processPrecipitationData(
  data: { day?: string; hour?: string; precipitation: number }[],
  type = "daily"
) {
  if (!Array.isArray(data)) {
    throw new Error("Input must be an array.");
  }
  if (type == "daily") {
    return data.map((item) => {
      if (
        typeof item !== "object" ||
        item === null ||
        !item.day ||
        item.precipitation === null ||
        item.precipitation === undefined
      ) {
        throw new Error(
          "Invalid data format in array. Each object must have 'day' and 'precipitation' properties."
        );
      }
      return {
        label: item.day,
        value: item.precipitation,
      };
    });
  } else {
    return data.map((item) => {
      if (
        typeof item !== "object" ||
        item === null ||
        item.hour === null ||
        item.hour === undefined ||
        item.precipitation === null ||
        item.precipitation === undefined
      ) {
        throw new Error(
          "Invalid data format in array. Each object must have 'hour' and 'precipitation' properties."
        );
      }
      return {
        value: item.precipitation,
        label: item.hour,
      };
    });
  }
}
type ChartDataProp = {
  value: number;
  frontColor?: string;
  gradientColor?: string;
  spacing?: number;
  label?: string;
};
export function transformWeatherDataToChartData(
  weatherData: { day: string; minTemp: number; maxTemp: number }[]
) {
  const chartData: ChartDataProp[] = [];
  const maxTempFrontColor = "lightblue"; // Blue for Max Temp (same as your example)
  const maxTempGradientColor = "#1E90FF"; // Lighter Blue
  const minTempFrontColor = "orange"; // Orange for Min Temp
  const minTempGradientColor = "gold"; // Lighter Orange
  weatherData.forEach(
    (dayData: { day: string; minTemp: number; maxTemp: number }) => {
      chartData.push({
        value: Math.round(dayData.maxTemp),
        frontColor: minTempFrontColor,
        gradientColor: minTempGradientColor,
        spacing: 6,
        label: dayData.day, // Label only for the first in the pair
      });
      chartData.push({
        value: Math.round(dayData.minTemp),
        frontColor: maxTempFrontColor,
        gradientColor: maxTempGradientColor,
      });
    }
  );
  return chartData;
}
export function transformHourlyDataToChartData(hourlyData: HourWeather[]) {
  const chartData: ChartDataProp[] = [];
  const tempFrontColor = "orange"; // Orange for Min Temp
  const tempGradientColor = "gold"; // Lighter Orange
  hourlyData.forEach((hourData: HourWeather) => {
    chartData.push({
      value: Math.round(hourData.temperature),
      frontColor: tempFrontColor,
      gradientColor: tempGradientColor,
      label: hourData.time, // Label only for the first in the pair
    });
  });
  return chartData;
}
export function getHourlyDataForDate(
  hourlyForecast: HourWeather[],
  dateString: string
) {
  if (!hourlyForecast || !Array.isArray(hourlyForecast)) {
    console.error(
      "getHourlyDataForDate: Invalid hourlyForecast provided:",
      hourlyForecast
    );
    return [];
  }

  if (!dateString || typeof dateString !== "string") {
    console.error(
      "getHourlyDataForDate: Invalid dateString provided:",
      dateString
    );
    return [];
  }

  return hourlyForecast.filter((hourlyData) => {
    // Extract the date part from the hourlyData.time (which is in ISO 8601 format)
    const dataDate = hourlyData.time.split("T")[0];
    return dataDate === dateString;
  });
}
