import weatherDescriptions from "../constants/descriptions";

export function weatherCodeToCondition(code = undefined, isDay = undefined) {
  // TODO: implement day/night logic
  // For simplicity, we'll assume daytime for now
  // In a real-world application, you'd need to check the sunrise and sunset times to determine if it's day or night
  if (typeof code == undefined) {
    throw new Error("WeatherCodeToCondition: Weather code is null or empty");
  }
  if (typeof isDay == undefined) {
    return weatherDescriptions[code].day.description;
  }
  if (isDay) {
    return weatherDescriptions[code].day.description;
  } else {
    return weatherDescriptions[code].night.description;
  }
}
export function weatherCodeToImageURL(code = undefined, isDay = undefined) {
  if (typeof code == undefined) {
    console.warn("WeatherCodeToImageURL: Weather code is undefined");
    return null; // Or a default image URL
  }
  if (typeof isDay == undefined) {
    return weatherDescriptions[code].day.image;
  }
  if (isDay) {
    return weatherDescriptions[code].day.image;
  } else {
    return weatherDescriptions[code].night.image;
  }
}
export function processDailyWeatherData(dailyForecast) {
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

  const result = [];

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
export function processPrecipitationData(data, type = "daily") {
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
export function transformWeatherDataToChartData(weatherData) {
  const chartData = [];
  const tempFrontColor = "orange"; // Orange for Min Temp
  const tempGradientColor = "gold"; // Lighter Orange
  weatherData.forEach((dayData, index) => {
    chartData.push({
      value: Math.round(dayData.maxTemp),
      frontColor: tempFrontColor,
      gradientColor: tempGradientColor,
      spacing: 6,
      label: dayData.day, // Label only for the first in the pair
    });
  });
  return chartData;
}
export function transformHourlyDataToChartData(hourlyData) {
  const chartData = [];
  const tempFrontColor = "orange"; // Orange for Min Temp
  const tempGradientColor = "gold"; // Lighter Orange
  hourlyData.forEach((hourData) => {
    chartData.push({
      value: Math.round(hourData.temperature),
      frontColor: tempFrontColor,
      gradientColor: tempGradientColor,
      label: hourData.hour, // Label only for the first in the pair
    });
  });
  return chartData;
}
/**
 * Extracts the hourly weather data for a specific date from the provided hourly forecast.
 *
 * @param {Array} hourlyForecast - The array of hourly forecast objects.
 * @param {string} dateString - The date string in "YYYY-MM-DD" format to filter the data for.
 * @returns {Array} An array of hourly forecast objects for the specified date, or an empty array if no data is found.
 */
export function getHourlyDataForDate(hourlyForecast, dateString) {
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
