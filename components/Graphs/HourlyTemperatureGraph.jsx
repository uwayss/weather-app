import { BarChart } from "react-native-gifted-charts";
import { transformHourlyDataToChartData } from "../../helpers/weather";
import { useTheme } from "../../context/themeContext";
import { GlassyText, GlassyView } from "../Glassy";

export default function HourlyTemperatureGraph({ data }) {
  const { theme } = useTheme();
  return (
    <BarChart
      data={transformHourlyDataToChartData(data.TemperatureData)}
      barWidth={24}
      yAxisLabelWidth={0}
      initialSpacing={10}
      endSpacing={15}
      barInnerComponent={({ value }) => {
        return (
          <GlassyView rounded={false}>
            <GlassyText className="font-bold">{Math.round(value)}</GlassyText>
          </GlassyView>
        );
      }}
      spacing={25}
      noOfSections={5}
      showGradient
      labelWidth={40}
      xAxisThickness={0}
      yAxisThickness={0}
      xAxisLabelTextStyle={{ color: theme.accent }}
      yAxisTextStyle={{ color: theme.accent }}
    />
  );
}
