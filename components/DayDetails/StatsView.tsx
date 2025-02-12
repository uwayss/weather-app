import { GlassyText, GlassyView } from "../Glassy";
import { View } from "react-native";
import {
  weatherCodeToCondition,
  weatherCodeToImageURL,
} from "../../helpers/weather";
import { Image } from "react-native";
import { useWeather } from "../../context/weatherContext";
import { AwesomeIcon } from "../Icon";
import { DayWeather } from "../../types/apiTypes";
type GlassyStatTextProps = {
  children: React.ReactNode;
  centered?: boolean;
};
function GlassyStatText({ children, centered = false }: GlassyStatTextProps) {
  return (
    <GlassyText
      style={{
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "bold",
        textAlign: centered ? "center" : "auto",
      }}
    >
      {children}
    </GlassyText>
  );
}
type TemperatureInfoProps = {
  minTemperature: number;
  maxTemperature: number;
};
function TemperatureInfo({
  minTemperature,
  maxTemperature,
}: TemperatureInfoProps) {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 8,
      }}
    >
      <GlassyStatText>
        <AwesomeIcon name="arrow-down" /> {Math.round(minTemperature)}°C{" "}
      </GlassyStatText>
      <GlassyStatText>
        <AwesomeIcon name="arrow-up" /> {Math.round(maxTemperature)}°C{" "}
      </GlassyStatText>
    </View>
  );
}
type GenericInfoProps = {
  rainProbability: number;
  windSpeed: number;
};
function GenericInfo({ rainProbability, windSpeed }: GenericInfoProps) {
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
type ConditionInfoProps = {
  weather_code: number;
};
function ConditionInfo({ weather_code }: ConditionInfoProps) {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 48, height: 48 }}
          source={{ uri: weatherCodeToImageURL(weather_code) }}
        />
        <GlassyStatText>{weatherCodeToCondition(weather_code)}</GlassyStatText>
      </View>
    </View>
  );
}
type StatsViewProps = {
  time: string;
};
export default function StatsView({ time }: StatsViewProps) {
  const { dailyWeather } = useWeather();
  if (dailyWeather) {
    const day: DayWeather | undefined = dailyWeather.forecast.find((d) => {
      return new Date(d.time).getTime() == new Date(time).getTime();
    });
    if (day !== undefined) {
      const { weather_code, maxTemp, minTemp, rainProbability, windSpeed } =
        day;
      return (
        <GlassyView style={{ gap: 16, padding: 16 }}>
          <TemperatureInfo minTemperature={minTemp} maxTemperature={maxTemp} />
          <GenericInfo
            rainProbability={rainProbability}
            windSpeed={windSpeed}
          />
          <ConditionInfo weather_code={weather_code} />
        </GlassyView>
      );
    }
  } else {
    return (
      <GlassyView style={{ gap: 16, padding: 16 }}>
        <GlassyStatText centered>Loading...</GlassyStatText>
      </GlassyView>
    );
  }
}
