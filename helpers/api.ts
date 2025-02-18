// FILE: src/helpers/api.js
import axios from "axios";
import {
  LocationAPIResponse,
  RawWeatherAPIResponse,
  IPGeolocationResponse,
} from "@/types/apiTypes";
const FORECAST_DAYS = 16; // Number of days for forecast
const locationApi = (q: string) =>
  `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=3&q=${q}`;
const weatherApi = (lat: string, lon: string) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=${FORECAST_DAYS}`;

const defaultHeaders = {
  "User-Agent": "MuhammedsWeatherApp/1.0 (mamipromax1513@gmail.com)",
};

export async function makeNominatimRequest(q: string): Promise<LocationAPIResponse> {
  try {
    const response = await axios.get(locationApi(q), {
      headers: defaultHeaders,
    });
    return response.data;
  } catch (error) {
    console.error(`Request to Nominatim api failed:`, error);
    throw error;
  }
}

export async function makeWeatherRequest(lat: string, lon: string): Promise<RawWeatherAPIResponse> {
  try {
    const response = await axios.get(weatherApi(lat, lon));
    return response.data;
  } catch (error) {
    console.error(`Request to open-metero api failed:`, error);
    throw error;
  }
}

export async function getLocationFromIP(query: string): Promise<IPGeolocationResponse | null> {
  try {
    const response = await axios.get(`http://ip-api.com/json/${query}?fields=61433`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export async function getPublicIP(): Promise<string | null> {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching public IP:", error);
    return null;
  }
}
