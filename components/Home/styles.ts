import { StyleSheet } from "react-native";

export const statsStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 20,
    width: "92%",
    maxWidth: 500,
    marginHorizontal: "auto",
    borderRadius: 20,
  },
  header: {
    width: "100%",
    textAlign: "center",
  },
  temperature: {
    textAlign: "center",
  },
  condition: {
    textAlign: "center",
  },
  statsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
  },
  statistic: {
    width: "45%",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 8,
  },
  statisticText: {
    fontWeight: "300",
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
    maxWidth: 600,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 28,
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
    marginTop: 8,
    gap: 4,
    alignItems: "stretch",
    maxWidth: 600,
    alignSelf: "center",
    width: "92%",
  },
  locationContainer: {
    width: "100%",
    padding: 16,
    marginVertical: 2,
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
    gap: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
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
