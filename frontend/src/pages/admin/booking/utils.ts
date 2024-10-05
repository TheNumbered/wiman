import { Venue } from '@/interfaces';
import { formatDate } from 'date-fns';

// Function to get venue by venueId
export const getVenueById = (venues: Venue[], venueId: string) => {
  return venues.find((venue) => {
    if (venue.venueId.trim() === venueId.trim()) {
      return venue;
    }
  });
};

// Function to check for booking conflicts
export const isConflict = (
  reservations: any,
  bookingDate: any,
  startTime: string,
  endTime: string,
) => {
  const formattedDate = formatDate(new Date(bookingDate), 'yyyy-MM-dd');

  if (reservations && reservations[formattedDate]) {
    console.log('Reservations for date:', reservations[formattedDate]);

    for (const reservation of reservations[formattedDate]) {
      const [resStart, resEnd] = reservation.time.split('-');

      if (
        (startTime >= resStart && startTime < resEnd) || // Conflict with start time
        (endTime > resStart && endTime <= resEnd) || // Conflict with end time
        (startTime <= resStart && endTime >= resEnd) // Booking completely overlaps
      ) {
        return { isConflict: true, reservation };
      }
    }
  }

  // No conflict found
  return { isConflict: false, reservation: null };
};
