import { View, ScrollView, StyleSheet } from "react-native";
import SearchSection from "../components/Home/SearchSection/SearchSection";
import WeatherProvider, { useWeather } from "../context/weatherContext";
import SearchBarProvider from "../context/searchBarContext";
import { StatusBar } from "expo-status-bar";
import WeatherBackground from "../components/WeatherBackground";
import MainSection from "../components/Home/MainSection/MainSection";

const HomeScreen = () => {
  const { currentWeather } = useWeather();
  const weatherCode = currentWeather?.weatherCode;
  const isDay = currentWeather?.isDay;
  if (typeof weatherCode !== "undefined" && typeof isDay !== "undefined") {
    return (
      <WeatherProvider>
        <View style={styles.container}>
          <WeatherBackground weatherCode={weatherCode} isDay={isDay} />
          <ScrollView style={{ flex: 1 }}>
            <SearchBarProvider>
              <SearchSection />
              <MainSection />
            </SearchBarProvider>
          </ScrollView>
        </View>
        <StatusBar style="auto" />
      </WeatherProvider>
    );
  } else {
    return (
      <WeatherProvider>
        <View style={styles.container}>
          <WeatherBackground />
          <ScrollView style={{ flex: 1 }}>
            <SearchBarProvider>
              <SearchSection />
              <MainSection />
            </SearchBarProvider>
          </ScrollView>
        </View>
        <StatusBar style="auto" />
      </WeatherProvider>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
export default HomeScreen;
