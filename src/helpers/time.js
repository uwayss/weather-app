const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
export function isWithinLast30Minutes(date) {
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.getTime() - THIRTY_MINUTES_IN_MS); // Subtract 30 minutes in milliseconds
  return date >= thirtyMinutesAgo && date <= now;
}
export function dateToWeekday(date = new Date().getDay()) {
  return WEEKDAYS[date - 1];
}