import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Bookings } from '@/interfaces';
import { scrollbarStyles } from '@/theme';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import BookingCard from './card';

interface BookingsListProps {
  onSelectCard: (booking: Bookings) => void;
}

const BookingsList: React.FC<BookingsListProps> = ({ onSelectCard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null); // For filtering by status
  const [filteredBookings, setFilteredBookings] = useState<Bookings[]>([]);

  const { data: bookings } = useGetQuery<Bookings[]>({
    resource: 'api/user/bookings',
  });

  const { mutate: cancelBooking } = useUpdateMutation({
    resource: 'api/bookings/cancel',
    invalidateKeys: ['api/user/bookings'],
  });

  const handleCancelBooking = (id: number) => {
    cancelBooking({ id: id, data: {} });
    console.log('Canceling booking with ID:', id);
  };

  const handleRebooking = (id: number) => {
    console.log('Rebooking booking with ID:', id);
    // TODO: Implement rebooking logic
  };

  useEffect(() => {
    if (bookings) {
      let filtered = bookings;
      if (statusFilter) {
        filtered = filtered.filter((booking) => {
          const isPast = new Date(booking.date) < new Date();

          if (statusFilter === 'cancelled') {
            return booking.status === 'cancelled' || (booking.status === 'pending' && isPast);
          }
          if (statusFilter === 'pending') {
            return booking.status === 'pending' && !isPast;
          }

          return booking.status === statusFilter;
        });
      }
      if (searchTerm) {
        filtered = filtered.filter((booking) =>
          booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }
      setFilteredBookings(filtered);
    }
  }, [bookings, searchTerm, statusFilter]);

  return (
    <Container
      sx={{
        overflowY: 'scroll',
        height: '100vh',
        pb: 3,
        ...scrollbarStyles,
      }}
    >
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Bookings</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h4" component="h2">
        Bookings
      </Typography>
      {/* Search Field */}
      <Box sx={{ mb: 3, mt: 2 }}>
        <TextField
          variant={'standard'}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Status Filter Buttons */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Button
          variant={statusFilter === null ? 'contained' : 'outlined'}
          onClick={() => setStatusFilter(null)}
        >
          All
        </Button>
        <Button
          variant={statusFilter === 'confirmed' ? 'contained' : 'outlined'}
          onClick={() => setStatusFilter('confirmed')}
        >
          Confirmed
        </Button>
        <Button
          variant={statusFilter === 'pending' ? 'contained' : 'outlined'}
          onClick={() => setStatusFilter('pending')}
        >
          Pending
        </Button>
        <Button
          variant={statusFilter === 'cancelled' ? 'contained' : 'outlined'}
          onClick={() => setStatusFilter('cancelled')}
        >
          Cancelled
        </Button>
      </Box>

      {/* Active Bookings */}
      <>
        {filteredBookings?.map((booking, index) => (
          <BookingCard
            key={index}
            booking={booking}
            onSelectCard={onSelectCard}
            onCancelBooking={() => handleCancelBooking(booking.bookingId)}
            onRebooking={() => handleRebooking(booking.bookingId)}
          />
        ))}
        <Divider sx={{ my: 3 }} />
      </>
    </Container>
  );
};

export default BookingsList;
