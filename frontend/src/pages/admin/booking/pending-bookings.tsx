import { useGlobal } from '@/hooks/global-provider';
import { Bookings, Venue } from '@/interfaces';
import { formatDate, formatTime } from '@/utils';
import { useAuth } from '@clerk/clerk-react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { getVenueById, isConflict } from './utils';

// Component for displaying pending bookings
const PendingBookings: React.FC<{
  bookings: Bookings[];
  venues: Venue[];
  onApprove: (id: number) => void;
  onDelete: (id: number, reason: string) => void;
}> = ({ bookings, venues, onApprove, onDelete }) => {
  const { getToken } = useAuth();
  const { showToast } = useGlobal();
  const ourApiBaseUrl = import.meta.env.VITE_API_URL;
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = (id: number) => {
    setSelectedBookingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReason('');
  };

  const handleCancel = () => {
    if (selectedBookingId) {
      onDelete(selectedBookingId, reason);
      handleClose();
    }
  };

  const handleApprove = async (booking: Bookings) => {
    try {
      const token = await getToken();
      const response = await fetch(`${ourApiBaseUrl}/api/venues/${booking.venueId}/reservations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      const hasConflict = isConflict(data, booking.date, booking.startTime, booking.endTime);
      if (hasConflict.isConflict) {
        showToast(
          `Booking conflicts with another event: ${hasConflict.reservation.event_name} (${hasConflict.reservation.time})`,
          'warning',
        );
        return;
      }
      onApprove(booking.bookingId);
    } catch {
      showToast('Unable to fetch reservations', 'error');
      return;
    }
  };

  return (
    <Box>
      <Typography variant="h6" color="orange" gutterBottom>
        Pending Bookings
      </Typography>
      {bookings.length === 0 ? (
        <Typography>No pending bookings</Typography>
      ) : (
        bookings.map((booking) => (
          <Box
            component={'article'}
            key={booking.bookingId}
            sx={{
              mb: 2,
              p: 2,
              border: '1px solid',
              borderColor: '#eee',
              transition: '.3s all ease-in',
              borderRadius: 1,
              '&:hover': {
                borderColor: theme.palette.secondary.main,
              },
            }}
          >
            <Grid2 m={2} gap={2} container>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="h5">{`${booking.eventName}`}</Typography>
                <Typography variant="body2">{`Date: ${formatDate(booking.date)}`}</Typography>
                <Grid2 mb={2} container gap={3}>
                  <Grid2>
                    <Typography color="text.disabled" variant="overline">
                      FROM
                    </Typography>
                    <Typography variant="body1">{`${formatTime(booking.startTime)}`}</Typography>
                  </Grid2>
                  <Grid2>
                    <Typography color="text.disabled" variant="overline">
                      TO
                    </Typography>
                    <Typography variant="body1">{`${formatTime(booking.endTime)}`}</Typography>
                  </Grid2>
                </Grid2>

                {booking.repeatFrequency == 'none' ? (
                  <Chip label={'Once-Off'} />
                ) : (
                  <Chip label={booking.repeatFrequency} />
                )}
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography color="text.disabled" variant="overline">
                  Requested Venue
                </Typography>
                <Typography>
                  <strong>{`${getVenueById(venues, booking.venueId)?.buildingName || 'Venue Info not found'} `}</strong>
                  - {booking.venueId}
                </Typography>
                <Grid2 mb={2} container gap={3}>
                  <Grid2>
                    <Typography color="text.disabled" variant="overline">
                      Venue Type
                    </Typography>
                    <Typography variant="body1">{`${getVenueById(venues, booking.venueId)?.type || '...'} `}</Typography>
                  </Grid2>
                  <Grid2>
                    <Typography color="text.disabled" variant="overline">
                      Capacity
                    </Typography>
                    <Typography variant="body1">{`${getVenueById(venues, booking.venueId)?.capacity || '...'} `}</Typography>
                  </Grid2>
                </Grid2>
                {getVenueById(venues, booking.venueId)?.status === 'UNDER-MANTAINANCE' && (
                  <Chip label={'Venue Under Maintenance'} />
                )}
              </Grid2>
              <Grid2 size={{ xs: 12, md: 3 }} display={'flex'} gap={2} flexDirection={'column'}>
                <Button
                  variant="outlined"
                  color="success"
                  disableElevation
                  onClick={() => handleApprove(booking)}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  disableElevation
                  onClick={() => handleOpen(booking.bookingId)}
                >
                  Reject
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        ))
      )}

      {/* Dialog for capturing reason for cancellation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Provide Reason for Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Please provide a reason for deleting this booking.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Reason for Cancellation"
            fullWidth
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleCancel} color="error">
            Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingBookings;
