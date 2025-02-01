import { GlassyText, GlassyView } from "../Glassy";
import {
  weatherCodeToCondition,
  weatherCodeToImageURL,
} from "../../helpers/weather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useTheme } from "../../context/themeContext";
import { Image } from "react-native";
import { useWeather } from "../../context/weatherContext";
function GlassyStatText({
  children,
  className = "",
  bold = true,
  size = "xl",
}) {
  return (
    <GlassyText
      className={`text-${size} ${bold ? "font-bold" : ""} ${className}`}
    >
      {children}
    </GlassyText>
  );
}
export default function StatsView({ time }) {
  const { theme } = useTheme();
  const { dailyWeather } = useWeather();
  if (dailyWeather) {
    const day = dailyWeather.forecast.find((d) => {
      return new Date(d.time).getTime() == new Date(time).getTime();
    });
    const {
      weather_code,
      maxTemperature,
      minTemperature,
      rainProbability,
      windSpeed,
    } = day;
    return (
      <GlassyView className="gap-4 p-4">
        <GlassyView className="px-2 items-center flex-row justify-around" trans>
          <GlassyStatText>
            Minimum: {Math.round(minTemperature)}°C{" "}
          </GlassyStatText>
          <GlassyStatText>
            Maximum: {Math.round(maxTemperature)}°C{" "}
          </GlassyStatText>
        </GlassyView>
        <GlassyView className="px-2 items-center flex-row justify-center" trans>
          <Image
            className="w-12 h-12"
            source={{ uri: weatherCodeToImageURL(weather_code) }}
          />
          <GlassyStatText>
            {weatherCodeToCondition(weather_code)}
          </GlassyStatText>
        </GlassyView>
        <GlassyView className="px-2 items-center" trans>
          <GlassyStatText>
            <FontAwesome6 name="droplet" size={20} color={theme.accent} />{" "}
            {rainProbability}%
          </GlassyStatText>
        </GlassyView>
        <GlassyView className="px-2 items-center" trans>
          <GlassyStatText>
            <FontAwesome6 name="wind" size={20} color={theme.accent} />{" "}
            {windSpeed} km/s
          </GlassyStatText>
        </GlassyView>
      </GlassyView>
    );
  } else {
    return (
      <GlassyView className="gap-4 p-4">
        <GlassyStatText className="text-center">Loading...</GlassyStatText>
      </GlassyView>
    );
  }
}
