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
/**
 * Calculates and returns a more precise time string based on the given time.
 * It attempts to adjust the time to be more accurate by considering the current minute
 * and potentially adding an interval to align with 15-minute increments.
 *
 * @param {string} time - An ISO 8601 time string representing the base time.
 * @returns {string} A formatted time string in "HH:mm" (24-hour) format, potentially adjusted for precision.
 *
 * @example
 * // If current minute is 22 and time is '2025-01-29T16:00', it might return a time close to 16:15 or 16:30
 * getPreciseTime('2025-01-29T16:00');
 */
export function getPreciseTime(time) {
  const currentMinute = new Date().getMinutes();
  let interval = 0;
  if (currentMinute > 15 > 30) {
    interval = (currentMinute - 15) * 60000;
  } else if (currentMinute > 30 > 45) {
    interval = (currentMinute - 30) * 60000;
  } else if (currentMinute > 45) {
    interval = (currentMinute - 45) * 60000;
  } else {
    interval = currentMinute * 60000;
  }
  return new Date(new Date(time).getTime() + interval).toLocaleTimeString(
    "en-UK",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );
}
