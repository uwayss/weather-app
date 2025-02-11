import { GlassyText, GlassyView } from "../Glassy";
import { View } from "react-native";
import {
  weatherCodeToCondition,
  weatherCodeToImageURL,
} from "../../helpers/weather";
import { Image } from "react-native";
import { useWeather } from "../../context/weatherContext";
import { AwesomeIcon } from "../Icon";
function GlassyStatText({ children, centered = false }) {
  return (
    <GlassyText
      style={{
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "bold",
        textAlign: centered ? "center" : "",
      }}
    >
      {children}
    </GlassyText>
  );
}
function TemperatureInfo({ minTemperature, maxTemperature }) {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <GlassyStatText>Minimum: {Math.round(minTemperature)}°C </GlassyStatText>
      <GlassyStatText>Maximum: {Math.round(maxTemperature)}°C </GlassyStatText>
    </View>
  );
}
function GenericInfo({ rainProbability, windSpeed }) {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <View>
        <GlassyStatText>
          <AwesomeIcon name="droplet" /> {rainProbability}%
        </GlassyStatText>
      </View>
      <View>
        <GlassyStatText>
          <AwesomeIcon name="wind" /> {windSpeed} km/s
        </GlassyStatText>
      </View>
    </View>
  );
}
function ConditionInfo({ weather_code }) {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <View style={{ flexDirection: "row", alingItems: "center" }}>
        <Image
          style={{ width: 48, height: 48 }}
          source={{ uri: weatherCodeToImageURL(weather_code) }}
        />
        <GlassyStatText>{weatherCodeToCondition(weather_code)}</GlassyStatText>
      </View>
    </View>
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
      <GlassyView style={{ gap: 16, padding: 16 }}>
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
      <GlassyView style={{ gap: 16, padding: 16 }}>
        <GlassyStatText centered>Loading...</GlassyStatText>
      </GlassyView>
    );
  }
}
