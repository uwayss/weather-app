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
export function weatherCodeToImageURL(code, isDay) {
  // TODO: fix this and add logic
  if (!code) {
    // Handle null or undefined code
    console.warn("WeatherCodeToImageURL: Weather code is null or undefined");
    return null; // Or a default image URL
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
export function processPrecipitationData(data) {
  if (!Array.isArray(data)) {
    throw new Error("Input must be an array.");
  }

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
}
export function transformWeatherDataToChartData(weatherData) {
  const chartData = [];
  // Hardcoded colors:
  const maxTempFrontColor = "lightblue"; // Blue for Max Temp (same as your example)
  const maxTempGradientColor = "#1E90FF"; // Lighter Blue
  const minTempFrontColor = "orange"; // Orange for Min Temp
  const minTempGradientColor = "gold"; // Lighter Orange
  weatherData.forEach((dayData, index) => {
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
  });

  return chartData;
}
