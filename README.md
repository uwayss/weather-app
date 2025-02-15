# Weather App

A simple and beautiful weather application built with React Native and Expo.

## Description

This application provides current weather conditions and forecasts for locations around the world. It leverages the Open-Meteo API for weather data and Nominatim for location services to offer a user-friendly weather experience.

## Features

*   **Current Weather:** Displays real-time temperature, conditions, humidity, and wind speed.
*   **Daily Forecast:** Provides a detailed weather forecast for the next 16 days, including temperature ranges and precipitation probability.
*   **Hourly Forecast:** Offers hourly temperature and precipitation forecasts for selected days.
*   **Location Search:** Allows users to search for weather information by city name using a built-in search bar.
*   **Dynamic Backgrounds:**  Visually appealing backgrounds that change based on the current weather conditions and time of day.
*   **"Glassy" UI:**  Modern and translucent UI elements for a clean and engaging user interface.
*   **Theme Support:** (Currently single theme, but structure is in place for future expansion - see `themeContext`).
*   **Data Persistence:** Weather data is cached locally for faster loading and offline availability.
*   **Location-Based Weather:**  Automatically fetches weather data based on the user's IP address on initial load.
*   **Charts and Graphs:** Visual representations of daily and hourly temperature and precipitation forecasts.

## Technologies Used

*   **React Native:**  For building cross-platform mobile applications.
*   **Expo:**  For streamlining the React Native development process.
*   **Expo Router:** For navigation within the application.
*   **Open-Meteo API:** For reliable and accurate weather data.
*   **Nominatim (OpenStreetMap):** For geocoding and location search functionality.
*   **react-native-gifted-charts:** For creating interactive and informative charts.
*   **react-native-async-storage:** For local data persistence.
*   **axios:** For making HTTP requests to external APIs.
*   **TypeScript:** For enhanced code maintainability and type safety.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd weather-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```
    or
    ```bash
    yarn start
    ```

    This will open Expo DevTools in your browser. You can then choose to run the app on an Android emulator/device, iOS simulator/device, or in the web browser.

## Usage

*   Upon launching the app, weather data for your approximate location (based on IP address) will be displayed.
*   Use the search bar at the top to search for weather in other cities. Type the city name and select from the suggestions.
*   Tap on a day in the daily forecast to view detailed hourly forecasts and more stats for that day.
*   Explore the graphs for visual representations of temperature and precipitation forecasts.

## Scripts

*   `npm start` / `yarn start`: Starts the Expo development server.
*   `npm run android` / `yarn android`: Runs the app on an Android emulator or device.
*   `npm run ios` / `yarn ios`: Runs the app on an iOS simulator or device.
*   `npm run web` / `yarn web`: Runs the app in the web browser.
*   `npm run dump` / `yarn dump`: Generates a codebase dump (for development/analysis purposes).

## Contributing

Contributions are welcome! Please feel free to submit pull requests for bug fixes, improvements, or new features. For major changes, please open an issue first to discuss what you would like to change.

## License

[Optional: Add License information here, e.g., MIT License]

## Author

Muhammed

[Optional: Add contact information or links to your portfolio/social media]
