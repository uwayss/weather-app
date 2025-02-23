import { GlassyText, GlassyView } from "@/components/Glassy";
import { View } from "react-native";

import { Image } from "react-native";
import { AwesomeIcon } from "@/components/Icon";
import { DayWeather } from "@/types/apiTypes";
import { statsViewStyles } from "./styles";
import { weatherCodeToCondition, weatherCodeToImageURL } from "@/helpers/weather/display";
function Header({ time }: { time: string }) {
  return (
    <GlassyView style={statsViewStyles.headerContainer} isTransparent>
      <GlassyText style={statsViewStyles.header}>
        {new Date(time).toLocaleDateString("en-UK", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </GlassyText>
    </GlassyView>
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
    <View style={statsViewStyles.temperatureInfo}>
      <GlassyText style={statsViewStyles.statText}>
        <AwesomeIcon name="arrow-down" /> {Math.round(minTemperature)}°C{" "}
      </GlassyText>
      <GlassyText style={statsViewStyles.statText}>
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
    <View style={statsViewStyles.GenericInfo}>
      <GlassyText style={statsViewStyles.statText}>
        <AwesomeIcon name="droplet" /> {rainProbability}%
      </GlassyText>
      <GlassyText style={statsViewStyles.statText}>
        <AwesomeIcon name="wind" /> {windSpeed} km/s
      </GlassyText>
    </View>
  );
}
function ConditionInfo({ weather_code }: { weather_code: number }) {
  return (
    <View style={statsViewStyles.conditionInfo}>
      <View style={statsViewStyles.conditionWrapper}>
        <Image
          style={statsViewStyles.conditionImage}
          source={{ uri: weatherCodeToImageURL(weather_code) }}
        />
        <GlassyText style={statsViewStyles.statText}>
          {weatherCodeToCondition(weather_code)}
        </GlassyText>
      </View>
    </View>
  );
}

export default function StatsView({ dayData }: { dayData: DayWeather }) {
  let content = (
    <GlassyText style={[statsViewStyles.statText, { textAlign: "center" }]}>Loading...</GlassyText>
  );
  if (dayData) {
    content = (
      <>
        <Header time={dayData.time} />
        <TemperatureInfo minTemperature={dayData.minTemp} maxTemperature={dayData.maxTemp} />
        <GenericInfo rainProbability={dayData.rainProbability} windSpeed={dayData.windSpeed} />
        <ConditionInfo weather_code={dayData.weather_code} />
      </>
    );
  }
  return <GlassyView style={statsViewStyles.container}>{content}</GlassyView>;
}
