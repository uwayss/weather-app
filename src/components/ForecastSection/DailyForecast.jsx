import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../context/weatherContext";
import { View, Text, ScrollView, Image } from "react-native";
import { FontAwesome6 } from "react-native-vector-icons";
import { processDailyWeatherData } from "../../helpers/processDailyWeatherData";
import weatherDescriptions from "../../constants/descriptions";
import { GlassyText, GlassyView } from "../Glassy";
import { themeContext } from "../../context/themeContext";

function weatherCodeToCondition(code) {
  // TODO: implement day/night logic
  // For simplicity, we'll assume daytime for now
  // In a real-world application, you'd need to check the sunrise and sunset times to determine if it's day or night

  if (!code) {
    throw new Error("WeatherCodeToCondition: Weather code is null or empty");
  }
  return weatherDescriptions[code].day.description;
}
function weatherCodeToImageURL(code) {
  // TODO: implement day/night logic
  // For simplicity, we'll assume daytime for now
  // In a real-world application, you'd need to check the sunrise and sunset times to determine if it's day or night

  if (!code) {
    throw new Error("WeatherCodeToCondition: Weather code is null or empty");
  }
  return weatherDescriptions[code].day.image;
}

function DailyWeatherItem({ data }) {
  const { theme } = useContext(themeContext);
  // Safely handle missing properties
  const condition = data.weather_code
    ? weatherCodeToCondition(data.weather_code)
    : "Unknown";
  const weekDay = data.time
    ? new Date(data.time).toLocaleDateString("en-UK", {
        weekday: "long",
      })
    : "Unknown";

  return (
    <GlassyView
      theme={theme}
      className="flex-col gap-4 items-center pb-2 mr-2 w-32"
    >
      {/* TODO: implement the icons!!! */}
      <Image
        source={{
          uri: weatherCodeToImageURL(data.weather_code),
        }}
        className="w-32 h-32 bg-white/55 rounded-t-2xl"
      ></Image>
      <GlassyText theme={theme} className="text-2xl font-bold tracking-widest">
        {weekDay}
      </GlassyText>
      <TemperatureDisplay
        min={data.temperature_2m_min}
        max={data.temperature_2m_max}
      />
    </GlassyView>
  );
}

function Header() {
  const { theme } = useContext(themeContext);
  return (
    <View className="flex-row justify-start items-center gap-4 px-4">
      <GlassyView
        theme={theme}
        className="flex-row justify-start items-center gap-4 px-6 p-4"
      >
        <FontAwesome6 name="calendar-days" color="white" size={18} />
        <GlassyText theme={theme} className="text-2xl font-bold">
          Next Days
        </GlassyText>
      </GlassyView>
    </View>
  );
}

function ForecastList({ forecastData }) {
  const { theme } = useContext(themeContext);
  if (!forecastData.length) {
    return (
      <View className="p-4">
        <GlassyText theme={theme}>No forecast data available</GlassyText>
      </View>
    );
  }

  return (
    <ScrollView className="p-4" horizontal>
      {forecastData.map((item) => (
        <DailyWeatherItem key={item.time} data={item} />
      ))}
    </ScrollView>
  );
}

function TemperatureDisplay({ min, max, stylesExtra = "" }) {
  const { theme } = useContext(themeContext);
  const minTemp = Math.round(min);
  const maxTemp = Math.round(max);
  return (
    <View className="flex-row gap-1 items-center">
      <GlassyText
        theme={theme}
        className={"tacking-wide font-bold text-lg" + stylesExtra}
      >
        {maxTemp ?? "--"}°C /
      </GlassyText>
      <GlassyText
        theme={theme}
        className={"tacking-wide font-thin" + stylesExtra}
      >
        {minTemp ?? "--"}°C
      </GlassyText>
    </View>
  );
}

export default function DailyForecast() {
  const { weather } = useContext(WeatherContext);
  const { theme } = useContext(themeContext);
  const [dailyForecast, setDailyForecast] = useState([]);

  // Process weather data whenever it changes
  useEffect(() => {
    if (!weather || !weather.daily) {
      setDailyForecast([]); // Reset if no data
      return;
    }

    try {
      const processedData = processDailyWeatherData(weather);
      setDailyForecast(processedData);
    } catch (error) {
      console.error("Error processing weather data:", error);
      setDailyForecast([]);
    }
  }, [weather]); // Re-run when weather changes

  // Show loading state while waiting for data
  if (!weather) {
    return (
      <View className="p-4">
        <GlassyText theme={theme}>Loading weather forecast...</GlassyText>
      </View>
    );
  }

  return (
    <View className="flex-col h-fit w-full">
      <Header />
      <ForecastList forecastData={dailyForecast} />
    </View>
  );
}
