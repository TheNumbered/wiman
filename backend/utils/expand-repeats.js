import { addDays, addMonths, addWeeks, format } from 'date-fns';

export const expandRepeats = (date, frequency, repeatUntil) => {
  const repeatDates = [];
  let currentDate = new Date(date);
  repeatUntil = new Date(repeatUntil);

  repeatDates.push(format(currentDate, 'yyyy-MM-dd'));

  if (frequency === 'none' || !repeatUntil) return repeatDates;

  while (currentDate <= repeatUntil) {
    switch (frequency) {
      case 'daily':
        currentDate = addDays(currentDate, 1);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, 1);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, 1);
        break;
      default:
        return repeatDates;
    }

    if (currentDate <= repeatUntil) {
      repeatDates.push(format(currentDate, 'yyyy-MM-dd'));
    }
  }

  return repeatDates;
};
