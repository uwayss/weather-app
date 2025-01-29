import { getEndpoint } from "../constants/api.js";
import { storeWeatherData } from "../helpers/asyncStorage.js";
import { defaultWeather } from "../constants/weather.js"; // Import defaultWeather

export default async function FetchWeather(location) {
  try {
    const endpoint = getEndpoint(location.lat, location.lon);
    const response = await fetch(endpoint);
    const data = await response.json();
    const name = location.name;
    const countryName = location.address.country;
    const locationName = name + ", " + countryName;

    const restructuredWeatherData = {
      name: locationName,
      timezone: data.timezone,
      currentWeather: {
        ...data.current,
        units: data.current_units,
      },
      dailyWeather: {
        forecast: data.daily.time.map((time, index) => ({
          time: time,
          weather_code: data.daily.weather_code[index],
          maxTemperature: data.daily.temperature_2m_max[index],
          minTemperature: data.daily.temperature_2m_min[index],
          precipitation_probability_max:
            data.daily.precipitation_probability_max[index],
          wind_speed_10m_max: data.daily.wind_speed_10m_max
            ? data.daily.wind_speed_10m_max[index] // Added check for optional property
            : null, // or undefined, or a default value if you prefer
        })),
      },
    };

    storeWeatherData(restructuredWeatherData);
    console.log("Saved restructured weather data into storage");
    return restructuredWeatherData;
  } catch (error) {
    console.error("Error fetching weather from API:", error);
    return null; // Return defaultWeather in case of API error
  }
}