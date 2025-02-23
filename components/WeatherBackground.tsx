import React from "react";
import { Image } from "react-native";

import { weatherBackgroundStyles } from "./styles";
import { weatherCodeToBackgroundImageSource } from "@/helpers/weather/display";

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
