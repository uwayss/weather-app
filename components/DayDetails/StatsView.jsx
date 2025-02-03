import { GlassyText, GlassyView } from "../Glassy";
import {
  weatherCodeToCondition,
  weatherCodeToImageURL,
} from "../../helpers/weather";
import { useTheme } from "../../context/themeContext";
import { Image } from "react-native";
import { useWeather } from "../../context/weatherContext";
import Icon, { AwesomeIcon } from "../Icon";
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
function TemperatureInfo({ minTemperature, maxTemperature }) {
  return (
    <GlassyView className="px-2 items-center flex-row justify-around" trans>
      <GlassyStatText>Minimum: {Math.round(minTemperature)}°C </GlassyStatText>
      <GlassyStatText>Maximum: {Math.round(maxTemperature)}°C </GlassyStatText>
    </GlassyView>
  );
}
function GenericInfo({ rainProbability, windSpeed }) {
  const { theme } = useTheme();
  return (
    <GlassyView className="px-2 items-center flex-row justify-around" trans>
      <GlassyView trans>
        <GlassyStatText>
          <AwesomeIcon name="droplet" /> {rainProbability}%
        </GlassyStatText>
      </GlassyView>
      <GlassyView trans>
        <GlassyStatText>
          <AwesomeIcon name="wind" /> {windSpeed} km/s
        </GlassyStatText>
      </GlassyView>
    </GlassyView>
  );
}
function ConditionInfo({ weather_code }) {
  return (
    <GlassyView className="px-2 items-center flex-row justify-around" trans>
      <GlassyView className="flex-row items-center" trans>
        <Image
          className="w-12 h-12"
          source={{ uri: weatherCodeToImageURL(weather_code) }}
        />
        <GlassyStatText>{weatherCodeToCondition(weather_code)}</GlassyStatText>
      </GlassyView>
    </GlassyView>
  );
}
export default function StatsView({ time }) {
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
      <GlassyView className="gap-4 p-4 flex-col">
        <TemperatureInfo
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <GenericInfo rainProbability={rainProbability} windSpeed={windSpeed} />
        <ConditionInfo weather_code={weather_code} />
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
