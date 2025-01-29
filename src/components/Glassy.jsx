import { View, Text } from "react-native";
import { useTheme } from "../context/themeContext";

export const GlassyText = ({
  className,
  children,
  centered = true,
}) => {
  const { theme } = useTheme()
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
}) => {
  const { theme } = useTheme();
  return (
    <View
      className={`${theme.background} ${rounded ? "rounded-xl" : ""} ${className}`}
    >
      {children}
    </View>
  );
};
