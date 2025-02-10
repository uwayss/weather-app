import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { weatherCodeToBackgroundImageSource } from "../helpers/weather"; // Adjust path if needed

export default function WeatherBackground({ weatherCode = 0, isDay = 1 }) {
  const imageSource = weatherCodeToBackgroundImageSource(weatherCode, isDay);
  let content = (
    <View style={[styles.backgroundImage, { backgroundColor: "red" }]} />
  );
  if (imageSource) {
    content = (
      <Image
        source={imageSource}
        style={[styles.backgroundImage, { width: "100%", height: "100%" }]}
        resizeMode="cover"
      />
    );
  }
  return content;
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
