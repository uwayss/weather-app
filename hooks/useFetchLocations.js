import { makeNominatimRequest } from "../helpers/api";

export default async function fetchLocations(q) {
  try {
    const response = await makeNominatimRequest(q)
    const data = response;
    return data;
  } catch (error) {
    console.error("Error fetching locations: ", error);
    throw error;
  }
}
