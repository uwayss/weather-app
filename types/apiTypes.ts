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

export interface HourWeather {
  time: string;
  weather_code: number;
  temperature: number;
  humidity: number;
  rainProbability: number;
  isDay: number;
}
export interface DayWeather {
  time: string;
  weather_code: number;
  maxTemp: number;
  minTemp: number;
  rainProbability: number;
}
export interface CurrentWeather extends CurrentWeatherAPI {
  units: CurrentUnits;
}

export interface HoursForecast {
  units: HourlyUnits;
  forecast: HourWeather[];
}
export interface DaysForecast {
  units: DailyUnits;
  forecast: DayWeather[];
}
export interface WeatherData {
  name: string;
  timezone: string;
  currentWeather: CurrentWeather;
  dailyWeather: DaysForecast;
  hourlyWeather: HoursForecast;
}
export interface IPGeolocationResponse {
  status: string;
  country: string;
  regionName: string;
  city: string;
  district: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export interface Address {
  suburb?: string;
  town?: string;
  state?: string;
  "ISO3166-2-lvl4"?: string;
  region?: string;
  postcode?: string;
  country: string;
  country_code: string;
}

export interface LocationSearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

export type LocationAPIResponse = LocationSearchResult[];
