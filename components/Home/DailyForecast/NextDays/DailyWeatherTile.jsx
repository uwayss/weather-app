import { View, Image } from "react-native";
import { GlassyText, GlassyView } from "../../../Glassy";
import { weatherCodeToImageURL } from "../../../../helpers/weather"
import { useWeather } from "../../../../context/weatherContext"
import { useRouter } from 'expo-router';

function ConditionImage({ weatherCode }) {
  const imageUri = weatherCodeToImageURL(weatherCode, useWeather().currentWeather?.is_day);
  if (!imageUri) {
    return null; // Or a placeholder image if you have one
  }
  return (
    <Image
      source={{
        uri: imageUri,
      }}
      className="w-32 24 h-24 bg-transparent"
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
    <GlassyText className="text-xl font-bold tracking-widest">
      {weekday}
    </GlassyText>
  );
}

function TemperatureText({ min, max }) {
  return (
    <View className="flex-row gap-1 items-center">
      <GlassyText className={"tacking-wide font-bold text-lg"}>
        {Math.round(max) ?? "--"}°C /
      </GlassyText>
      <GlassyText className={"tacking-wide font-thin"}>
        {Math.round(min) ?? "--"}°C
      </GlassyText>
    </View>
  );
}

export default function DailyWeatherTile({ data }) {
  const router = useRouter();
  return (
    <GlassyView className="flex-col gap-1 items-center w-32 h-44 overflow-hidden rounded-xl" transparency={30} onPress={() => {
      router.push({
        pathname: "dayDetails",
        params: {
          time: data.time,
          weather_code: data.weather_code,
          maxTemperature: data.maxTemperature,
          minTemperature: data.minTemperature,
          rainProbability: data.rainProbability,
          windSpeed: data.windSpeed,
        }
      });
    }}>
      < ConditionImage weatherCode={data.weather_code} />
      <WeekdayText time={data.time} />
      <TemperatureText
        min={data.minTemperature}
        max={data.maxTemperature}
      />
    </GlassyView >
  );
}