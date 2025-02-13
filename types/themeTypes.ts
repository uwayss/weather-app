export interface Theme {
  background: string;
  text: "black" | "white";
  accent: string;
}

export type ThemeName = "light" | "dark";

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  themeName: ThemeName;
};
