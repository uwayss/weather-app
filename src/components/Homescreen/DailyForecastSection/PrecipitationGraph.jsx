// FILE: src/components/Homescreen/DailyForecastSection/PrecipitationGraph.jsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useWeather } from '../../../context/weatherContext';
import { GlassyView, GlassyText } from '../../Glassy';

export default function PrecipitationGraph() {
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
            <ScrollView horizontal className="h-32 border-b border-white/20">
                <View className="flex-row items-end h-full">
                    {precipitationData.map((item, index) => (
                        <View key={index} className="flex-none items-center px-4">
                            <GlassyText className="text-xs mb-1">{item.precipitation}%</GlassyText>
                            <View
                                className="bg-blue-300"
                                style={{ height: `${item.precipitation}%`, width: 20 }}
                            />
                            <GlassyText className="text-xs mt-1">{item.day}</GlassyText>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </GlassyView>
    );
}