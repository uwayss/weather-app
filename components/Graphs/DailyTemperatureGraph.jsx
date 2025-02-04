import { BarChart } from "react-native-gifted-charts";
import { transformWeatherDataToChartData } from "../../helpers/weather";
import { GlassyText, GlassyView } from "../Glassy";
import { useTheme } from "../../context/themeContext";

export default function DailyTemperatureGraph({ data }) {
  const minTemps = [];
  data.TemperatureData.forEach((element) => {
    minTemps.push(Math.round(element.minTemp) || 0);
  });
  const maxTemps = [];
  data.TemperatureData.forEach((element) => {
    maxTemps.push(Math.round(element.maxTemp) || 0);
  });
  const { theme } = useTheme();
  return (
    <BarChart
      data={transformWeatherDataToChartData(data.TemperatureData)}
      maxValue={Math.max(...maxTemps) + 2}
      mostNegativeValue={
        !(Math.min(...minTemps) >= 0) ? Math.min(...minTemps) : 0
      }
      barWidth={24}
      yAxisLabelWidth={0}
      initialSpacing={10}
      endSpacing={15}
      barInnerComponent={({ value }) => {
        return (
          <GlassyView rounded={false}>
            <GlassyText className="text-white font-bold">
              {Math.round(value)}
            </GlassyText>
          </GlassyView>
        );
      }}
      spacing={14}
      noOfSections={5}
      showGradient
      yAxisThickness={0}
      xAxisThickness={0}
      hideRules
      yAxisTextStyle={{ color: theme.accent }}
      xAxisLabelTextStyle={{ color: theme.accent }}
      labelWidth={40}
      disablePress
    />
  );
}
