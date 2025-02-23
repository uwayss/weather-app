import { StyleSheet } from "react-native";

export const glassyStyles = StyleSheet.create({
  glassyView: {
    overflow: "hidden",
    borderRadius: 12,
  },
  glassyViewSquare: {
    overflow: "hidden",
    borderRadius: 0,
  },
});
export const weatherBackgroundStyles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
});
