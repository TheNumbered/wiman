import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Venue } from '@/interfaces/database';

const RoomsList: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/venues`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const roomsWithParsedData = data.map((venue: any) => ({
          ...venue,
          amenities: Array.isArray(venue.amenities) ? venue.amenities : JSON.parse(venue.amenities),
          pictures: Array.isArray(venue.pictures) ? venue.pictures : JSON.parse(venue.pictures),
        }));
        setVenues(roomsWithParsedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        venues List
      </Typography>
      <Grid container spacing={2}>
        {venues.map((venue) => (
          <Grid item key={venue.venueId} xs={12} sm={6} md={4}>
            <Link to={`/venue/${venue.venueId}`} style={{ textDecoration: 'none' }} state={{ venue }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={venue.pictures[0] || 'https://via.placeholder.com/140'}
                  alt={`Room ${venue.venueId}`}
                />
                <CardContent>
                  <Typography variant="h6">
                    {venue.buildingName} - {venue.venueId}
                  </Typography>
                  <Typography>Size: {venue.capacity}</Typography>
                  <Typography>Type: {venue.type}</Typography>
                  <Typography>Location: {venue.campusName}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RoomsList;
