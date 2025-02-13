import { GlassyText, GlassyView } from "@/components/Glassy";
import { View } from "react-native";
import {
  weatherCodeToCondition,
  weatherCodeToImageURL,
} from "@/helpers/weather";
import { Image } from "react-native";
import { useWeather } from "@/context/weatherContext";
import { AwesomeIcon } from "@/components/Icon";
import { DayWeather } from "@/types/apiTypes";
function GlassyStatText({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
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
function TemperatureInfo({
  minTemperature,
  maxTemperature,
}: {
  minTemperature: number;
  maxTemperature: number;
}) {
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
export default function StatsView({ dayData }: { dayData: DayWeather }) {
  if (dayData !== undefined) {
    return (
      <GlassyView style={{ gap: 16, padding: 16 }}>
        <TemperatureInfo
          minTemperature={dayData.minTemp}
          maxTemperature={dayData.maxTemp}
        />
        <GenericInfo
          rainProbability={dayData.rainProbability}
          windSpeed={dayData.windSpeed}
        />
        <ConditionInfo weather_code={dayData.weather_code} />
      </GlassyView>
    );
  }
}
