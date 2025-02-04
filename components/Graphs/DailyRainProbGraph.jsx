import { LineChart } from "react-native-gifted-charts";
import { processPrecipitationData } from "../../helpers/weather";
import { useTheme } from "../../context/themeContext";
export default function DailyRainProbGraph({ data }) {
  const currentData = processPrecipitationData(data);
  const { theme } = useTheme();
  return (
    <LineChart
      areaChart
      data={currentData}
      dataPointsColor="lightblue"
      dataPointsShape=""
      lineGradient={true}
      lineGradientStartColor="white"
      lineGradientEndColor="lightblue"
      thickness={3}
      startOpacity={1}
      endOpacity={0}
      initialSpacing={15}
      endSpacing={-40}
      noOfSections={6}
      hideRules
      xAxisLabelTextStyle={{ color: theme.accent }}
      yAxisTextStyle={{ color: theme.accent }}
      xAxisThickness={0}
      yAxisThickness={0}
      yAxisLabelSuffix="%"
    />
  );
}
