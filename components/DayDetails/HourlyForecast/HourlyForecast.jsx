import { useWeather } from "../../../context/weatherContext";
import { GlassyText, GlassyView } from "../../Glassy";
import HourlyPrecipitation from "./HourlyPrecipitation";
import HourlyTemperature from "./HourlyTemperature";
import { getHourlyDataForDate } from "../../../helpers/weather";
import { ScrollView } from "react-native";
export default function HourlyForecast({ time }) {
  const { hourlyWeather } = useWeather();
  if (!hourlyWeather) {
    return (
      <GlassyView style={{ flexDirection: "column", width: "100%" }}>
        <GlassyText
          style={{ fontSize: 24, lineHeight: 32, paddingVertical: 32 }}
        >
          Loading weather forecast...
        </GlassyText>
      </GlassyView>
    );
  } else {
    const hours = getHourlyDataForDate(hourlyWeather.forecast, time);
    return (
      <GlassyView
        style={{ flexDirection: "column", width: "100%", alignSelf: "center" }}
      >
        <HourlyPrecipitation data={hours} />
        <HourlyTemperature data={hours} />
      </GlassyView>
    );
  }
}
