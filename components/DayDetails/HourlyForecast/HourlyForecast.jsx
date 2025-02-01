import { useWeather } from "../../../context/weatherContext";
import { GlassyText, GlassyView } from "../../Glassy";
import PrecipitationGraph from "./PrecipitationGraph";
import TemperatureGraph from "./TemperatureGraph";
import { getHourlyDataForDate } from "../../../helpers/weather";
export default function HourlyForecast({ time }) {
  const { hourlyWeather } = useWeather();
  if (!hourlyWeather) {
    return (
      <GlassyView className="m-2 flex-col w-11/12 ">
        <GlassyText className="text-2xl py-8">
          Loading weather forecast...
        </GlassyText>
      </GlassyView>
    );
  } else {
    const hours = getHourlyDataForDate(hourlyWeather.forecast, time);
    return (
      <GlassyView className="m-2 flex-col w-11/12 h-fit align-center">
        <PrecipitationGraph data={hours} />
        {/* <TemperatureGraph /> */}
      </GlassyView>
    );
  }
}
