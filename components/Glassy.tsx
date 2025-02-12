import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../context/themeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

type GlassyTextProps = {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  centered?: boolean;
};
type GlassyViewProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  rounded?: boolean;
  alpha?: number;
  debug?: boolean;
  onPress?: () => void;
  safe?: boolean;
  isTransparent?: boolean; // Renamed prop trans to isTransparent
  opaque?: boolean;
};
export const GlassyText: React.FC<GlassyTextProps> = ({
  style = {},
  children,
  centered = true,
}) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[
        {
          color: theme.text,
          textAlign: centered ? "center" : undefined, // Conditional textAlign
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
const hexToRgba = (hex: string, alpha: number) => {
  let hexValue = hex.replace("#", ""); // Remove '#' if present
  let r = parseInt(hexValue.substring(0, 2), 16);
  let g = parseInt(hexValue.substring(2, 4), 16);
  let b = parseInt(hexValue.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${alpha})`;
};

export const GlassyView: React.FC<GlassyViewProps> = ({
  children,
  style = {},
  rounded = true,
  alpha = 0.5,
  debug = false,
  onPress = null,
  safe = false,
  isTransparent = false, // Renamed prop trans to isTransparent
  opaque = false,
}) => {
  const { theme, themeName } = useTheme();
  const baseStyles = rounded
    ? styleSheet.glassyView
    : styleSheet.glassyViewSquare;
  let content: React.JSX.Element;
  if (isTransparent) {
    content = (
      <View style={[{ backgroundColor: "transparent" }, baseStyles, style]}>
        {children}
      </View>
    );
  } else if (debug) {
    content = (
      <View style={[{ backgroundColor: "red" }, baseStyles, style]}>
        {children}
      </View>
    );
  } else {
    content = (
      <View
        style={[
          {
            backgroundColor: hexToRgba(theme.background, alpha),
          },
          baseStyles,
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  if (safe) {
    content = <SafeAreaView>{content}</SafeAreaView>;
  }

  if (onPress) {
    content = <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
};

const styleSheet = StyleSheet.create({
  glassyView: {
    overflow: "hidden",
    borderRadius: 12,
  },
  glassyViewSquare: {
    overflow: "hidden",
    borderRadius: 0,
  },
});
