import { useWeather } from "@/context/weatherContext";
import { GlassyText, GlassyView } from "@/components/Glassy";
import HourlyPrecipitation from "./HourlyPrecipitation";
import HourlyTemperature from "./HourlyTemperature";
import { getHourlyDataForDate } from "@/helpers/weather";
import { hourlyForecastStyles } from "./styles";

export default function HourlyForecast({ time }: { time: string }) {
  const { hourlyWeather } = useWeather();
  let content = (
    <GlassyText style={hourlyForecastStyles.loadingText}>Loading weather forecast...</GlassyText>
  );
  if (hourlyWeather !== null) {
    const hours = getHourlyDataForDate(hourlyWeather.forecast, time);
    content = (
      <>
        <HourlyPrecipitation data={hours} />
        <HourlyTemperature data={hours} />
      </>
    );
  }
  return <GlassyView style={hourlyForecastStyles.container}>{content}</GlassyView>;
}
