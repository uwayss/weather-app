import React from "react";
import { Image, StyleSheet } from "react-native";
import { weatherCodeToBackgroundImageSource } from "../helpers/weather"; // Adjust path if needed
type WeatherBackgroundProps = {
  weatherCode: number;
  isDay: 0 | 1;
};
export default function WeatherBackground({
  weatherCode,
  isDay,
}: WeatherBackgroundProps) {
  const imageSource = weatherCodeToBackgroundImageSource(weatherCode, isDay);
  let content = (
    <Image
      style={styles.backgroundImage}
      source={weatherCodeToBackgroundImageSource()}
    />
  );
  if (imageSource) {
    content = (
      <Image
        source={imageSource}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
    );
  }
  return content;
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
});
