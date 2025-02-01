import { GlassyText, GlassyView } from "../../Glassy";
import { useWeather } from "../../../context/weatherContext";
import { LineChart } from "react-native-gifted-charts";
import { processPrecipitationData } from "../../../helpers/weather";

function Graph({ data }) {
  const currentData = processPrecipitationData(data, "hourly");
  return (
    <LineChart
      areaChart
      data={currentData}
      dataPointsColor="lightblue"
      lineGradient={true}
      lineGradientStartColor="white"
      lineGradientEndColor="lightblue"
      thickness={2}
      startOpacity={1}
      endOpacity={0}
      showValuesAsDataPointsText
      initialSpacing={15}
      endSpacing={-40}
      noOfSections={6}
      yAxisThickness={0}
      rulesType="solid"
      rulesColor="white"
      yAxisTextStyle={{ color: "white" }}
      xAxisLabelTextStyle={{ color: "white" }}
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
        hour: new Date(day.time).getHours(),
        precipitation: day.rainProbability || 0,
      };
    });

    return (
      <GlassyView className="p-4 m-4" transparency={30}>
        <GlassyText className="text-xl font-bold mb-2">
          Rain Probabliity Graph
        </GlassyText>
        <Graph data={processedData} />
      </GlassyView>
    );
  }
}
