import { View, Image } from "react-native";
import { GlassyText } from "../../Glassy";
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
    <Image
      source={{
        uri: imageUri,
      }}
      className="w-32 h-32 bg-white/55"
    ></Image>
  );
}

function WeekdayText({ theme, time }) {
  const weekday = time
    ? new Date(time).toLocaleDateString("en-UK", {
      weekday: "long",
    })
    : "Unknown";
  return (
    <GlassyText theme={theme} className="text-xl font-bold tracking-widest">
      {weekday}
    </GlassyText>
  );
}

function TemperatureText({ theme, min, max }) {
  return (
    <View className="flex-row gap-1 items-center">
      <GlassyText theme={theme} className={"tacking-wide font-bold text-lg"}>
        {Math.round(max) ?? "--"}°C /
      </GlassyText>
      <GlassyText theme={theme} className={"tacking-wide font-thin"}>
        {Math.round(min) ?? "--"}°C
      </GlassyText>
    </View>
  );
}

export default function DailyWeatherItem({ data, theme }) {
  return (
    <View
      theme={theme}
      className={`flex-col gap-2 items-center w-32 h-52 bg-slate-700/60 overflow-hidden rounded-xl`}
    >
      <ConditionImage weatherCode={data.weather_code} />
      <WeekdayText theme={theme} time={data.time} />
      <TemperatureText
        theme={theme}
        min={data.minTemperature}
        max={data.maxTemperature}
      />
    </View>
  );
}