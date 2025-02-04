import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/themeContext";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

export const GlassyText = ({ className, children, centered = true }) => {
  const { theme } = useTheme();
  return (
    <Text
      className={`${theme.text} ${centered ? "text-center" : ""} ${className}`}
    >
      {children}
    </Text>
  );
};

export const GlassyView = ({
  children,
  className,
  rounded = true,
  transparency = 50,
  debug = false,
  onPress = null,
  safe = false,
  trans = false,
  opaque = false,
}) => {
  const { theme, themeName } = useTheme();

  const baseClassNames = `overflow-hidden ${
    rounded ? "rounded-xl" : ""
  } ${className}`;
  let content;

  if (trans) {
    content = (
      <View className={`${baseClassNames} bg-transparent`}>{children}</View>
    );
  } else if (debug) {
    content = (
      <View intensity={0} className={`${baseClassNames} bg-red-500`}>
        {children}
      </View>
    );
  } else if (opaque) {
    content = (
      <View className={baseClassNames} style={{ backgroundColor: theme.bg }}>
        {children}
      </View>
    );
  } else {
    content = (
      <BlurView
        intensity={transparency}
        tint={themeName}
        className={baseClassNames}
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
