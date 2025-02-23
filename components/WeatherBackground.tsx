import React from "react";
import { Image } from "react-native";
import { weatherCodeToBackgroundImageSource } from "@/helpers/weather";
import { weatherBackgroundStyles } from "./styles";

export default function WeatherBackground({
  weatherCode,
  isDay,
}: {
  weatherCode?: number;
  isDay?: 0 | 1;
}) {
  const imageSource =
    weatherCode === undefined
      ? weatherCodeToBackgroundImageSource()
      : weatherCodeToBackgroundImageSource(weatherCode, isDay);
  return (
    <Image
      source={imageSource}
      style={weatherBackgroundStyles.backgroundImage}
      resizeMode="cover"
    />
  );
}
