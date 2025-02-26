import SearchSection from "@/components/Home/SearchSection/SearchSection";
import { useWeather } from "@/context/weatherContext";
import MainSection from "@/components/Home/MainSection";
import WeatherBackground from "@/components/WeatherBackground";
import SearchBarProvider from "@/context/searchBarContext";
import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "../styles";

const HomeScreen = () => {
  const { currentWeather } = useWeather();
  const { weatherCode, isDay } = currentWeather || {};
  const backgroundProps =
    weatherCode !== undefined && isDay !== undefined ? { weatherCode, isDay } : {};

  return (
    <View style={globalStyles.container}>
      <WeatherBackground {...backgroundProps} />
      <SearchBarProvider>
        <ScrollView style={globalStyles.container}>
          <SearchSection />
          <MainSection />
        </ScrollView>
      </SearchBarProvider>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
