import ErrorComponent from '@/components/error-component';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { useGetQuery } from '@/hooks';
import DefaultAmenityIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuickBookVenueForm from '../form/quick-book-venue-form';
import Calendar from './calendar';

const FacilityCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const amenityIcons: Record<string, React.ReactElement> = {
  projector: (
    <img
      width="50"
      height="50"
      src="https://img.icons8.com/ios/50/video-projector.png"
      alt="Video-Projector"
    />
  ),
  whiteboard: (
    <img
      width="50"
      height="50"
      src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/external-Whiteboard-stationery-and-office-equipment-smashingstocks-detailed-outline-smashing-stocks.png"
      alt="Whiteboard"
    />
  ),
  'Wi-Fi': (
    <img
      width="50"
      height="50"
      src="https://img.icons8.com/ios-filled/50/wifi--v1.png"
      alt="Wi-Fi"
    />
  ),
  'Air Conditioning': (
    <img
      width="50"
      height="50"
      src="https://img.icons8.com/ios/50/air-conditioner.png"
      alt="air-conditioner"
    />
  ),
  computer: (
    <img
      width="50"
      height="50"
      src="https://img.icons8.com/ios/50/workstation.png"
      alt="computer"
    />
  ),
};

const RoomDetails: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [venueData, setVenueData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const location = useLocation();
  const { venue } = location.state as any;

  const { data: reservationsData } = useGetQuery({
    resource: `api/venues/${venue?.venueId}/reservations`,
  });
  const reservations = reservationsData || [];
  // Set venue data on initial load
  useEffect(() => {
    if (venue) {
      setVenueData(venue);
      setLoading(false);
    } else {
      setError('Room data not available');
    }
  }, [venue]);

  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/venue-issue-reporting/${venue?.venueId}`); // Navigate to the desired route
  };
  const handleDateSelect = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDate(formattedDate);
  };

  //@ts-ignore
  const reservationsForSelectedDate = reservations[selectedDate] || [];

  const handleOpenModal = () => {
    setOpenBookingModal(true);
  };

  const handleCloseModal = () => {
    setOpenBookingModal(false);
  };
  const theme = useTheme();
  const venueAmenities = Array.isArray(venue.amenities)
    ? venue.amenities
    : JSON.parse(venue.amenities);
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        p: { xs: '1rem 1rem 4rem', md: 1 },
        bgcolor: 'background.default',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FacilityCard sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Venue Details
            </Typography>
            {loading ? (
              <LoadingIndicator />
            ) : error ? (
              <ErrorComponent
                errorMessage="Failed to load venue data"
                onRetry={() => window.location.reload()}
              />
            ) : venueData ? (
              <>
                <Box
                  sx={{
                    border: 2,
                    borderColor: theme.palette.background.default,
                    height: 235,
                    mb: 2,
                    borderRadius: 2,
                    backgroundImage: `url(${venue.imageUrl ?? 'https://via.placeholder.com/500'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Typography variant="h6" component="h2">
                  <strong>
                    {venueData.buildingName} | {venueData.venueId}
                  </strong>
                </Typography>
                <Typography variant="body1">
                  <strong>Venue Size:</strong> {venueData.capacity} seats
                </Typography>
                <Typography variant="body1">
                  <strong>Type:</strong> {venueData.type}
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {venueData.campusName}
                </Typography>
              </>
            ) : (
              <Typography>No venue data available.</Typography>
            )}
          </FacilityCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <FacilityCard sx={{ p: 0 }}>
            <Box
              sx={{
                p: 1,
                mb: 2,
                textAlign: 'center',
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderTopRightRadius: '20px',
                borderTopLeftRadius: '20px',
              }}
            >
              <Typography variant="h6" gutterBottom mb={0}>
                Reservations
              </Typography>
            </Box>
            <Calendar onDateSelect={handleDateSelect} reservationsData={reservations} />
            <Box mt={2} p={4} sx={{ textAlign: 'center' }}>
              <Typography variant="body1">
                <strong>
                  Reservations for{' '}
                  {selectedDate ? format(new Date(selectedDate), 'MMMM d, yyyy') : '...'}:
                </strong>
              </Typography>
              {reservationsForSelectedDate.length > 0 ? (
                reservationsForSelectedDate.map((reservation: any, index: number) => (
                  <Box key={index}>
                    <Typography variant="body2">
                      <strong>{reservation.event_name}</strong> at {reservation.time}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No reservations for this day.
                </Typography>
              )}
            </Box>
          </FacilityCard>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Property Amenities
        </Typography>
        <Grid container spacing={2}>
          {venue.amenities.length > 0 ? (
            venueAmenities.map((amenity: string, index: number) => (
              <Grid item xs={6} md={3} key={index}>
                <FacilityCard sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, filter: 'contrast(0.5)' }}>
                    {amenityIcons[amenity] || <DefaultAmenityIcon color="primary" />}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {amenity}
                  </Typography>
                </FacilityCard>
              </Grid>
            ))
          ) : (
            <Typography color="text.secondary">No amenities available.</Typography>
          )}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ px: 4, py: 1.5, mr: 2 }}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button variant="text" onClick={handleNavigateClick}>
            Report an issue
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ px: 4, py: 1.5 }}
            onClick={handleOpenModal}
          >
            Book
          </Button>
        </Box>
        <Dialog open={openBookingModal} onClose={handleCloseModal} fullWidth maxWidth="md">
          <DialogTitle>
            <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Book a Venue
            </Typography>
          </DialogTitle>
          <DialogContent>
            <QuickBookVenueForm onClose={handleCloseModal} />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default RoomDetails;
