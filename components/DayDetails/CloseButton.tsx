import { Pressable, StyleSheet } from "react-native";
import { AwesomeIcon } from "../Icon";
import { useTheme } from "@/context/themeContext";

export default function CloseButton({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: theme.background,
        },
      ]}
      onPress={onClose}>
      <AwesomeIcon name="arrow-left" size={32} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 8,
    width: 48,
    height: 48,
  },
});
