
const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000;
export function isWithinLast30Minutes(dateString) {
  if (!dateString) {
    return false; // Or handle null/undefined date strings as needed
  }
  const date = new Date(dateString);
  const now = Date.now(); // Get current timestamp in milliseconds
  const dateTimestamp = date.getTime(); // Get timestamp of the input date

  if (isNaN(dateTimestamp)) {
    console.warn("Invalid date string provided to isWithinLast30Minutes:", dateString);
    return false; // Handle invalid date strings
  }

  const thirtyMinutesAgo = now - THIRTY_MINUTES_IN_MS;

  return dateTimestamp >= thirtyMinutesAgo && dateTimestamp <= now;
}
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
export function dateToWeekday(date = new Date().getDay()) {
  return WEEKDAYS[date - 1];
}