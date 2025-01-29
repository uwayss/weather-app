export function processDailyWeatherData(dailyForecast) { // Changed parameter to dailyForecast, expecting an array
  // No longer expecting apiResponse.daily, directly using dailyForecast

  if (!dailyForecast || !Array.isArray(dailyForecast)) { // Check if dailyForecast is a valid array
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

  for (const dayData of dailyForecast) { // Iterate directly over the array of dayData objects
    if (!dayData || typeof dayData !== 'object' || !dayData.time) { // Basic check for each dayData object
      console.error("Error: Invalid day data object within dailyForecast:", dayData);
      continue; // Skip invalid day data and continue processing other days
    }
    result.push(dayData); // Directly push the dayData object as it's already in the desired format
  }

  return result;
}