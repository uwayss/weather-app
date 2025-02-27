import { CurrentUnits, DailyUnits, HourlyUnits } from "./weatherTypes";

// Transformed Weather Data Types
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
  windSpeed: number;
}

export interface CurrentWeather {
  units: CurrentUnits;
  time: string;
  temperature: number;
  humidity: number;
  feltTemperature: number;
  isDay: 0 | 1;
  weatherCode: number;
  windSpeed: number;
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

// Component Props Types
export type HourlyRainProbGraphProps = {
  hour: string;
  precipitation: number;
}[];

export type HourlyTemperatureGraphProps = {
  hour: string;
  temperature: number;
}[];

export type RainProbGraphProps = {
  day?: string;
  hour?: string;
  precipitation: number;
}[];
