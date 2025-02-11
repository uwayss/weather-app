import { View, Image } from "react-native";
import { GlassyText, GlassyView } from "../../../Glassy";
import { weatherCodeToImageURL } from "../../../../helpers/weather";
import { useWeather } from "../../../../context/weatherContext";
import { useRouter } from "expo-router";

function ConditionImage({ weatherCode }) {
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

function WeekdayText({ time }) {
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

function TemperatureText({ min, max }) {
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

export default function DailyWeatherTile({ data }) {
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
      transparency={30}
      onPress={() => {
        router.push({
          pathname: "DayDetails",
          params: {
            time: data.time,
            weather_code: data.weather_code,
            maxTemperature: data.maxTemperature,
            minTemperature: data.minTemperature,
            rainProbability: data.rainProbability,
            windSpeed: data.windSpeed,
          },
        });
      }}
    >
      <ConditionImage weatherCode={data.weather_code} />
      <WeekdayText time={data.time} />
      <TemperatureText min={data.minTemperature} max={data.maxTemperature} />
    </GlassyView>
  );
}
