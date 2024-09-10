import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Booking } from '@/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import BookingCard from './card';

const BookingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: activeBookings } = useGetQuery({
    resource: 'api/bookings/active',
  });
  const { data: pastBookings } = useGetQuery({
    resource: 'api/bookings/past',
  });
  const { mutate: cancelBooking } = useUpdateMutation({
    resource: 'api/bookings/cancel',
    invalidateKeys: ['api/bookings/active', 'api/bookings/past'],
  });

  const filterBookings = (bookings: Booking[]) => {
    if (!searchTerm) return bookings;
    return bookings.filter((booking) =>
      booking.purpose.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const handleCancelBooking = (id: number) => {
    cancelBooking({ id: id, data: {} });
  };

  const handleRebooking = (id: number) => {
    console.log('Rebooking booking with ID:', id);
    // TODO: Implement rebooking logic
  };

  return (
    <Container>
      {/* Search Field */}
      <Box sx={{ mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Active bookings
      </Typography>

      {/* Active Bookings */}
      {activeBookings?.length > 0 && (
        <>
          {filterBookings(activeBookings).map((booking, index) => (
            <BookingCard
              key={index}
              booking={booking}
              onCancelBooking={() => handleCancelBooking(booking.id)}
            />
          ))}
          <Divider sx={{ my: 3 }} />
        </>
      )}

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Past bookings
      </Typography>

      {/* Past Bookings */}
      {pastBookings?.length > 0 && (
        <>
          {filterBookings(pastBookings).map((booking, index) => (
            <BookingCard
              key={index}
              booking={booking}
              onRebooking={() => handleRebooking(booking.id)}
            />
          ))}
        </>
      )}
    </Container>
  );
};

export default BookingPage;
