import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/themeContext";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

export const GlassyText = ({ style = {}, children }) => {
  const { theme } = useTheme();
  return (
    <Text style={{ color: theme.text, textAlign: "center", ...style }}>
      {children}
    </Text>
  );
};
export const GlassyView = ({
  children,
  style = {},
  rounded = true,
  transparency = 50,
  debug = false,
  onPress = null,
  safe = false,
  trans = false,
  opaque = false,
}) => {
  const { theme, themeName } = useTheme();
  const baseStyles = rounded
    ? styleSheet.glassyView
    : styleSheet.glassyViewSquare;
  let content;
  if (trans) {
    content = (
      <View style={{ ...baseStyles, background: "transparent", ...style }}>
        {children}
      </View>
    );
  } else if (debug) {
    content = (
      <View style={{ ...baseStyles, backgroundColor: "red", ...style }}>
        {children}
      </View>
    );
  } else if (opaque) {
    content = (
      <View style={{ ...baseStyles, backgroundColor: theme.bg, ...style }}>
        {children}
      </View>
    );
  } else {
    content = (
      <BlurView
        intensity={transparency}
        tint={themeName}
        style={{ ...baseStyles, ...style }}
      >
        {children}
      </BlurView>
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
    borderRadius: 0,
  },
});
