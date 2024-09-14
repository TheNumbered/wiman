import { Venue } from '@/interfaces';
import { Box, Button, TextField, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VenueCard from './venue-card';
import Logo from '/LOGO.png';

const FilterButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  textTransform: 'none',
  padding: '5px 15px',
  borderColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.main,
  },
}));

const venues: Venue[] = [
  {
    venueId: 1, // Example ID
    name: 'Flower Hall',
    campus: 'East Campus',
    capacity: 250,
    code: 'FLH01',
    type: 'Banquet Hall',
    amenities: ['projector', 'sound system'], // Example amenities
    location: {
      lat: 25,
      lng: 30,
    },
    pictures: ['venue-images/FlowerHall.jpg'],
  },
  {
    venueId: 2,
    name: 'West Campus Tutorial Venue',
    campus: 'West Campus',
    capacity: 150,
    code: 'WCTV02',
    type: 'Tutorial Room',
    amenities: ['whiteboard', 'seating'],
    location: {
      lat: 28,
      lng: 32,
    },
    pictures: ['venue-images/conferenceRoom.jpg'],
  },
  {
    venueId: 3,
    name: 'Health Science Campus Hall',
    campus: 'Health Science Campus',
    capacity: 500,
    code: 'HSCH03',
    type: 'Lecture Hall',
    amenities: ['microphone', 'podium'], // Example amenities
    location: {
      lat: 22,
      lng: 35,
    },
    pictures: ['venue-images/SenateRoom.jpg'],
  },
];

const Searchings: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  const mobileFilterButtons = [
    { label: 'All', value: '' },
    { label: 'Available', value: 'Available' },
    { label: 'Lecture Hall', value: 'Lecture Hall' },
  ];

  const filterButtons = [
    { label: 'All', value: '' },
    { label: 'Currently Available', value: 'Available' },
    { label: 'Lecture Hall', value: 'Lecture Hall' },
    { label: 'Tutorial Venue', value: 'Tutorial Venue' },
    { label: 'Hall', value: 'Hall' },
    { label: 'Parktown', value: 'Parktown' },
    { label: 'East Campus', value: 'East Campus' },
    { label: 'West Campus', value: 'West Campus' },
  ];

  useEffect(() => {
    const searchState = location.state as { searchTerm?: string };
    if (searchState?.searchTerm) {
      setSearchTerm(searchState.searchTerm);
    } else {
      setSearchTerm('');
    }
  }, [location.state]);

  useEffect(() => {
    setFilteredVenues(
      venues.filter(
        (room) =>
          searchTerm === '' ||
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.campus.toLowerCase().includes(searchTerm.toLowerCase()),
        //|| room.availability.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm]);

  const handleFilterClick = (filter: string) => {
    setSearchTerm(filter);
  };

  const handleBookingsClick = () => {
    navigate('/bookings');
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Placeholder image for desktop only */}
      {isDesktop && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 0, marginBottom: 3 }}>
          <img src={Logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
        </Box>
      )}

      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{
          marginBottom: 3,
          backgroundColor: '#E7F0FB',
          borderRadius: '25px',
          padding: '5px 15px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: 'transparent' },
            '&.Mui-focused fieldset': { borderColor: 'transparent' },
          },
          '& .MuiInputBase-input': { padding: '10px 0' },
        }}
      />

      {/* Filter Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          marginBottom: 2,
          justifyContent: 'center',
        }}
      >
        {(isDesktop ? filterButtons : mobileFilterButtons).map((filter) => (
          <FilterButton
            key={filter.value}
            variant="outlined"
            onClick={() => handleFilterClick(filter.value)}
            sx={{
              backgroundColor: filter.value === '' ? '#007bff' : '#fff',
              color: filter.value === '' ? '#fff' : '#000',
              borderColor: '#007bff',
              '&:hover': {
                backgroundColor: filter.value === '' ? '#0056b3' : '#f5f5f5',
              },
            }}
          >
            {filter.label}
          </FilterButton>
        ))}
      </Box>

      {/* Render filtered venues as cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '20px',
          padding: '20px',
          justifyContent: 'center',
        }}
      >
        {filteredVenues.map((room, index) => (
          <VenueCard key={index} {...room} />
        ))}
      </Box>
    </Box>
  );
};

export default Searchings;
