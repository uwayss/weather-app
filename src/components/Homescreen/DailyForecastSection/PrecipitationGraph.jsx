import { View, ScrollView, Text } from 'react-native'
import { GlassyText, GlassyView } from '../../Glassy'
import { useWeather } from '../../../context/weatherContext';
import { BarChart, LineChart } from "react-native-gifted-charts";
import { processPrecipitationData } from "../../../helpers/weather";


function Graph({ data }) {
    const currentData = processPrecipitationData(data)
    return (
        <ScrollView horizontal>
            <LineChart
                areaChart
                data={currentData}
                dataPointsColor='lightblue'
                dataPointsShape=''
                lineGradient={true}
                lineGradientStartColor='white'
                lineGradientEndColor='lightblue'
                thickness={2}
                startOpacity={1}
                endOpacity={0}
                initialSpacing={15}
                endSpacing={0}
                noOfSections={6}
                yAxisThickness={0}
                rulesType="solid"
                rulesColor="white"
                yAxisTextStyle={{ color: 'white' }}
                xAxisLabelTextStyle={{ color: 'white' }}
                xAxisThickness={0}
            />
        </ScrollView>
    )
}

export default function TemperatureGraph() {
    const { dailyWeather } = useWeather();
    if (!dailyWeather || !dailyWeather.forecast) {
        return (
            <GlassyView className="p-4 w-11/12 m-2">
                <GlassyText>Precipitation data unavailable.</GlassyText>
            </GlassyView>
        );
    }
    const precipitationData = dailyWeather.forecast.map(day => ({
        day: new Date(day.time).toLocaleDateString('en-UK', { weekday: 'short' }),
        precipitation: day.precipitation_probability_max || 0,
    }));

    return (
        <GlassyView className="p-4 m-4" transparency={30}>
            <GlassyText className="text-xl font-bold mb-2">Precipitation Forecast</GlassyText>
            <Graph data={precipitationData} />
        </GlassyView>
    )
}