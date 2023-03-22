export const DATE_NAME = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const firstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};
