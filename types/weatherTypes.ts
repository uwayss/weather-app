// Basic Types
export type WeatherCondition = number;

// API Unit Types
export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  is_day: string;
  weather_code: string;
  wind_speed_10m: string;
}

export interface DailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_probability_max: string;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  precipitation_probability: string;
  weather_code: string;
  is_day: string;
}

// Raw API Response Types
export interface CurrentWeatherAPI {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: 0 | 1;
  weather_code: number;
  wind_speed_10m: number;
}

export interface DailyWeatherAPI {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
}

export interface HourlyWeatherAPI {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
  is_day: number[];
}

export interface RawWeatherAPIResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentWeatherAPI;
  hourly_units: HourlyUnits;
  hourly: HourlyWeatherAPI;
  daily_units: DailyUnits;
  daily: DailyWeatherAPI;
}