import { View, Text } from "react-native";

export const GlassyText = ({
  className,
  children,
  theme = "light",
  centered = true,
}) => {
  return (
    <Text
      className={`${theme == "light" ? "text-slate-900" : "text-white"} ${
        centered ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </Text>
  );
};

export const GlassyView = ({ children, className, theme = "light" }) => {
  return (
    <View
      className={`${
        theme == "light" ? "bg-slate-300/60" : "bg-slate-700/60"
      } rounded-2xl ${className}`}
    >
      {children}
    </View>
  );
};
