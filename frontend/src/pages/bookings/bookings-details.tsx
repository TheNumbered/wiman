import { useGetQuery } from '@/hooks';
import { Bookings, Venue } from '@/interfaces';
import Calendar from '../venue-booking/venue-details/calendar';

import { getRecurringDates } from '@/utils';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
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
    return <Alert severity="error">Error loading venues</Alert>;
  }

  if (isLoading || !venues) {
    return <CircularProgress />;
  }

  const venue = venues.find((v) => v.venueId === booking.venueId);

  if (!venue) {
    return <Alert severity="warning">Venue not found</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Venue Calendar */}
      <Card sx={{ mb: 3 }}>
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
            <strong>Amenities:</strong> {venue.amenities.join(', ')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingsDetails;
