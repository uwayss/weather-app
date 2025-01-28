import { getEndpoint } from "../constants/api.js";
import { storeWeatherData } from "../helpers/asyncStorage.js";

export default async function FetchWeather(location) {
  const endpoint = getEndpoint(location.lat, location.lon);
  const response = await fetch(endpoint);
  const data = await response.json();
  const name = location.name;
  const weatherData = { ...data, name, countryName };
  storeWeatherData(weatherData);
  console.log("Saved weather data into storage");
  return weatherData;
}
