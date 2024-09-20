import { useGetQuery } from '@/hooks';
import { Venue } from '@/interfaces';
import { Box, Button, Card, CardContent, Grid, styled, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// interface Venue {
//   id: number;
//   name: string;
//   location: string;
//   capacity: number;
//   status: 'Available' | 'Booked' | 'Under Maintenance' | 'Notable';
//   image: string;
// }

// const venues: Venue[] = [
//   {
//     id: 1,
//     name: 'Flower Hall',
//     location: 'West Campus, Braamfontein',
//     capacity: 1000,
//     status: 'Under Maintenance',
//     image: 'https://placehold.co/80x80',
//   },
//   {
//     id: 2,
//     name: 'Law Library',
//     location: 'Oliver Schreiner, West Campus',
//     capacity: 100,
//     status: 'Available',
//     image: 'https://placehold.co/80x80',
//   },
//   {
//     id: 3,
//     name: 'Wits Arm Building',
//     location: 'West Campus, Braamfontein',
//     capacity: 250,
//     status: 'Notable',
//     image: 'https://placehold.co/80x80',
//   },
//   {
//     id: 4,
//     name: 'Amphitheatre',
//     location: 'East Campus, Braamfontein',
//     capacity: 700,
//     status: 'Available',
//     image: 'https://placehold.co/80x80',
//   },
//   {
//     id: 5,
//     name: 'Anglo American Digital Dome',
//     location: 'East Campus, Braamfontein',
//     capacity: 75,
//     status: 'Available',
//     image: 'https://placehold.co/80x80',
//   },
//   {
//     id: 6,
//     name: 'WSS Physics Lab',
//     location: 'West Campus, Braamfontein',
//     capacity: 350,
//     status: 'Under Maintenance',
//     image: 'https://placehold.co/80x80',
//   },
// ];

const filterButtons = [
  { label: 'All', value: '' },
  { label: 'Available', value: 'Available' },
  { label: 'Lecture Hall', value: 'Lecture' },
  { label: 'Tutorial', value: 'Tutorial' },
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

const SearchInput = styled(TextField)(() => ({
  backgroundColor: '#E7F0FB',
  borderRadius: '25px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: 'transparent' },
  },
}));

const MobileSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [venues, setVenues] = React.useState<Venue[]>([]);
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
    setFilteredVenues(
      venues?.filter(
        (room) =>
          searchTerm === '' ||
          room.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.campusName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.type.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, venues]);

  useEffect(() => {
    const searchState = location.state as { searchTerm?: string };
    if (searchState?.searchTerm) {
      setSearchTerm(searchState.searchTerm);
    } else {
      setSearchTerm('');
    }
  }, [location.state]);

  const handleFilterClick = (filter: string) => {
    setSearchTerm(filter);
  };

  return (
    <Box p={4} bgcolor="background.paper" borderRadius={2} boxShadow={3}>
      <Box display="flex" alignItems="center">
        <SearchInput
          fullWidth
          variant="outlined"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
      </Box>
      <Box
        sx={{
          flexWrap: 'wrap',
          display: 'flex',
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
        {filteredVenues?.map((venue) => (
          <Grid item xs={12} sm={6} key={venue.venueId}>
            <Link
              to={`/venue/${venue.venueId}`}
              style={{ textDecoration: 'none' }}
              state={{ venue }}
            >
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <img
                    src={venue.pictures[0]}
                    alt={venue.buildingName}
                    style={{ width: 80, height: 80, marginRight: 16, borderRadius: 15 }}
                  />
                  <Box>
                    <Typography variant="h6">{venue.buildingName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {venue.campusName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {venue.type} - {venue.capacity} people
                    </Typography>

                    {/* <Typography
                      variant="body2"
                      color={
                        venue.status === 'Available'
                          ? 'success.main'
                          : venue.status === 'Under Maintenance'
                            ? 'error.main'
                            : 'text.secondary'
                      }
                    >
                      {venue.status}
                    </Typography> */}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MobileSearch;
