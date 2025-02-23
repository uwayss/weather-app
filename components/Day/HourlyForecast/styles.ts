import { StyleSheet } from "react-native";

export const hourlyForecastStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    alignSelf: "center",
    padding: 16,
    gap: 16,
  },
  loadingText: {
    fontSize: 24,
    lineHeight: 32,
    paddingVertical: 32,
  },
});
export const hourlyPrecipitationStyles = StyleSheet.create({
  headerStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 28,
  },
  container: {
    paddingVertical: 16,
  },
});
export const hourlyTemperatureStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 8,
  },
});
