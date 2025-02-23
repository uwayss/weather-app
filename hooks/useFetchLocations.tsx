import { makeNominatimRequest } from "@/helpers/api/nominatim";

export default async function fetchLocations(q: string) {
  try {
    const response = await makeNominatimRequest(q);
    const data = response;
    return data;
  } catch (error) {
    console.error("Error fetching locations: ", error);
    throw error;
  }
}
