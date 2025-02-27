import { ViewStyle } from "react-native";
import { Theme } from "@/theme/theme.types";

export const getVariantStyles = (
  theme: Theme,
  variant: "primary" | "secondary" | "outline",
): ViewStyle => {
  switch (variant) {
    case "secondary":
      return {
        backgroundColor: theme.secondary,
        borderWidth: 0,
        borderRadius: theme.borderRadius.md,
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: theme.primary,
        borderRadius: theme.borderRadius.md,
      };
    default:
      return {
        backgroundColor: theme.primary,
        borderWidth: 0,
        borderRadius: theme.borderRadius.md,
      };
  }
};

export const getSizeStyles = (theme: Theme, size: "small" | "medium" | "large"): ViewStyle => {
  switch (size) {
    case "small":
      return {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
      };
    case "large":
      return {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
      };
    default:
      return {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
      };
  }
};

export const baseButtonStyles = (theme: Theme): ViewStyle => ({
  borderRadius: theme.borderRadius.sm,
  alignItems: "center",
  justifyContent: "center",
});

export const getTextStyles = (
  theme: Theme,
  variant: "primary" | "secondary" | "outline",
  disabled: boolean,
) => ({
  color: variant === "outline" ? theme.primary : "white",
  fontSize: theme.typography.button.fontSize,
  fontWeight: theme.typography.button.fontWeight,
  opacity: disabled ? 0.7 : 1,
});
