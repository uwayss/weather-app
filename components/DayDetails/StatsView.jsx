import { GlassyText, GlassyView } from "../Glassy";
import {
  weatherCodeToCondition,
  weatherCodeToImageURL,
} from "../../helpers/weather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useTheme } from "../../context/themeContext";
import { Image } from "react-native";
import { useWeather } from "../../context/weatherContext";
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
      <>
        <GlassyView
          className="p-3 items-center flex-row justify-around"
          transparency={40}
        >
          <GlassyText className="text-xl">
            Minimum: {Math.round(minTemperature)}°C{" "}
            <FontAwesome6
              name="temperature-low"
              size={20}
              color={theme.accent}
            />
          </GlassyText>
          <GlassyText className="text-xl">
            Maximum: {Math.round(maxTemperature)}°C{" "}
            <FontAwesome6
              name="temperature-high"
              size={20}
              color={theme.accent}
            />
          </GlassyText>
        </GlassyView>
        <GlassyView
          className="p-3 items-center flex-row justify-center"
          transparency={40}
        >
          <Image
            className="w-12 h-12"
            source={{ uri: weatherCodeToImageURL(weather_code) }}
          />
          <GlassyText className="text-xl font-bold">
            {weatherCodeToCondition(weather_code)}
          </GlassyText>
        </GlassyView>
        <GlassyView className="p-3 items-center" transparency={40}>
          <GlassyText className="text-xl font-bold">
            <FontAwesome6 name="droplet" size={24} color={theme.accent} />{" "}
            {rainProbability}%
          </GlassyText>
        </GlassyView>
        <GlassyView className="p-3 items-center" transparency={40}>
          <GlassyText className="text-xl font-bold">
            Wind Speed: {windSpeed} km/s
          </GlassyText>
        </GlassyView>
      </>
    );
  } else {
    return (
      <GlassyView className="p-5">
        <GlassyText className="text-xl font-bold text-center">
          Loading...
        </GlassyText>
      </GlassyView>
    );
  }
}
