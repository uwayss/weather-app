export function isWithinLast30Minutes(date) {
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.getTime() - 1800000); // Subtract 30 minutes in milliseconds
  return date >= thirtyMinutesAgo && date <= now;
}
