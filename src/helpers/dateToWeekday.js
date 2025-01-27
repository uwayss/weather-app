export default function dateToWeekday(date = new Date().getDay()) {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date - 1];
}
