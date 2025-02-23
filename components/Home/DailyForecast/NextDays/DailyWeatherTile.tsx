import { Image } from "react-native";
import { GlassyText, GlassyView } from "@/components/Glassy";
import { useWeather } from "@/context/weatherContext";
import { DayWeather } from "@/types/apiTypes";
import { useRouter } from "expo-router";
import { dailyWeatherTileStyles } from "../../styles";
import { timeToWeekday } from "@/helpers/time";
import { weatherCodeToImageURL } from "@/helpers/weather/display";
type ConditionImageProps = { weatherCode: number };
function ConditionImage({ weatherCode }: ConditionImageProps) {
  const imageUri = weatherCodeToImageURL(weatherCode, useWeather().currentWeather?.isDay);
  if (!imageUri) return null; // TODO: Add a placeholder image
  return (
    <Image
      source={{
        uri: imageUri,
      }}
      style={dailyWeatherTileStyles.conditionImage}></Image>
  );
}
function WeekdayText({ time }: { time: string }) {
  const weekday = timeToWeekday(time);
  return <GlassyText style={dailyWeatherTileStyles.weekdayText}>{weekday}</GlassyText>;
}
type TemperatureTextProps = { min: number; max: number };
function TemperatureText({ min, max }: TemperatureTextProps) {
  return (
    <GlassyText style={dailyWeatherTileStyles.temperatureText}>
      {Math.round(max) ?? "--"}°C / {Math.round(min) ?? "--"}°C
    </GlassyText>
  );
}
export default function DailyWeatherTile({ data }: { data: DayWeather }) {
  const router = useRouter();
  return (
    <>
      <GlassyView
        style={dailyWeatherTileStyles.container}
        alpha={0.3}
        onPress={() => {
          router.push(`/${data.time.split("T")[0]}`); // Navigate to dynamic route
        }}>
        <ConditionImage weatherCode={data.weather_code} />
        <WeekdayText time={data.time} />
        <TemperatureText min={data.minTemp} max={data.maxTemp} />
      </GlassyView>
    </>
  );
}
