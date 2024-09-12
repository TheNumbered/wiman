import { useAuth } from '@clerk/clerk-react';
import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Define TypeScript types
interface Booking {
  id: number;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  venueId: number;
  status: 'active' | 'cancelled' | 'inactive';
  reasonForCancellation?: string;
  repeatFrequency?: 'none' | 'daily' | 'weekly' | 'monthly';
  purpose: string;
}

const BookingRequestsModal: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState<string>('');
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const { getToken } = useAuth();

  // Fetch bookings from the API
  const fetchBookings = async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.get('http://localhost:3000/api/bookings', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.headers['content-type']?.includes('application/json')) {
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          throw new Error('Invalid data format');
        }
      } else {
        throw new Error('Response is not JSON');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Error fetching bookings');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [getToken]);

  // Handle status update
  const updateBookingStatus = async (
    id: number,
    newStatus: 'active' | 'inactive' | 'cancelled',
  ) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      await axios.put(
        `http://localhost:3000/api/bookings/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchBookings(); // Refresh bookings after the update
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Handle booking cancellation
  const cancelBooking = async () => {
    if (selectedBookingId === null) return;

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      await axios.put(
        `http://localhost:3000/api/bookings/${selectedBookingId}/cancel`,
        { reasonForCancellation: cancellationReason },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSnackbarMessage('Booking cancelled successfully');
      setSnackbarSeverity('success');
      setCancellationReason('');
      setSelectedBookingId(null);
      fetchBookings(); // Refresh bookings after cancellation
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setSnackbarMessage('Error cancelling booking');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        p: 2,
        flexGrow: 1,
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'scroll', // Allows scrolling while hiding the scrollbar
        '&::-webkit-scrollbar': {
          display: 'none', // Hides scrollbar in WebKit browsers
        },
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Booking Requests
      </Typography>
      <Box>
        {bookings.length === 0 ? (
          <Typography>No bookings available</Typography>
        ) : (
          bookings.map((booking) => (
            <Box key={booking.id} sx={{ mb: 2, p: 2, border: '1px solid', borderRadius: 1 }}>
              <Typography variant="body1">{`User ID: ${booking.userId}`}</Typography>
              <Typography variant="body2">{`Date: ${booking.date}`}</Typography>
              <Typography variant="body2">{`Start Time: ${booking.startTime}`}</Typography>
              <Typography variant="body2">{`End Time: ${booking.endTime}`}</Typography>
              <Typography variant="body2">{`Venue ID: ${booking.venueId}`}</Typography>
              <Typography variant="body2">{`Status: ${booking.status}`}</Typography>
              <Typography variant="body2">{`Purpose: ${booking.purpose}`}</Typography>

              {booking.status !== 'cancelled' && (
                <>
                  {booking.status === 'inactive' && (
                    <Button
                      variant="contained"
                      color="primary" // Blue button as in MaintenancePage
                      sx={{ mr: 1 }}
                      onClick={() => updateBookingStatus(booking.id, 'active')}
                    >
                      Mark as Active
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setSelectedBookingId(booking.id);
                      setCancellationReason(''); // Clear previous reason
                    }}
                  >
                    Cancel Booking
                  </Button>
                </>
              )}

              {selectedBookingId === booking.id && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Reason for Cancellation"
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" color="error" onClick={cancelBooking}>
                    Confirm Cancellation
                  </Button>
                </Box>
              )}
            </Box>
          ))
        )}
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingRequestsModal;
