import weatherDescriptions from "../constants/descriptions";

export default function weatherCodeToCondition(code) {
  // TODO: implement day/night logic
  // For simplicity, we'll assume daytime for now
  // In a real-world application, you'd need to check the sunrise and sunset times to determine if it's day or night

  if (typeof code !== "number") {
    throw new Error("WeatherCodeToCondition: Weather code is null or empty");
  }
  return weatherDescriptions[code].day.description;
}
