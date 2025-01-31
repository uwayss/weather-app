import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/themeContext";
import { BlurView } from 'expo-blur';

export const GlassyText = ({ className, children, centered = true }) => {
  const { theme } = useTheme()
  return (
    <Text className={`${theme.text} ${centered ? "text-center" : ""} ${className}`}>
      {children}
    </Text>
  );
};

export const GlassyView = ({ children, className, rounded = true, transparency = 65, debug = false, onPress = null }) => {
  const { themeName } = useTheme();
  if (debug) {
    return (<View intensity={0} className={`overflow-hidden ${className} ${rounded ? "rounded-xl" : ""} bg-red-500`
    }>
      {children}
    </View >)
  } else if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <BlurView intensity={transparency} tint={themeName} className={`overflow-hidden ${className} ${rounded ? "rounded-xl" : ""}`}>
          {children}
        </BlurView>
      </TouchableOpacity>
    )
  }
  return (
    <BlurView intensity={transparency} tint={themeName} className={`overflow-hidden ${className} ${rounded ? "rounded-xl" : ""}`}>
      {children}
    </BlurView>
  );
};