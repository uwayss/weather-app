import React from "react";
import { useTheme } from "@/context/themeContext";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleProp, TextStyle } from "react-native";

type IconProps = {
  name: any;
  size?: number;
  style?: StyleProp<TextStyle>;
};
export function AwesomeIcon({ name, size, style }: IconProps): JSX.Element {
  const { theme } = useTheme();
  return <FontAwesome6 name={name} color={theme.accent} size={size ? size : 20} style={style} />;
}

export function FeatherIcon({ name, size, style }: IconProps): JSX.Element {
  const { theme } = useTheme();

  return <Feather name={name} size={size ? size : 20} color={theme.accent} style={style} />;
}
