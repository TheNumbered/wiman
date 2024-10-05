import { useCreateMutation, useGetQuery, useUpdateMutation } from '@/hooks';
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

  const { mutate: notifyRecurringBooking } = useCreateMutation({
    resource: 'api/admin/notify/user',
    onSuccessMessage: 'Notification sent to organizer successfully!',
  });
  const venueIds = venueId.split(', ');

  const venueBookings = bookings?.filter(
    (booking) => venueIds.includes(booking.venueId) && booking.status !== 'cancelled',
  );

  const handleCancelBooking = (bookingId: number) => {
    cancelBooking({
      id: bookingId,
      data: {
        reasonForCancellation: 'Security Issue',
      },
    });
  };

  const handleNotifyRecurringBooking = (booking: BookingInterface) => {
    notifyRecurringBooking({
      userId: booking.userId,
      heading: 'Booking Cancellation',
      message: `Your booking for ${booking.eventName} at ${booking.venueId} has been cancelled due to issues with the venue, but the rest of the bookings are still on.`,
      route: '/bookings',
    });
  };

  return (
    <Dialog open={!!venueId} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Affected Bookings</DialogTitle>
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
                    onClick={() => handleNotifyRecurringBooking(booking)}
                  >
                    Cancel once and notify
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
