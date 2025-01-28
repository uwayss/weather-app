import axios from "axios";

const NOMINATIM_API_ENDPOINT = "https://nominatim.openstreetmap.org/search";
export default async function fetchLocations(q) {
  try {
    const response = await axios.get(
      `${NOMINATIM_API_ENDPOINT}?format=json&addressdetails=1&limit=3&q=${q}`,
      {
        headers: {
          "User-Agent": "MuhammedsWeatherApp/1.0 (mamipromax1513@gmail.com)",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching locations: ", error);
    throw error;
  }
}
