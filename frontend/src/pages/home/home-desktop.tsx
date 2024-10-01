import { useGetQuery } from '@/hooks';
import { Venue } from '@/interfaces';
import { AccountBalanceOutlined, EventSeatOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  styled,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Styled components
const SearchInput = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#E7F0FB',

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
  backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#fff',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#555' : theme.palette.primary.light,
    borderColor: theme.palette.primary.main,
  },
}));

const HomeDesktop: React.FC = () => {
  const [venues, setVenues] = React.useState<Venue[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [filteredVenues, setFilteredVenues] = React.useState<Venue[]>([]);
  const location = useLocation();
  const theme = useTheme(); // Access the theme to apply mode-specific styles

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
    <Box
      sx={{
        backgroundColor: 'background.default',
        padding: 4,
        overflow: 'auto',
        p: { xs: '1rem', md: 1 },
      }}
    >
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
        {filteredVenues.map((venue) => (
          <Grid item key={venue.venueId} xs={12} sm={6} md={4}>
            <Link
              to={`/venue/${venue.venueId}`}
              style={{ textDecoration: 'none' }}
              state={{ venue }}
            >
              <Card
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
                  height: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={venue.imageUrl ?? 'https://via.placeholder.com/140'}
                  alt={`Room ${venue.venueId}`}
                  sx={{ borderRadius: '8px' }}
                />
                <CardContent component={'section'}>
                  <Typography variant="h6">{venue.buildingName}</Typography>
                  <Typography>Room: {venue.venueId}</Typography>
                  <Typography>{venue.campusName}</Typography>
                  <Box display={'flex'} gap={2}>
                    <Chip
                      icon={<EventSeatOutlined sx={{ color: '#cdcdcd', marginRight: '0.5rem' }} />}
                      label={`${venue.capacity} Capacity`}
                    />
                    <Chip
                      icon={<AccountBalanceOutlined sx={{ color: '#cdcdcd' }} />}
                      label={`Type: ${venue.type}`}
                    />
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

export default HomeDesktop;
