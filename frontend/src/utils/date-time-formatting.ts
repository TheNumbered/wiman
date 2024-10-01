// Utility functions for formatting
export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // formats to DD/MM/YYYY
};

export const formatTime = (timeString: string) => {
  const date = new Date(`1970-01-01T${timeString}Z`); // create a date with time
  return date
    .toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
    })
    .replace(':', 'h'); // replace colon with 'h'
};
