import { View, Image } from "react-native";
import { GlassyText, GlassyView } from "../../../Glassy";
import { weatherCodeToImageURL } from "../../../../helpers/weather";
import { useWeather } from "../../../../context/weatherContext";
import { useRouter } from "expo-router";
import { DayWeather } from "../../../../types/apiTypes";
type ConditionImageProps = { weatherCode: number };
function ConditionImage({ weatherCode }: ConditionImageProps) {
  const imageUri = weatherCodeToImageURL(
    weatherCode,
    useWeather().currentWeather?.is_day
  );
  if (!imageUri) {
    return null; // TODO: Add a placeholder image
  }
  return (
    <Image
      source={{
        uri: imageUri,
      }}
      style={{ width: 127, height: 96, backgroundColor: "transparent" }}
    ></Image>
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
      }}
    >
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
        }}
      >
        {Math.round(max) ?? "--"}°C /
      </GlassyText>
      <GlassyText
        style={{
          letterSpacing: 0.25,
          fontWeight: "bold",
          fontSize: 18,
          lineHeight: 28,
        }}
      >
        {Math.round(min) ?? "--"}°C
      </GlassyText>
    </View>
  );
}
type DailyWeatherTileProps = { data: DayWeather };
export default function DailyWeatherTile({ data }: DailyWeatherTileProps) {
  const router = useRouter();
  return (
    <GlassyView
      style={{
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        width: 128,
        height: 176,
      }}
      alpha={0.3}
      onPress={() => {
        router.push({
          pathname: "DayDetails",
          params: {
            time: data.time,
            weather_code: data.weather_code,
            maxTemperature: data.maxTemp,
            minTemperature: data.minTemp,
            rainProbability: data.rainProbability,
          },
        });
      }}
    >
      <ConditionImage weatherCode={data.weather_code} />
      <WeekdayText time={data.time} />
      <TemperatureText min={data.minTemp} max={data.maxTemp} />
    </GlassyView>
  );
}
