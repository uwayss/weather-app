import { useRouter, useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import { GlassyView } from "@/components/Glassy";
import WeatherBackground from "@/components/WeatherBackground";
import { useWeather } from "@/context/weatherContext";
import StatsView from "@/components/Day/StatsView";
import HourlyForecast from "@/components/Day/HourlyForecast/HourlyForecast";
import { findDayWeatherFromTime } from "@/helpers/weather";
import CloseButton from "@/components/Day/CloseButton";
import { dayStyles, globalStyles } from "./styles";
export default function DayDetailsScreen() {
  const router = useRouter();
  const { dayId } = useLocalSearchParams<{ dayId: string }>();
  const { dailyWeather, currentWeather } = useWeather();
  const dayData = findDayWeatherFromTime(dayId, dailyWeather?.forecast);
  const isCurrentlyDay = currentWeather?.isDay;
  return (
    <View style={dayStyles.container}>
      <WeatherBackground weatherCode={dayData?.weather_code} isDay={isCurrentlyDay} />
      <ScrollView style={globalStyles.container}>
        <GlassyView rounded={false} style={dayStyles.safeContainer} isTransparent safe>
          <CloseButton onClose={() => router.back()} />
          {dayData && <StatsView dayData={dayData} />}
          {dayData && <HourlyForecast time={dayData.time} />}
        </GlassyView>
      </ScrollView>
    </View>
  );
}
