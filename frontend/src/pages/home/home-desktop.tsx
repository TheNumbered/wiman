import { useGetQuery } from '@/hooks';
import { Venue } from '@/interfaces';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Styled components
const SearchInput = styled(TextField)(() => ({
  backgroundColor: '#E7F0FB',
  borderRadius: '25px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: 'transparent' },
  },
}));

// Data for filter buttons
const filterButtons = [
  { label: 'All', value: '' },
  // { label: 'Currently Available', value: 'Available' },
  { label: 'Lecture Hall', value: 'Lecture' },
  { label: 'Tutorial Venue', value: 'Tutorial' },
  { label: 'Hall', value: 'Hall' },
  { label: 'Parktown', value: 'Parktown' },
  { label: 'East Campus', value: 'East Campus' },
  { label: 'West Campus', value: 'West Campus' },
];
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

const HomeDesktop: React.FC = () => {
  const [venues, setVenues] = React.useState<Venue[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [filteredVenues, setFilteredVenues] = React.useState<Venue[]>([]);
  const location = useLocation();

  const { data } = useGetQuery({
    resource: 'api/venues',
  });

  useEffect(() => {
    if (data) {
      //@ts-ignore
      setVenues(data);
    }
  }, [data]);

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
          room.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.campusName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.type.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, venues]);

  const handleFilterClick = (filter: string) => {
    setSearchTerm(filter);
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', padding: 4, overflow: 'auto' }}>
      <SearchInput
        fullWidth
        variant="outlined"
        placeholder="Search venues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 3 }}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          marginBottom: 2,
          justifyContent: 'center',
        }}
      >
        {filterButtons.map((filter) => (
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

      <Grid container spacing={2}>
        {filteredVenues.map((venue) => (
          <Grid item key={venue.venueId} xs={12} sm={6} md={4}>
            <Link
              to={`/venue/${venue.venueId}`}
              style={{ textDecoration: 'none' }}
              state={{ venue }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={venue.imageUrl ?? 'https://via.placeholder.com/140'}
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
    </Box>
  );
};

export default HomeDesktop;
