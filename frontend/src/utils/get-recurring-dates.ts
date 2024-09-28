import { addDays, addMonths, addWeeks, format, isBefore, isEqual, parseISO } from 'date-fns';

export const getRecurringDates = (
  startDate: string | Date,
  repeatFrequency: string,
  repeatUntilDate: string | Date | undefined,
) => {
  const reservations: Record<string, boolean> = {};

  const currentDate = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const repeatUntil = repeatUntilDate ? parseISO(repeatUntilDate.toString()) : null;

  reservations[format(currentDate, 'yyyy-MM-dd')] = true;

  if (repeatFrequency !== 'none' && repeatUntil) {
    let nextDate = currentDate;

    while (isBefore(nextDate, repeatUntil) || isEqual(nextDate, repeatUntil)) {
      if (repeatFrequency === 'daily') {
        nextDate = addDays(nextDate, 1);
      } else if (repeatFrequency === 'weekly') {
        nextDate = addWeeks(nextDate, 1);
      } else if (repeatFrequency === 'monthly') {
        nextDate = addMonths(nextDate, 1);
      }

      if (isBefore(nextDate, repeatUntil) || isEqual(nextDate, repeatUntil)) {
        reservations[format(nextDate, 'yyyy-MM-dd')] = true;
      }
    }
  }

  return reservations;
};
