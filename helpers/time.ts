const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000;

/**
 * Checks if a given date string represents a date within the last 30 minutes.
 *
 * @param dateString The date string to check.  Should be a string that can be parsed by `new Date()`.
 * @returns `true` if the date is within the last 30 minutes, `false` otherwise.  Also returns `false` if the input is invalid.
 */
export function isWithinLast30Minutes(dateString: string): boolean {
  if (!dateString) {
    return false; // Or handle null/undefined date strings as needed
  }

  const date = new Date(dateString);
  const now = Date.now(); // Get current timestamp in milliseconds
  const dateTimestamp = date.getTime(); // Get timestamp of the input date

  if (isNaN(dateTimestamp)) {
    console.error("Invalid date string provided to isWithinLast30Minutes:", dateString);
    return false; // Handle invalid date strings
  }

  const thirtyMinutesAgo = now - THIRTY_MINUTES_IN_MS;

  return dateTimestamp >= thirtyMinutesAgo && dateTimestamp <= now;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Converts a date (or day index) to its corresponding weekday name.
 *
 * @param date Either a Date object or the numeric day of the week (0 for Sunday, 1 for Monday, etc.). If omitted, defaults to the current day.
 * @returns The name of the weekday (e.g., "Monday").  Returns undefined if the input is out of range.
 */
export function dateToWeekday(date: Date | number = new Date().getDay()): string | undefined {
  let dayIndex: number;

  if (date instanceof Date) {
    dayIndex = date.getDay();
  } else if (typeof date === "number" && date >= 0 && date <= 6) {
    // Check if it is a number and is in the range 0-6
    dayIndex = date;
  } else {
    return undefined; // Handle out of range or incorrect input type
  }

  return WEEKDAYS[dayIndex];
}
