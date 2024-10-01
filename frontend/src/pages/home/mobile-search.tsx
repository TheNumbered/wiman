import { useGetQuery } from '@/hooks';
import { Venue } from '@/interfaces';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  styled,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

const SearchInput = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light, // Access theme here
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
  const theme = useTheme(); // Access the theme to apply mode-specific styles

  return (
    <Box p={4} bgcolor="background.paper" borderRadius={2}>
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
              backgroundColor:
                filter.value === '' ? theme.palette.primary.main : theme.palette.background.paper,
              color:
                filter.value === ''
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor:
                  filter.value === ''
                    ? theme.palette.primary.dark
                    : theme.palette.background.default,
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
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start', padding: 0 }}>
                  <img
                    src={venue.imageUrl}
                    alt={venue.buildingName}
                    style={{ width: 100, height: 100, marginRight: 16, borderRadius: 15 }}
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
