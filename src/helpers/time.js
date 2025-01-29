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
