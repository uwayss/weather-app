import axios from "axios";
import { IPGeolocationResponse } from "../../types/apiTypes";

export async function getLocationFromIP(query: string): Promise<IPGeolocationResponse | null> {
  try {
    const response = await axios.get(`http://ip-api.com/json/${query}?fields=61433`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export async function getPublicIP(): Promise<string | null> {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching public IP:", error);
    return null;
  }
}
