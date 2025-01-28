import { getCalendars } from "expo-localization";

export const KEY = "40fb82c68a98d1fcc083f3ade4b36368";
export function getEndpoint(
  lat,
  lon,
  days = 16,
  tz = getCalendars()[0].timeZone
) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=${tz}&forecast_days=${days}`;
}
