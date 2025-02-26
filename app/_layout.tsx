import { Stack } from "expo-router";
import ThemeProvider from "@/context/themeContext";
import WeatherProvider from "@/context/weatherContext";
import { PaperThemeProvider } from "@/context/PaperThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <PaperThemeProvider>
        <WeatherProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen
              name="[dayId]"
              options={{
                animation: "slide_from_right",
              }}
            />
          </Stack>
        </WeatherProvider>
      </PaperThemeProvider>
    </ThemeProvider>
  );
}
