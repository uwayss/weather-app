import React from "react";
import { StyleProp, ViewStyle, TextStyle, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@/context/themeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { glassyStyles } from "@/components/styles";
import { Surface, Text, TouchableRipple } from "react-native-paper";

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
  onPressNoFeedback?: () => void;
  safe?: boolean;
  isTransparent?: boolean;
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
          textAlign: centered ? "center" : undefined,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

const hexToRgba = (hex: string, alpha: number): string => {
  let hexValue = hex.replace("#", "");
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
  debug,
  onPress,
  onPressNoFeedback,
  safe,
  isTransparent,
}) => {
  const { theme } = useTheme();

  const baseStyles = rounded ? glassyStyles.glassyView : glassyStyles.glassyViewSquare;

  const backgroundColor = isTransparent
    ? "transparent"
    : debug
      ? "red"
      : hexToRgba(theme.background, alpha);

  let content = (
    <Surface style={[{ backgroundColor }, baseStyles, style]} elevation={0}>
      {children}
    </Surface>
  );

  if (safe) {
    content = <SafeAreaView>{content}</SafeAreaView>;
  }

  if (onPress) {
    content = <TouchableRipple onPress={onPress}>{content}</TouchableRipple>;
  }

  if (onPressNoFeedback) {
    content = (
      <TouchableWithoutFeedback onPress={onPressNoFeedback}>{content}</TouchableWithoutFeedback>
    );
  }

  return content;
};
