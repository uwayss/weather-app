import { GlassyText, GlassyView } from "../../Glassy";
import { LineChart } from "react-native-gifted-charts";
import { processPrecipitationData } from "../../../helpers/weather";
import { useTheme } from "../../../context/themeContext";

function Graph({ data }) {
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
      thickness={2}
      hideRules
      startOpacity={1}
      endOpacity={0}
      initialSpacing={20}
      endSpacing={-30}
      noOfSections={6}
      yAxisThickness={0}
      rulesType="solid"
      rulesColor="white"
      yAxisTextStyle={{ color: theme.accent }}
      xAxisLabelTextStyle={{ color: theme.accent }}
      xAxisThickness={0}
    />
  );
}

export default function PrecipitationGraph({ data }) {
  if (!data) {
    return (
      <GlassyView className="p-4 w-11/12 m-2">
        <GlassyText>Data unavailable</GlassyText>
      </GlassyView>
    );
  } else {
    const processedData = data.map((day) => {
      return {
        hour:
          new Date(day.time).getHours().toString().padStart(2, "0") +
          ":" +
          new Date(day.time).getMinutes().toString().padStart(2, "0"),
        precipitation: day.rainProbability || 0,
      };
    });

    return (
      <GlassyView className="py-4 m-4" trans>
        <GlassyText className="text-xl font-bold mb-2">
          Rain Probabliity Graph
        </GlassyText>
        <Graph data={processedData} />
      </GlassyView>
    );
  }
}
