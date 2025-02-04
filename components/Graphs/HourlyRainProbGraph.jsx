import { LineChart } from "react-native-gifted-charts";
import { processPrecipitationData } from "../../helpers/weather";
import { useTheme } from "../../context/themeContext";

export default function HourlyRainProbGraph({ data }) {
  const currentData = processPrecipitationData(data, "hourly");
  const { theme } = useTheme();
  return (
    <LineChart
      areaChart
      data={currentData}
      dataPointsColor={"lightblue"}
      lineGradient={true}
      lineGradientStartColor="white"
      lineGradientEndColor="lightblue"
      thickness={5}
      hideRules
      startOpacity={1}
      endOpacity={0}
      initialSpacing={20}
      endSpacing={-30}
      noOfSections={6}
      yAxisLabelSuffix="%"
      yAxisTextStyle={{ color: theme.accent }}
      xAxisLabelTextStyle={{ color: theme.accent }}
      yAxisThickness={0}
      xAxisThickness={0}
    />
  );
}
