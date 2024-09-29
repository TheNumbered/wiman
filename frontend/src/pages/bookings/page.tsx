import { Bookings } from '@/interfaces';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import BookingsDetails from './bookings-details';
import BookingsList from './list';

const NoCardSelected = () => (
  <Box sx={{ flex: 1 }}>
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img style={{ width: '15rem' }} src="/illustration.svg" alt="illustration" />
      <h2 style={{ marginBottom: '0' }}>No booking is selected yet</h2>
      <p style={{ color: '#777', margin: '0' }}>
        Choose a booking on the left menu to view its details
      </p>
    </Box>
  </Box>
);

const BookingsPage: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<Bookings | null>(null);
  return (
    <Container sx={{ width: '100%', pt: { xs: 2, md: 0 }, height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        {/* BookingsList takes up 50% of the screen */}
        <Box sx={{ flex: 1, borderRight: '1px solid #ddd', overflowY: 'auto' }}>
          <BookingsList onSelectCard={(booking) => setSelectedBooking(booking)} />
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {selectedBooking === null ? (
            <NoCardSelected />
          ) : (
            <BookingsDetails booking={selectedBooking} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BookingsPage;
