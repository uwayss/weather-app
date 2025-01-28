import { View, Text } from "react-native";

export const GlassyText = ({
  className,
  children,
  centered = true,
  theme = "light",
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

export const GlassyView = ({
  children,
  className,
  theme = "light",
  rounded = true,
  transparency = "60",
}) => {
  let bgColor =
    theme == "trans"
      ? "bg-transparent"
      : theme == "light"
      ? "bg-slate-300"
      : "bg-slate-700";
  return (
    <View
      className={`${
        theme == "trans" ? "bg-transparent" : bgColor + "/" + transparency
      } ${rounded ? "rounded-xl" : ""} ${className}`}
    >
      {children}
    </View>
  );
};
