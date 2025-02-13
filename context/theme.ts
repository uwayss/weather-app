import { Theme } from "@/types/themeTypes";

export const lightTheme: Theme = {
  background: "#cbd5e1",
  text: "black",
  accent: "#183153",
};

export const darkTheme: Theme = {
  background: "#334155",
  text: "white",
  accent: "#DDDBD7",
};
const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
