import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  bold: {
    fontWeight: "bold",
  },
});
export const dayStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  safeContainer: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
    padding: 16,
  },
});
