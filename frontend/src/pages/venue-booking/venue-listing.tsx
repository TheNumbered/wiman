import { Alert, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../../types';

const RoomsList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/venues`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const roomsWithParsedData = data.map((room: any) => ({
                    ...room,
                    amenities: Array.isArray(room.amenities) ? room.amenities : JSON.parse(room.amenities),
                    pictures: Array.isArray(room.pictures) ? room.pictures : JSON.parse(room.pictures)
                }));
                setRooms(roomsWithParsedData);
                setLoading(false);
            })
            .catch(error => {
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
                Rooms List
            </Typography>
            <Grid container spacing={2}>
                {rooms.map(room => (
                    <Grid item key={room.room_id} xs={12} sm={6} md={4}>
                        <Link 
                            to={`/room/${room.room_id}`} 
                            style={{ textDecoration: 'none' }}
                            state={{ room }}
                        >
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={room.pictures[0] || 'https://via.placeholder.com/140'}
                                    alt={`Room ${room.venue_code}`}
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        {room.building_name} - {room.venue_code}
                                    </Typography>
                                    <Typography>Size: {room.venue_size} sq. ft.</Typography>
                                    <Typography>Type: {room.type}</Typography>
                                    <Typography>Location: {room.location}</Typography>
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
