import { StyleSheet } from "react-native";

export const closeButtonStyles = StyleSheet.create({
  button: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 8,
    width: 48,
    height: 48,
  },
});

export const statsViewStyles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  statText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
  },
  temperatureInfo: {
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },
  GenericInfo: {
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  conditionInfo: {
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  conditionWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  conditionImage: {
    width: 48,
    height: 48,
  },
  headerContainer: {
    padding: 12,
  },
  header: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});
