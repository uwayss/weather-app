import { Pressable } from "react-native";
import { AwesomeIcon } from "../Icon";
import { useTheme } from "@/context/themeContext";
import { closeButtonStyles } from "./styles";

export default function CloseButton({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  return (
    <Pressable
      style={[
        closeButtonStyles.button,
        {
          backgroundColor: theme.background,
        },
      ]}
      onPress={onClose}>
      <AwesomeIcon name="arrow-left" size={32} />
    </Pressable>
  );
}
