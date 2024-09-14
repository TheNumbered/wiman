import { useGetQuery } from '@/hooks';
import { Bookings } from '@/interfaces';
import { Box, Typography } from '@mui/material';

const BookingRequestsModal: React.FC = () => {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useGetQuery<Bookings[]>({
    resource: 'api/admin/bookings',
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography color="error">An error occurred</Typography>;
  }

  return (
    <Box
      sx={{
        p: 2,
        flexGrow: 1,
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Booking Requests
      </Typography>
      <Box>
        {bookings?.length === 0 ? (
          <Typography>No bookings available</Typography>
        ) : (
          bookings?.map((booking) => (
            <Box key={booking.bookingId} sx={{ mb: 2, p: 2, border: '1px solid', borderRadius: 1 }}>
              <Typography variant="body2">{`Purpose: ${booking.eventName}`}</Typography>
              <Typography variant="body2">{`Date: ${booking.date}`}</Typography>
              <Typography variant="body2">{`Start Time: ${booking.startTime}`}</Typography>
              <Typography variant="body2">{`End Time: ${booking.endTime}`}</Typography>
              <Typography variant="body2">{`Venue ID: ${booking.venueId}`}</Typography>
              <Typography variant="body2">{`Status: ${booking.status}`}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default BookingRequestsModal;
