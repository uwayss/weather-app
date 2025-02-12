import React from "react";
import { StyleSheet } from "react-native";
import { GlassyView } from "../../Glassy";
import DailyForecastSection from "../../../components/Home/DailyForecast/DailyForecast";
import Stats from "../../../components/Home/Stats/Stats";
import { useSearchBar } from "../../../context/searchBarContext";

export default function MainSection() {
  const { setShowSearch } = useSearchBar();
  return (
    <GlassyView
      style={styles.safeContainer}
      safe
      isTransparent
      onPressNoFeedback={() => setShowSearch(false)}
    >
      <Stats />
      <DailyForecastSection />
    </GlassyView>
  );
}
const styles = StyleSheet.create({
  safeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    width: "100%",
  },
});
