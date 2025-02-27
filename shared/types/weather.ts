import { WeatherCondition } from "@/types/apiTypes";

export interface WeatherData {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: WeatherCondition;
  precipitation_probability: number;
  is_day: 0 | 1;
  time: string;
}

export interface ForecastData extends WeatherData {
  date: string;
  hourly?: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  precipitation_probability: number;
  weather_code: WeatherCondition;
  is_day: 0 | 1;
}

export interface LocationData {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export type WeatherTimeframe = "hourly" | "daily";

export interface WeatherError {
  code: string;
  message: string;
}
