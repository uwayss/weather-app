import { HourlyTemperatureGraphProps } from "../../types/apiTypes";

export function transformWeatherDataToChartData(
  weatherData: { day: string; minTemp: number; maxTemp: number }[],
) {
  const maxTempFrontColor = "lightblue";
  const maxTempGradientColor = "#1E90FF";
  const minTempFrontColor = "orange";
  const minTempGradientColor = "gold";

  return weatherData.flatMap((dayData) => [
    {
      value: Math.round(dayData.maxTemp),
      frontColor: minTempFrontColor,
      gradientColor: minTempGradientColor,
      spacing: 6,
      label: dayData.day,
    },
    {
      value: Math.round(dayData.minTemp),
      frontColor: maxTempFrontColor,
      gradientColor: maxTempGradientColor,
    },
  ]);
}

export function transformHourlyDataToChartData(hourlyData: HourlyTemperatureGraphProps) {
  if (!Array.isArray(hourlyData)) {
    console.error("transformHourlyDataToChartData: hourlyData is not an array", hourlyData);
    return [];
  }

  return hourlyData.map((hourData) => ({
    value: Math.round(hourData.temperature),
    frontColor: "orange",
    gradientColor: "gold",
    label: hourData.hour,
  }));
}
