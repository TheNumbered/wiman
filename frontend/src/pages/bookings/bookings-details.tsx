import { useGetQuery } from '@/hooks';
import { Bookings, Venue } from '@/interfaces';
import Calendar from '../venue-booking/venue-details/calendar';

import ErrorComponent from '@/components/error-component';
import { formatDate, getRecurringDates } from '@/utils';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';

interface BookingsDetailsProps {
  booking: Bookings;
}

const BookingsDetails: React.FC<BookingsDetailsProps> = ({ booking }) => {
  const reservationsData = getRecurringDates(
    booking.date,
    booking.repeatFrequency,
    booking.repeatUntil,
  );

  const {
    data: venues,
    isError,
    isLoading,
  } = useGetQuery<Venue[]>({
    resource: 'api/venues',
  });
  if (isError) {
    return (
      <ErrorComponent
        errorMessage="Failed to load venues"
        onRetry={() => location.reload()}
      ></ErrorComponent>
    );
  }

  if (isLoading || !venues) {
    return <CircularProgress />;
  }

  const venue = venues.find((v) => v.venueId === booking.venueId);

  if (!venue) {
    return <Alert severity="warning">Venue not found</Alert>;
  }

  return (
    <Box sx={{ p: 3, overflow: 'scroll', maxHeight: '100vh', pb: { xs: 12, md: 0 } }}>
      {/* Venue Calendar */}
      <Box mb={2}>
        <Typography variant={'h5'}>{booking.eventName}</Typography>
        <Typography mb={2}>{formatDate(booking.date)}</Typography>
        {booking.repeatFrequency == 'none' ? (
          <Chip label={'Once-Off'} />
        ) : (
          <Chip label={booking.repeatFrequency} />
        )}
      </Box>

      <Divider textAlign={'center'}> Venue Details </Divider>
      <Card sx={{ mb: 3, mt: 2 }}>
        <Calendar reservationsData={reservationsData} onDateSelect={() => {}} />
      </Card>
      {/* Venue Information */}
      <Card>
        {venue.imageUrl && (
          <CardMedia
            component="img"
            height="200"
            image={venue.imageUrl}
            alt={`${venue.buildingName} picture`}
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {venue.buildingName} - {venue.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Campus:</strong> {venue.campusName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Capacity:</strong> {venue.capacity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Amenities:</strong>{' '}
            {Array.isArray(venue.amenities)
              ? venue.amenities.join(', ')
              : JSON.parse(venue.amenities).join(', ')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingsDetails;
