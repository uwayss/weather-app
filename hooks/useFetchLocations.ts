import { makeNominatimRequest } from "../helpers/api";

export default async function fetchLocations(q: string) {
  // TODO: Save last location in asyncStorage just like the weather
  try {
    const response = await makeNominatimRequest(q);
    const data = response;
    return data;
  } catch (error) {
    console.error("Error fetching locations: ", error);
    throw error;
  }
}
