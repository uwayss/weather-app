import { View, Image } from "react-native";
import { GlassyText, GlassyView } from "../../Glassy";
import weatherDescriptions from "../../../constants/descriptions";

function weatherCodeToImageURL(code) {
  if (!code) { // Handle null or undefined code
    console.warn("WeatherCodeToImageURL: Weather code is null or undefined");
    return null; // Or a default image URL
  }
  return weatherDescriptions[code]?.day?.image; // Optional chaining
}

function ConditionImage({ weatherCode }) {
  const imageUri = weatherCodeToImageURL(weatherCode);
  if (!imageUri) {
    return null; // Or a placeholder image if you have one
  }
  return (
    <View className="bg-slate-700/60">
      <Image
        source={{
          uri: imageUri,
        }}
        className="w-32 24 h-24 bg-white/55"
      ></Image>
    </View>
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

export default function DailyWeatherItem({ data }) {
  return (
    <GlassyView
      className={`flex-col gap-1 items-center w-32 h-44 overflow-hidden rounded-xl `}
    >
      <ConditionImage weatherCode={data.weather_code} />
      <WeekdayText time={data.time} />
      <TemperatureText
        min={data.minTemperature}
        max={data.maxTemperature}
      />
    </GlassyView>
  );
}