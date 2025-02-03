import { useWeather } from "../../../context/weatherContext";
import { GlassyText, GlassyView } from "../../Glassy";
import PrecipitationGraph from "./PrecipitationGraph";
import TemperatureGraph from "./TemperatureGraph";
import { getHourlyDataForDate } from "../../../helpers/weather";
import { ScrollView } from "react-native";
export default function HourlyForecast({ time }) {
  const { hourlyWeather } = useWeather();
  if (!hourlyWeather) {
    return (
      <GlassyView className="flex-col w-full">
        <GlassyText className="text-2xl py-8">
          Loading weather forecast...
        </GlassyText>
      </GlassyView>
    );
  } else {
    const hours = getHourlyDataForDate(hourlyWeather.forecast, time);
    return (
      <GlassyView className="flex-col w-full h-fit align-center">
        <PrecipitationGraph data={hours} />
        <TemperatureGraph data={hours} />
      </GlassyView>
    );
  }
}
