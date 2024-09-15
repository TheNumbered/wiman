import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Bookings } from '@/interfaces';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

// Component for displaying pending bookings
const PendingBookings: React.FC<{
  bookings: Bookings[];
  onApprove: (id: number) => void;
  onDelete: (id: number, reason: string) => void;
}> = ({ bookings, onApprove, onDelete }) => {
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = (id: number) => {
    setSelectedBookingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReason('');
  };

  const handleDelete = () => {
    if (selectedBookingId) {
      onDelete(selectedBookingId, reason);
      handleClose();
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
          <Paper
            key={booking.bookingId}
            sx={{
              mb: 2,
              p: 2,
              border: '1px solid',
              borderColor: 'orange',
              borderRadius: 1,
              backgroundColor: 'rgba(255, 165, 0, 0.1)',
            }}
          >
            <Typography variant="body1">{`Event: ${booking.eventName}`}</Typography>
            <Typography variant="body2">{`Date: ${booking.date}`}</Typography>
            <Typography variant="body2">{`Time: ${booking.startTime} - ${booking.endTime}`}</Typography>
            <Typography variant="body2">{`Venue ID: ${booking.venueId}`}</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => onApprove(booking.bookingId)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleOpen(booking.bookingId)}
              >
                Reject
              </Button>
            </Box>
          </Paper>
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
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Component for displaying confirmed bookings
const ConfirmedBookings: React.FC<{
  bookings: Bookings[];
  onCancel: (id: number, reason: string) => void;
}> = ({ bookings, onCancel }) => {
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);

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
      onCancel(selectedBookingId, reason);
      handleClose();
    }
  };

  return (
    <Box>
      <Typography variant="h6" color="green" gutterBottom>
        Confirmed Bookings
      </Typography>
      {bookings.length === 0 ? (
        <Typography>No confirmed bookings</Typography>
      ) : (
        bookings.map((booking) => (
          <Paper
            key={booking.bookingId}
            sx={{
              mb: 2,
              p: 2,
              border: '1px solid',
              borderColor: 'green',
              borderRadius: 1,
              backgroundColor: 'rgba(0, 128, 0, 0.1)',
            }}
          >
            <Typography variant="body1">{`Event: ${booking.eventName}`}</Typography>
            <Typography variant="body2">{`Date: ${booking.date}`}</Typography>
            <Typography variant="body2">{`Time: ${booking.startTime} - ${booking.endTime}`}</Typography>
            <Typography variant="body2">{`Venue ID: ${booking.venueId}`}</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleOpen(booking.bookingId)}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        ))
      )}

      {/* Dialog for capturing reason for cancellation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Provide Reason for Cancellation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason for cancelling this booking.
          </DialogContentText>
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
          <Button onClick={handleCancel} color="error" variant={'contained'}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const BookingRequestsModal: React.FC = () => {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useGetQuery<Bookings[]>({
    resource: 'api/admin/bookings',
  });

  const { mutate: approveBooking } = useUpdateMutation({
    resource: 'api/admin/bookings/approve',
    onSuccessMessage: 'Booking approved successfully!',
    invalidateKeys: ['api/admin/bookings'],
  });

  const { mutate: cancelBooking } = useUpdateMutation({
    resource: 'api/admin/bookings/cancel',
    onSuccessMessage: 'Booking cancelled successfully!',
    invalidateKeys: ['api/admin/bookings'],
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography color="error">An error occurred</Typography>;
  }

  // Filter bookings into pending and confirmed
  const pendingBookings = bookings?.filter((booking) => booking.status === 'pending') || [];
  const confirmedBookings = bookings?.filter((booking) => booking.status === 'confirmed') || [];

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
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Booking Requests
      </Typography>

      {/* Use Grid to display the two components side by side on larger screens */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <PendingBookings
            bookings={pendingBookings}
            onApprove={(id) => approveBooking({ id })}
            onDelete={(id, reason) =>
              cancelBooking({ id, data: { reasonForCancellation: reason } })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ConfirmedBookings
            bookings={confirmedBookings}
            onCancel={(id, reason) =>
              cancelBooking({ id, data: { reasonForCancellation: reason } })
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingRequestsModal;
