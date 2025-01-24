import defaultLocation from "../constants/weather.js";
import { getEndpoint } from "../constants/api.js";

export default async function FetchWeather(location = defaultLocation) {
  const endpoint = getEndpoint(location.lat, location.lon, 3);
  const response = await fetch(endpoint);
  const data = await response.json();
  const name = location.name;
  const displayName = location.display_name;
  const countryName = location.address.country;
  return {
    ...data,
    name,
    displayName,
    countryName,
  };
}
