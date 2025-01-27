export function processDailyWeatherData(apiResponse) {
  const dailyData = apiResponse.daily;
  const result = [];

  if (!dailyData || !dailyData.time) {
    console.error(
      "Error: Daily data or 'time' property is missing in the API response."
    );
    return null; // Or return an empty array [] if you prefer in case of error
  }

  const dailyTimes = dailyData.time;
  const numDays = dailyTimes.length;

  // Check if all daily data arrays have the same length as 'time' for consistency
  for (const key in dailyData) {
    if (Array.isArray(dailyData[key]) && dailyData[key].length !== numDays) {
      console.error(
        `Error: Daily data property '${key}' has an inconsistent length.`
      );
      return null; // Or return an empty array []
    }
  }

  for (let i = 0; i < numDays; i++) {
    const dayData = {}; // Create an empty object for each day
    for (const key in dailyData) {
      if (Array.isArray(dailyData[key])) {
        dayData[key] = dailyData[key][i]; // Get the value at index 'i' for each property
      }
    }
    result.push(dayData);
  }

  return result;
}
