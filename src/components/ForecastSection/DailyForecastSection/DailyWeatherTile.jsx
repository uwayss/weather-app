import { View, Image } from "react-native";
import { GlassyText } from "../../Glassy";
import weatherDescriptions from "../../../constants/descriptions";

function weatherCodeToImageURL(code) {
  if (!code) {
    throw new Error("WeatherCodeToCondition: Weather code is null or empty");
  }
  return weatherDescriptions[code].day.image;
}

function ConditionImage({ weatherCode }) {
  return (
    <Image
      source={{
        uri: weatherCodeToImageURL(weatherCode),
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
      {/* TODO: implement the icons!!! */}
      <ConditionImage weatherCode={data.weather_code} />
      <WeekdayText theme={theme} time={data.time} />
      <TemperatureText
        theme={theme}
        min={data.temperature_2m_min}
        max={data.temperature_2m_max}
      />
    </View>
  );
}
