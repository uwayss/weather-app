import { GlassyText, GlassyView } from "@/components/Glassy";
import { StyleSheet, View } from "react-native";
import {
  weatherCodeToCondition,
  weatherCodeToImageURL,
} from "@/helpers/weather";
import { Image } from "react-native";
import { AwesomeIcon } from "@/components/Icon";
import { DayWeather } from "@/types/apiTypes";

function TemperatureInfo({
  minTemperature,
  maxTemperature,
}: {
  minTemperature: number;
  maxTemperature: number;
}) {
  return (
    <View style={styles.temperatureInfo}>
      <GlassyText style={styles.statText}>
        <AwesomeIcon name="arrow-down" /> {Math.round(minTemperature)}°C{" "}
      </GlassyText>
      <GlassyText style={styles.statText}>
        <AwesomeIcon name="arrow-up" /> {Math.round(maxTemperature)}°C{" "}
      </GlassyText>
    </View>
  );
}
function GenericInfo({
  rainProbability,
  windSpeed,
}: {
  rainProbability: number;
  windSpeed: number;
}) {
  return (
    <View style={styles.GenericInfo}>
      <View>
        <GlassyText style={styles.statText}>
          <AwesomeIcon name="droplet" /> {rainProbability}%
        </GlassyText>
      </View>
      <View>
        <GlassyText style={styles.statText}>
          <AwesomeIcon name="wind" /> {windSpeed} km/s
        </GlassyText>
      </View>
    </View>
  );
}
function ConditionInfo({ weather_code }: { weather_code: number }) {
  return (
    <View style={styles.conditionInfo}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 48, height: 48 }}
          source={{ uri: weatherCodeToImageURL(weather_code) }}
        />
        <GlassyText style={styles.statText}>
          {weatherCodeToCondition(weather_code)}
        </GlassyText>
      </View>
    </View>
  );
}

export default function StatsView({ dayData }: { dayData: DayWeather }) {
  let content = (
    <GlassyText style={[styles.statText, { textAlign: "center" }]}>
      Loading...
    </GlassyText>
  );
  if (dayData) {
    content = (
      <>
        <TemperatureInfo
          minTemperature={dayData.minTemp}
          maxTemperature={dayData.maxTemp}
        />
        <GenericInfo
          rainProbability={dayData.rainProbability}
          windSpeed={dayData.windSpeed}
        />
        <ConditionInfo weather_code={dayData.weather_code} />
      </>
    );
  }
  return <GlassyView style={styles.container}>{content}</GlassyView>;
}
const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  statText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
  },
  temperatureInfo: {
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },
  GenericInfo: {
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  conditionInfo: {
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
