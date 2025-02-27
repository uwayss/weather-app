import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "@/context/themeContext";
import { baseButtonStyles, getVariantStyles, getSizeStyles, getTextStyles } from "./styles";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        baseButtonStyles(theme),
        getVariantStyles(theme, variant),
        getSizeStyles(theme, size),
        disabled && { opacity: 0.5 },
        style,
      ]}>
      <Text style={[getTextStyles(theme, variant, disabled) as TextStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
