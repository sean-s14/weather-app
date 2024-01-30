export function getDayOfWeek(dateString: string): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(dateString);
  const dayIndex = date.getUTCDay();

  return daysOfWeek[dayIndex];
}
