import { Stack } from "expo-router";
import ThemeProvider from "../context/themeContext"
const RootLayout = () => {
    return (
        <ThemeProvider>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="dayDetails"
                    options={{
                        animation: "slide_from_right",
                    }}
                />
            </Stack>
        </ThemeProvider>
    )
}

export default RootLayout