import { WeatherData } from "../types/apiTypes"; // Adjust path as necessary
import { makeWeatherRequest } from "../helpers/api";
interface Location {
  lat: any;
  lon: any;
  name: any;
  display_name?: string;
  address: any;
}
export default async function useFetchWeather(
  location: Location
): Promise<WeatherData | null> {
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
        forecast: data.daily.time.map((time: string, index: number) => ({
          time,
          weather_code: data.daily.weather_code[index],
          maxTemp: data.daily.temperature_2m_max[index],
          minTemp: data.daily.temperature_2m_min[index],
          rainProbability: data.daily.precipitation_probability_max[index],
          windSpeed: data.daily.wind_speed_10m_max[index],
        })),
        units: data.daily_units,
      },
      hourlyWeather: {
        forecast: data.hourly.time.map((time: string, index: number) => ({
          time,
          weather_code: data.hourly.weather_code[index],
          temperature: data.hourly.temperature_2m[index],
          humidity: data.hourly.relative_humidity_2m[index],
          rainProbability: data.hourly.precipitation_probability[index],
          isDay: data.hourly.is_day[index],
        })),
        units: data.hourly_units,
      },
    };
    console.warn("here's the weather outputtttt:");
    console.warn(restructuredWeatherData.dailyWeather.forecast);
    return restructuredWeatherData;
  } catch (error) {
    console.error("Error fetching weather from API:", error);
    return null;
  }
}
