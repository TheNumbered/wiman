import ErrorComponent from '@/components/error-component';
import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Bookings, Venue } from '@/interfaces';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import ConfirmedBookings from './confirmed-bookings';
import PendingBookings from './pending-bookings';

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

  if (isLoading || venuesLoading) {
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
