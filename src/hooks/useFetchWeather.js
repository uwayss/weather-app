import defaultLocation from "../constants/weather.js";
import { getEndpoint } from "../constants/api.js";
import { storeWeatherData } from "../helpers/asyncStorage.js";

export default async function FetchWeather(location = defaultLocation) {
  const endpoint = getEndpoint(location.lat, location.lon, 3);
  const response = await fetch(endpoint);
  const data = await response.json();
  const name = location.name;
  const displayName = location.display_name;
  const countryName = location.address.country;
  const weatherData = { ...data, name, displayName, countryName };
  storeWeatherData(weatherData);
  console.warn("saved weather data!!");
  return weatherData;
}
