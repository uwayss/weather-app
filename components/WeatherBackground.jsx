import React from "react";
import { Image, StyleSheet } from "react-native";
import { weatherCodeToBackgroundImageSource } from "../helpers/weather"; // Adjust path if needed

export default function WeatherBackground({ weatherCode = 0, isDay = 1 }) {
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
