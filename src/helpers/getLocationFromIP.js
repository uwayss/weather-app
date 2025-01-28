import axios from "axios";

export default getLocationFromIP = async (query) => {
  try {
    const response = await axios.get(
      `http://ip-api.com/json/${query}?fields=61433`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
