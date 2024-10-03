import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Bookings as BookingInterface } from '@/interfaces';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

const CancelVenueBookingsModal = ({
  venueId,
  onClose,
}: {
  venueId: string;
  onClose: () => void;
}) => {
  const { data: bookings } = useGetQuery<BookingInterface[]>({
    resource: 'api/admin/bookings',
  });

  const { mutate: cancelBooking } = useUpdateMutation({
    resource: 'api/admin/bookings/cancel',
    onSuccessMessage: 'Booking cancelled successfully!',
    invalidateKeys: ['api/admin/bookings'],
  });

  // Filter to exclude cancelled bookings
  const venueBookings = bookings?.filter(
    (booking) => booking.venueId === venueId && booking.status !== 'cancelled',
  );

  const handleCancelBooking = (bookingId: number) => {
    cancelBooking({
      id: bookingId,
      data: {
        reasonForCancellation: 'Security Issue',
      },
    });
  };

  const handleNotifyRecurringBooking = (bookingId: number) => {
    // Logic to send notification for recurring bookings
    console.log(`Notify recurring booking: ${bookingId}`);
  };

  return (
    <Dialog open={!!venueId} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Bookings for Venue: {venueId}</DialogTitle>
      <DialogContent>
        {venueBookings && venueBookings.length > 0 ? (
          venueBookings.map((booking) => (
            <Card key={booking.bookingId} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{booking.eventName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date(booking.date).toLocaleDateString()} | Time: {booking.startTime} -{' '}
                  {booking.endTime}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Typography>
                {booking.repeatFrequency !== 'none' && (
                  <Typography variant="body2" color="textSecondary">
                    Recurs: {booking.repeatFrequency}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                {booking.repeatFrequency === 'none' ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancelBooking(booking.bookingId)}
                  >
                    Cancel Booking
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleNotifyRecurringBooking(booking.bookingId)}
                  >
                    Notify Organizer
                  </Button>
                )}
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>No bookings for this venue.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CancelVenueBookingsModal;
