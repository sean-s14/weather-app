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

export function getDayOfMonth(dateString: string): number {
  const date = new Date(dateString);
  return date.getUTCDate();
}

export function getMonth(dateString: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const monthIndex = date.getUTCMonth();

  return months[monthIndex];
}
