function apiEndpoint(
  lat,
  lon,
  days = 16,
) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&hourly=weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=${days}`;
}

import axios from 'axios';

export default async function FetchWeather(location) {
  try {
    const endpoint = apiEndpoint(location.lat, location.lon);
    const response = await axios.get(endpoint);
    const { data } = response;
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
          precipitation_probability_max:
            data.daily.precipitation_probability_max[index],
          wind_speed_10m_max: data.daily.wind_speed_10m_max
            ? data.daily.wind_speed_10m_max[index]
            : null,
        })),
      },
    };

    return restructuredWeatherData;
  } catch (error) {
    console.error("Error fetching weather from API:", error);
    return null;
  }
}