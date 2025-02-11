import React from "react";
import { useTheme } from "../context/themeContext";
import { Feather } from "expo-vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export function AwesomeIcon({ name = "1", size = 20 }) {
  const { theme } = useTheme();
  return <FontAwesome6 name={name} color={theme.accent} size={size} />;
}
export function FeatherIcon({ name = "1", size = 20, style }) {
  const { theme } = useTheme();

  return <Feather name={name} size={size} color={theme.accent} style={style} />;
}
