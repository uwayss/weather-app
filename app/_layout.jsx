import { Stack } from "expo-router";
import ThemeProvider from "../context/themeContext"
const RootLayout = () => {
    return (
        <ThemeProvider>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="nextDays" />
            </Stack>
        </ThemeProvider>
    )
}

export default RootLayout