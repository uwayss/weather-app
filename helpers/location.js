import axios from "axios";

export async function getLocationFromIP(query) {
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
export async function getPublicIP() {
    try {
        const response = await axios.get("https://api.ipify.org?format=json");
        return response.data.ip;
    } catch (error) {
        console.error("Error fetching public IP:", error);
        return null;
    }
}
