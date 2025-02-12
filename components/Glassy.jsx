import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/themeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export const GlassyText = ({ style = {}, children, centered = true }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.text,
        textAlign: centered ? "center" : undefined, // Conditional textAlign
        ...style,
      }}
    >
      {children}
    </Text>
  );
};
const hexToRgba = (hex, alpha) => {
  let hexValue = hex.replace("#", ""); // Remove '#' if present
  let r = parseInt(hexValue.substring(0, 2), 16);
  let g = parseInt(hexValue.substring(2, 4), 16);
  let b = parseInt(hexValue.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${alpha})`;
};
export const GlassyView = ({
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
  let content;
  if (isTransparent) {
    // Using renamed prop
    content = (
      <View style={{ ...baseStyles, backgroundColor: "transparent", ...style }}>
        {" "}
        {/* Corrected backgroundColor */}
        {children}
      </View>
    );
  } else if (debug) {
    content = (
      <View style={{ ...baseStyles, backgroundColor: "red", ...style }}>
        {" "}
        {/* Corrected backgroundColor */}
        {children}
      </View>
    );
  } else if (opaque) {
    content = (
      <View
        style={{
          ...baseStyles,
          backgroundColor: `rgb(${theme.background})`,
          ...style,
        }}
      >
        {children}
      </View>
    );
  } else {
    content = (
      <View
        style={{
          ...baseStyles,
          backgroundColor: hexToRgba(theme.background, alpha),
          ...style,
        }}
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
