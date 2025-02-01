import { makeWeatherRequest } from "../helpers/api";

export default async function FetchWeather(location) {
  try {
    const data = await makeWeatherRequest(location.lat, location.lon);
    const name = location.name;
    const countryName = location.address.country;
    const locationName = `${name}, ${countryName}`;

    const restructuredWeatherData = {
      name: locationName,
      timezone: data.timezone,
      currentWeather: {
        ...data.current,
        units: data.current_units,
      },
      dailyWeather: {
        forecast: data.daily.time.map((time, index) => ({
          time,
          weather_code: data.daily.weather_code[index],
          maxTemperature: data.daily.temperature_2m_max[index],
          minTemperature: data.daily.temperature_2m_min[index],
          rainProbability: data.daily.precipitation_probability_max[index],
          windSpeed: data.daily.wind_speed_10m_max
            ? data.daily.wind_speed_10m_max[index]
            : null,
        })),
        units: data.daily_units,
      },
      hourlyWeather: {
        forecast: data.hourly.time.map((time, index) => ({
          time,
          weather_code: data.hourly.weather_code[index],
          temperature: data.hourly.temperature_2m[index],
          humidity: data.hourly.relative_humidity_2m[index],
          rainProbability: data.hourly.precipitation_probability[index],
          windSpeed: data.hourly.wind_speed_10m
            ? data.hourly.wind_speed_10m[index]
            : null,
        })),
        untis: data.hourly_units,
      },
    };
    return restructuredWeatherData;
  } catch (error) {
    console.error("Error fetching weather from API:", error);
    return null;
  }
}
