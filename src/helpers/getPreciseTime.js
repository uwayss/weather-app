export default function getPreciseTime(time) {
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
