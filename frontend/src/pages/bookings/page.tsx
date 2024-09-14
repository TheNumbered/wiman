import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Bookings } from '@/interfaces';
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
  const [filteredBookings, setFilteredBookings] = useState<Bookings[]>([]);
  const [filteredBookingsPast, setFilteredBookingsPast] = useState<Bookings[]>([]);

  const { data: activeBookings } = useGetQuery<Bookings[]>({
    resource: 'api/user/bookings/active',
  });
  const { data: pastBookings } = useGetQuery<Bookings[]>({
    resource: 'api/user/bookings/past',
  });

  if (activeBookings) {
    if (searchTerm) {
      const filtered = activeBookings.filter((booking) =>
        booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(activeBookings);
    }
  }

  if (pastBookings) {
    if (searchTerm) {
      const filtered = pastBookings.filter((booking) =>
        booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredBookingsPast(filtered);
    } else {
      setFilteredBookingsPast(pastBookings);
    }
  }

  const { mutate: cancelBooking } = useUpdateMutation({
    resource: 'api/bookings/cancel',
    invalidateKeys: ['api/user/bookings/active', 'api/user/bookings/past'],
  });

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
      <>
        {filteredBookings?.map((booking, index) => (
          <BookingCard
            key={index}
            booking={booking}
            onCancelBooking={() => handleCancelBooking(booking.bookingId)}
          />
        ))}
        <Divider sx={{ my: 3 }} />
      </>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Past bookings
      </Typography>

      {/* Past Bookings */}
      <>
        {filteredBookingsPast?.map((booking, index) => (
          <BookingCard
            key={index}
            booking={booking}
            onRebooking={() => handleRebooking(booking.bookingId)}
          />
        ))}
      </>
    </Container>
  );
};

export default BookingPage;
