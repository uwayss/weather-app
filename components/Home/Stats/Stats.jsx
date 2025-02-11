import { View, Text } from "react-native";
import { weatherCodeToCondition } from "../../../helpers/weather";
import { useWeather } from "../../../context/weatherContext";
import { GlassyText, GlassyView } from "../../Glassy";
import { AwesomeIcon } from "../../Icon";

export default function Stats() {
  const { currentWeather, weatherName } = useWeather();

  if (!currentWeather) {
    return (
      <GlassyView
        style={{
          alignItems: "center",
          paddingVertical: 12,
          gap: 12,
          width: "91%",
        }}
      >
        <GlassyText style={{ fontSize: 20 }}>
          Weather data unavailable. Please try again later.
        </GlassyText>
      </GlassyView>
    );
  }

  const temp = currentWeather.temperature_2m;
  const tempUnit = currentWeather.units?.temperature_2m;
  const weatherCode = currentWeather.weather_code;
  const humidity = currentWeather.relative_humidity_2m;
  const windSpeed = currentWeather.wind_speed_10m;
  const windUnit = currentWeather.units?.wind_speed_10m;
  const currentTime = currentWeather.time;
  const isDay = currentWeather.is_day;
  const locationName = weatherName;

  return (
    <GlassyView
      style={{
        alignItems: "center",
        paddingVertical: 12,
        gap: 16,
        width: "91%",
      }}
    >
      <GlassyText style={{ fontSize: 24, fontWeight: "bold", width: "100%" }}>
        {locationName}
      </GlassyText>
      <View>
        <GlassyText style={{ fontSize: 72, fontWeight: "bold" }}>
          {Math.round(temp) + tempUnit}
        </GlassyText>
        <GlassyText
          style={{ fontSize: 18, lineHeight: 28, letterSpacing: 0.5 }}
        >
          {typeof weatherCode == "number"
            ? weatherCodeToCondition(weatherCode, isDay)
            : "Loading Condition..."}
        </GlassyText>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          paddingLeft: 24,
        }}
      >
        <View
          style={{
            width: "35%",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <AwesomeIcon name="droplet" size={24} />
          <GlassyText style={{ fontWeight: "light" }}>{humidity}%</GlassyText>
        </View>
        <View
          style={{
            width: "35%",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <AwesomeIcon name="wind" size={24} />
          <GlassyText style={{ fontWeight: "light" }}>
            {Math.round(windSpeed)} {windUnit}
          </GlassyText>
        </View>
        <View
          style={{
            width: "35%",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <AwesomeIcon name="clock" size={24} />
          <GlassyText style={{ fontWeight: "light" }}>
            {new Date(currentTime).toLocaleTimeString("en-UK", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </GlassyText>
        </View>
        <View
          style={{
            width: "35%",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <AwesomeIcon name={isDay ? "sun" : "moon"} size={24} />
          <GlassyText style={{ fontWeight: "light" }}>
            {isDay ? "Daytime" : "Nighttime"}
          </GlassyText>
        </View>
      </View>
    </GlassyView>
  );
}
