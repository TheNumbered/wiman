import { Bookings } from '@/interfaces';
import { NavigateBeforeRounded } from '@mui/icons-material';
import { Box, Button, Container, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container
      sx={{
        width: '100%',
        pt: { xs: 2 },
        pb: { xs: 6, md: 0 },
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        {(!isSmallScreen || selectedBooking === null) && (
          <Box sx={{ flex: 1, borderRight: '1px solid #ddd', overflowY: 'auto' }}>
            {/* BookingsList takes up full width on small screens when no booking is selected */}
            <BookingsList onSelectCard={(booking) => setSelectedBooking(booking)} />
          </Box>
        )}
        {selectedBooking !== null && isSmallScreen ? (
          <Box sx={{ flex: 1 }}>
            {/* Show the details view on small screens when a booking is selected */}
            <Button
              onClick={() => setSelectedBooking(null)}
              variant="text"
              sx={{ mb: 2, width: '100%' }}
            >
              <NavigateBeforeRounded /> Back to List
            </Button>
            <BookingsDetails booking={selectedBooking} />
          </Box>
        ) : (
          !isSmallScreen && (
            <Box
              sx={{
                flex: 1,
              }}
            >
              {selectedBooking === null ? (
                <NoCardSelected />
              ) : (
                <BookingsDetails booking={selectedBooking} />
              )}
            </Box>
          )
        )}
      </Box>
    </Container>
  );
};

export default BookingsPage;
