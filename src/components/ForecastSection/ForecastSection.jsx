import React, { useContext } from "react";
import { WeatherContext } from "../../context/weatherContext";
import { SafeAreaView } from "react-native-safe-area-context";
import DailyForecast from "./DailyForecast";
import Stats from "./Stats";
import { GlassyText, GlassyView } from "../Glassy";
import { themeContext } from "../../context/themeContext";

function Location() {
  const { weather } = useContext(WeatherContext);
  const { theme } = useContext(themeContext);
  return (
    <GlassyView theme={theme} className="py-5">
      <GlassyText
        theme={theme}
        className="text-2xl font-bold px-10 w-full h-fit"
      >
        {weather.name}, {weather.countryName}
      </GlassyText>
    </GlassyView>
  );
}

const ForecastSection = () => {
  return (
    <SafeAreaView className="flex-1 justify-between items-center mt-24">
      <Location />
      <Stats />
      <DailyForecast />
    </SafeAreaView>
  );
};

export default ForecastSection;
