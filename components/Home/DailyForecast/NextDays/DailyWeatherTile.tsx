import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { GlassyText, GlassyView } from "@/components/Glassy";
import { weatherCodeToImageURL } from "@/helpers/weather";
import { useWeather } from "@/context/weatherContext";
import { DayWeather } from "@/types/apiTypes";
import DayModal from "@/components/DayDetails/DayModal";
type ConditionImageProps = { weatherCode: number };
function ConditionImage({ weatherCode }: ConditionImageProps) {
  const imageUri = weatherCodeToImageURL(weatherCode, useWeather().currentWeather?.isDay);
  if (!imageUri) {
    return null; // TODO: Add a placeholder image
  }
  return (
    <Image
      source={{
        uri: imageUri,
      }}
      style={{ width: 127, height: 96, backgroundColor: "transparent" }}></Image>
  );
}
type WeekdayTextProps = {
  time: string;
};
function WeekdayText({ time }: WeekdayTextProps) {
  const weekday = time
    ? new Date(time).toLocaleDateString("en-UK", {
        weekday: "long",
      })
    : "Unknown";
  return (
    <GlassyText
      style={{
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "bold",
        letterSpacing: 1,
      }}>
      {weekday}
    </GlassyText>
  );
}
type TemperatureTextProps = { min: number; max: number };
function TemperatureText({ min, max }: TemperatureTextProps) {
  return (
    <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
      <GlassyText
        style={{
          letterSpacing: 0.25,
          fontWeight: "bold",
          fontSize: 18,
          lineHeight: 28,
        }}>
        {Math.round(max) ?? "--"}°C /
      </GlassyText>
      <GlassyText
        style={{
          letterSpacing: 0.25,
          fontWeight: "bold",
          fontSize: 18,
          lineHeight: 28,
        }}>
        {Math.round(min) ?? "--"}°C
      </GlassyText>
    </View>
  );
}
type DailyWeatherTileProps = { data: DayWeather };
export default function DailyWeatherTile({ data }: DailyWeatherTileProps) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <GlassyView
        style={styles.tile}
        alpha={0.3}
        onPress={() => {
          setModalVisible(true);
        }}>
        <ConditionImage weatherCode={data.weather_code} />
        <WeekdayText time={data.time} />
        <TemperatureText min={data.minTemp} max={data.maxTemp} />
      </GlassyView>
      <DayModal
        modalVisible={modalVisible}
        toggleVisibility={() => setModalVisible(!modalVisible)}
        data={data}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    width: 128,
    height: 176,
  },
});
