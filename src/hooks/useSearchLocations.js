export default async function searchLocations(query) {
  const response = await fetch(
    "https://nominatim.openstreetmap.org/search?format=json&q=" + query
  );
  console.error(await response.json());
}
