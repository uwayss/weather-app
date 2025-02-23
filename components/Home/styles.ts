import { StyleSheet } from "react-native";

export const statsStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
    width: "91%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
  },
  temperature: {
    fontSize: 72,
    fontWeight: "bold",
  },
  condition: {
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  statsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    paddingLeft: 24,
  },
  statistic: {
    width: "35%",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  statisticText: {
    fontWeight: "light",
  },
});

export const mainSectionStyles = StyleSheet.create({
  safeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    width: "100%",
  },
});
export const searchSectionStyles = StyleSheet.create({
  safeContainer: {
    width: "100%",
    gap: 20,
    marginTop: 8,
    zIndex: 10,
    position: "absolute",
  },
});
export const searchBarStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flexDirection: "row",
    width: "auto",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: 80,
    height: 52,
  },
  inputStyles: {
    fontSize: 18,
    lineHeight: 28,
    height: "100%",
    paddingLeft: 4,
    width: "90%",
  },
  searchIconContainer: {
    padding: 12,
  },
});
export const searchLocationsStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: 16,
    gap: 2,
    alignItems: "center",
  },
  locationContainer: {
    width: "100%",
    height: "100%",
    padding: 16,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 32,
    marginVertical: 12,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
  },
});
export const dailyTemperatureStyles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
export const dailyForecastStyles = StyleSheet.create({
  container: {
    margin: 8,
    flexDirection: "column",
    width: "91%",
    alignSelf: "center",
  },
  text: {
    fontSize: 24,
    lineHeight: 32,
    paddingVertical: 32,
  },
});
export const dailyPrecipitationStyles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
  },
});

export const dailyWeatherTileStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    width: 128,
    height: 176,
  },
  conditionImage: {
    width: 127,
    height: 96,
    backgroundColor: "transparent",
  },
  weekdayText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  temperatureText: {
    letterSpacing: 0.25,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 28,
  },
});
