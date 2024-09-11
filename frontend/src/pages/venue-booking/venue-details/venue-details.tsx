import Sidemenu from '@/components/side-menu';
import { useGetQuery } from '@/hooks';
import theme from '@/theme';
import DefaultAmenityIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from './calendar';

const FacilityCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
}));

type Reservation = {
    time: string;
    event: string;
};

const amenityIcons: Record<string, React.ReactElement> = {
    "Projector": (
        <img
            width="66"
            height="66"
            src="https://img.icons8.com/ios/50/video-projector.png"
            alt="Video-Projector"
        />
    ),
    "Whiteboard": (
        <img
            width="66"
            height="66"
            src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/external-Whiteboard-stationery-and-office-equipment-smashingstocks-detailed-outline-smashing-stocks.png"
            alt="Whiteboard"
        />
    ),
    "Wi-Fi": (
        <img
            width="66"
            height="66"
            src="https://img.icons8.com/ios-filled/50/wifi--v1.png"
            alt="Wi-Fi"
        />
    ),
    "Air Conditioning": (
        <img
            width="66"
            height="66"
            src="https://img.icons8.com/ios/50/air-conditioner.png"
            alt="air-conditioner"
        />
    ),
};

const RoomDetails: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [venueData, setVenueData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const location = useLocation();
    const {room} = location.state as any;
    const navigate = useNavigate();
    

    const { isError, isLoading, data } = useGetQuery({
        resource: `bookings/room/${room.room_id}`,
      });
    
    useEffect(() => {
        if (isError) {
            console.error('Error fetching booking data:', isError);
        }
        if (isLoading) {
          console.log('Loading booking data...');
        }
    
        if (data) {
          setBookings(data);
        }
    }, [isError, isLoading, data]);

    const formatTime = (time: string): string => {
        const [hour, minute] = time.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };

    //@ts-ignore
    const transformBookings = (b:any ) => {
        const reservationsData: Record<string, Reservation[]> = {};
    
        bookings.forEach(b => {
            const eventDate = new Date(b.event_date).toISOString().split('T')[0];
            const timeRange = `${formatTime(b.start_time)} - ${formatTime(b.end_time)}`;
    
            if (!reservationsData[eventDate]) {
                reservationsData[eventDate] = [];
            }
    
            reservationsData[eventDate].push({
                time: timeRange,
                event: b.event_name,
            });
        });
    
        return reservationsData;
    };
    
    const reservationsData = transformBookings(bookings);
    

    useEffect(() => {
        if (room) {
            setVenueData(room);
            setLoading(false);
        } else {
            setError("Room data not available");
        }
    }, [room]);

    const handleDateSelect = React.useCallback((date: Date) => {
        const formattedDate: string = format(date, "yyyy-MM-dd");
        setReservations(reservationsData[formattedDate] || []);
        setSelectedDate(date);
    }, []);

    const handleBookVenue = () => {
        navigate(`/room/${room.room_id}/book`, { state: { venue: room } });
    };

    return (
        <Box display="flex">
            <Sidemenu />
            <Box component="main" sx={{ flex: 1, p: 3, bgcolor: 'background.default', ml: 30 }}>
                <Box mb={3}>
                    <TextField fullWidth label="Search for a Venue" variant="outlined" />
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <FacilityCard>
                            <Typography variant="h6" gutterBottom>Venue Details</Typography>
                            {loading ? (
                                <Typography>Loading venue data...</Typography>
                            ) : error ? (
                                <Typography color="error">{error}</Typography>
                            ) : venueData ? (
                                <>
                                    <Box sx={{
                                        border: 2,
                                        borderColor: theme.palette.background.default,
                                        height: 235,
                                        mb: 2,
                                        backgroundImage: `url(${venueData.pictures[0] || 'https://via.placeholder.com/500'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }} />
                                    <Typography variant="body1">
                                        <strong>Building Name:</strong> {venueData.building_name}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Venue Code:</strong> {venueData.venue_code}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Venue Size:</strong> {venueData.venue_size} seats
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Type:</strong> {venueData.type}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Location:</strong> {venueData.location}
                                    </Typography>
                                    <Typography color="text.secondary">Status: Available</Typography>
                                </>
                            ) : (
                                <Typography>No venue data available.</Typography>
                            )}
                        </FacilityCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FacilityCard>
                            <Typography variant="h6" gutterBottom>Reservations</Typography>
                            <Calendar onDateSelect={handleDateSelect} reservationsData={reservationsData} />
                            <Box mt={2}>
                                <Typography variant="body1">
                                    <strong>Reservations for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : '...' }:</strong>
                                </Typography>
                                {reservations.length > 0 ? (
                                    reservations.map((reservation, index) => (
                                        <Typography variant="body2" key={index}>
                                            {reservation.time}: {reservation.event}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography variant="body2" color="text.secondary">No reservations for this day.</Typography>
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
                        {venueData?.amenities.length > 0 ? (
                            venueData.amenities.map((amenity: string, index: number) => (
                                <Grid item xs={6} md={3} key={index}>
                                    <FacilityCard sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ mr: 2 }}>
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            sx={{ px: 4, py: 1.5 }}
                            onClick={handleBookVenue}
                        >
                            Book
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RoomDetails;
