export function addDays(date, daysToAdd) {
  // Shift the date by the number of days specified
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + daysToAdd);
  return clone;
}

export function getWeek(forDate, daysOffset = 0) {
  // Immediately shift the date
  const date = addDays(forDate, daysOffset);
  // Get the day index for the new date, for example, Tuesday = 2
  const day = date.getDay();

  return {
    date,
    // e.g. if its Tuesday, shift back by 2 days
    start: addDays(date, -day),
    // e.g. if its Tuesday, shift forward by 4 days
    end: addDays(date, 6 - day),
  };
}

export function shortISO(date) {
  return date.toISOString().split("T")[0];
}

export const isDate = (date) => !isNaN(Date.parse(date));
