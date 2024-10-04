import ErrorComponent from '@/components/error-component';
import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Bookings, Venue } from '@/interfaces';
import { formatDate, formatTime } from '@/utils';
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
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

// Function to get venue by venueId
const getVenueById = (venues: Venue[], venueId: string) => {
  return venues.find((venue) => {
    console.log('comparing:', venue.venueId, '  to:', venueId);
    if (venue.venueId.trim() === venueId.trim()) {
      console.log('target found');
      return venue;
    } else {
      console.log('| not a match');
    }
  });
};

// Component for displaying pending bookings
const PendingBookings: React.FC<{
  bookings: Bookings[];
  venues: Venue[];
  onApprove: (id: number) => void;
  onDelete: (id: number, reason: string) => void;
}> = ({ bookings, venues, onApprove, onDelete }) => {
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
              // backgroundColor: 'rgba(255, 165, 0, 0.1)',
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

                {/* <Typography variant="body2">{`Venue ID: ${booking.venueId}`}</Typography> */}
                {booking.repeatFrequency == 'none' ? (
                  <Chip label={'Once-Off'} />
                ) : (
                  <Chip label={booking.repeatFrequency} />
                )}
                {/* <Chip label={'Venue Under Maintenance'} /> */}
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
                  onClick={() => onApprove(booking.bookingId)}
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
  venues: Venue[];
  onCancel: (id: number, reason: string) => void;
}> = ({ bookings, venues, onCancel }) => {
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
                borderColor: theme.palette.primary.main,
              },
              // backgroundColor: 'rgba(255, 165, 0, 0.1)',
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

                {/* <Typography variant="body2">{`Venue ID: ${booking.venueId}`}</Typography> */}
                {booking.repeatFrequency == 'none' ? (
                  <Chip label={'Once-Off'} />
                ) : (
                  <Chip label={booking.repeatFrequency} />
                )}
                {/* <Chip label={'Venue Under Maintenance'} /> */}
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
                  color="error"
                  disableElevation
                  onClick={() => handleOpen(booking.bookingId)}
                >
                  Cancel
                </Button>
              </Grid2>
            </Grid2>
          </Box>
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

  const { data: venues, isLoading: venuesLoading } = useGetQuery<Venue[]>({
    resource: 'api/venues',
  });
  if (venuesLoading) {
    console.log('loading venues');
  }

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

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return (
      <ErrorComponent
        errorMessage="Failed to load bookings"
        onRetry={() => location.reload()}
      ></ErrorComponent>
    );
  }
  // Filter bookings into pending and confirmed
  const pendingBookings = bookings?.filter((booking) => booking.status === 'pending') || [];
  const confirmedBookings = bookings?.filter((booking) => booking.status === 'confirmed') || [];
  const venuesList = venues != undefined ? venues : [];
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
      <Typography component="h1" variant="h4" gutterBottom color="primary" align="center">
        MANAGE BOOKINGS
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ marginBottom: 3 }}
      >
        <Tab label="Pending Requests" />
        <Tab label="Confirmed" />
      </Tabs>
      <Box>
        {activeTab === 0 && (
          <PendingBookings
            bookings={pendingBookings}
            venues={venuesList}
            onApprove={(id) => approveBooking({ id })}
            onDelete={(id, reason) =>
              cancelBooking({ id, data: { reasonForCancellation: reason } })
            }
          />
        )}
        {activeTab === 1 && (
          <ConfirmedBookings
            bookings={confirmedBookings}
            venues={venuesList}
            onCancel={(id, reason) =>
              cancelBooking({ id, data: { reasonForCancellation: reason } })
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default BookingRequestsModal;
