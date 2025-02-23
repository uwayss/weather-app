import { LocationAPIResponse } from "../../types/apiTypes";
import axios from "axios";

const locationApi = (q: string) =>
  `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=3&q=${q}`;
const defaultHeaders = {
  "User-Agent": "MuhammedsWeatherApp/1.0 (mamipromax1513@gmail.com)",
};
export async function makeNominatimRequest(q: string): Promise<LocationAPIResponse> {
  try {
    const response = await axios.get(locationApi(q), {
      headers: defaultHeaders,
    });
    return response.data;
  } catch (error) {
    console.error(`Request to Nominatim api failed:`, error);
    throw error;
  }
}
