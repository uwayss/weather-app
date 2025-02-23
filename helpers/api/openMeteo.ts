import { RawWeatherAPIResponse } from "../../types/apiTypes";
import axios from "axios";
const FORECAST_DAYS = 16; // Number of days for forecast

const weatherApi = (lat: string, lon: string) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=${FORECAST_DAYS}`;

export async function makeWeatherRequest(lat: string, lon: string): Promise<RawWeatherAPIResponse> {
  try {
    const response = await axios.get(weatherApi(lat, lon));
    return response.data;
  } catch (error) {
    console.error(`Request to open-metero api failed:`, error);
    throw error;
  }
}
