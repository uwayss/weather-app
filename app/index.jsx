import { View, Image, ScrollView } from "react-native";
import SearchSection from "../components/Home/SearchSection/SearchSection";
import DailyForecastSection from "../components/Home/DailyForecast/DailyForecast";
import WeatherProvider, { useWeather } from "../context/weatherContext";
import SearchBarProvider from "../context/searchBarContext";
import Stats from "../components/Home/Stats/Stats";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import WeatherBackground from "../components/WeatherBackground";

const HomeScreen = () => {
  const { currentWeather } = useWeather();
  const weatherCode = currentWeather?.weather_code;
  console.warn(weatherCode);
  return (
    <WeatherProvider>
      <View style={{ height: "100%", width: "100%" }}>
        <WeatherBackground weatherCode={weatherCode} />
        <ScrollView style={{ flex: 1 }}>
          <SearchBarProvider>
            <SearchSection />
          </SearchBarProvider>
          <SafeAreaView
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 80,
              width: "100%",
            }}
          >
            <Stats />
            <DailyForecastSection />
          </SafeAreaView>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </WeatherProvider>
  );
};

export default HomeScreen;
