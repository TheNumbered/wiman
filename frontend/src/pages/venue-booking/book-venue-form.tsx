import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Venue {
  room_id: number;
  building_name: string;
  venue_code: string;
  venue_size: number;
  type: string;
  location: string;
  amenities: string[];
  pictures: string[];
}

const BookVenueForm: React.FC = () => {
  const [venueSelection, setVenueSelection] = useState<string | null>('chooseForMe');
  const [frequency, setFrequency] = useState<string>('once');
  const [category, setCategory] = useState<string>('');
  const [capacity, setCapacity] = useState<number | ''>('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [filteredVenuesByCapacity, setFilteredVenuesByCapacity] = useState<Venue[]>([]);
  const [filteredVenuesByBuilding, setFilteredVenuesByBuilding] = useState<Venue[]>([]);
  const [building, setBuilding] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<number | ''>('');
  const [repeatInterval, setRepeatInterval] = useState<number | ''>(1);
  const [repeatUntil, setRepeatUntil] = useState<string>('');

  const handleVenueChange = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
    if (newSelection !== null) {
      setVenueSelection(newSelection);
    }
  };

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(event.target.value);
  };

  const handleCapacityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCapacity(event.target.value as number | '');
  };

  const handleBuildingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBuilding(event.target.value as string);
  };

  const handleRoomChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRoom(event.target.value as number);
  };

  const handleRepeatIntervalChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRepeatInterval(event.target.value as number);
  };

  const handleRepeatUntilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatUntil(event.target.value);
  };

  const fetchVenues = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/reservations');
      const data: Venue[] = await response.json();
      setVenues(data);
    } catch (error) {
      console.error('Failed to fetch venues:', error);
    }
  };

  const filterVenues = () => {
    const filtered = venues.filter((venue) => venue.type === category);
    setFilteredVenues(filtered);
    if (capacity) {
      filterVenuesByCapacity(capacity);
    } else {
      setFilteredVenuesByCapacity(filtered);
    }
  };

  const filterVenuesByCapacity = (capacity: number) => {
    const filtered = filteredVenues.filter((venue) => venue.venue_size >= capacity);
    setFilteredVenuesByCapacity(filtered);
  };

  const filterVenuesByBuilding = (building: string) => {
    const filtered = filteredVenuesByCapacity.filter((venue) => venue.building_name === building);
    setFilteredVenuesByBuilding(filtered);
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    if (category) {
      filterVenues();
    }
  }, [category, venues]);

  useEffect(() => {
    if (capacity) {
      filterVenuesByCapacity(capacity);
    } else {
      setFilteredVenuesByCapacity(filteredVenues);
    }
  }, [capacity]);

  useEffect(() => {
    if (building) {
      filterVenuesByBuilding(building);
    } else {
      setFilteredVenuesByBuilding(filteredVenuesByCapacity);
    }
  }, [building]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      title: (event.currentTarget.elements.namedItem('title') as HTMLInputElement).value,
      category,
      date: (event.currentTarget.elements.namedItem('date') as HTMLInputElement).value,
      from: (event.currentTarget.elements.namedItem('from') as HTMLInputElement).value,
      till: (event.currentTarget.elements.namedItem('till') as HTMLInputElement).value,
      frequency,
      repeatInterval,
      repeatUntil,
      venueSelection,
      capacity,
      building,
      selectedRoom,
    };

    console.log('Form Data:', formData);
  };
  console.log('filteredVenuesByBuilding', filteredVenuesByBuilding);
  console.log('filteredVenuesByCapacity', filteredVenuesByCapacity);

  return (
    <Box
      sx={{
        maxWidth: '1000px',
        mx: 'auto',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
          Book a Venue
        </h1>

        <Box sx={{ marginBottom: 3 }}>
          <InputLabel shrink>What is your event about?</InputLabel>
          <Box sx={{ marginBottom: 2 }}>
            <InputLabel shrink>Title</InputLabel>
            <TextField
              name="title"
              placeholder="Event Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Box>
          <Box>
            <InputLabel shrink>Category</InputLabel>
            <Select
              name="category"
              variant="outlined"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value as string)}
            >
              <MenuItem value="">Choose Category</MenuItem>
              <MenuItem value="LECTURE">Lecture</MenuItem>
              <MenuItem value="TUTORIAL">Tutorial</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <InputLabel shrink>When is your event?</InputLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <InputLabel shrink>Date</InputLabel>
              <TextField
                name="date"
                placeholder="dd/mm/yyyy"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputLabel shrink>From</InputLabel>
              <TextField
                name="from"
                placeholder="hh:mm"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputLabel shrink>Till</InputLabel>
              <TextField
                name="till"
                placeholder="hh:mm"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <InputLabel shrink>Frequency</InputLabel>
          <RadioGroup row value={frequency} onChange={handleFrequencyChange} name="frequency">
            <FormControlLabel value="once" control={<Radio />} label="Only once" />
            <FormControlLabel value="every" control={<Radio />} label="Every" />
            {frequency === 'every' && (
              <>
                <TextField
                  type="number"
                  name="repeatInterval"
                  variant="outlined"
                  value={repeatInterval}
                  onChange={handleRepeatIntervalChange}
                  sx={{ width: '100px', mx: 1 }}
                  margin="normal"
                  inputProps={{ min: 1 }}
                />
                <Select
                  defaultValue="week(s)"
                  variant="outlined"
                  sx={{ width: '150px', mx: 1, height: '55px', mt: 2 }}
                >
                  <MenuItem value="week(s)">week(s)</MenuItem>
                  <MenuItem value="month(s)">month(s)</MenuItem>
                </Select>
              </>
            )}
          </RadioGroup>
          {frequency === 'every' && (
            <Box sx={{ marginTop: 2 }}>
              <InputLabel shrink>Repeat until</InputLabel>
              <TextField
                name="repeatUntil"
                type="date"
                value={repeatUntil}
                onChange={handleRepeatUntilChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Box>
          )}
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <InputLabel shrink>Venue</InputLabel>
          <ToggleButtonGroup
            value={venueSelection}
            exclusive
            onChange={handleVenueChange}
            aria-label="venue selection"
            fullWidth
            sx={{ mb: 2 }}
          >
            <ToggleButton value="chooseForMe">Choose for me</ToggleButton>
            <ToggleButton value="searchVenue">Search venue</ToggleButton>
          </ToggleButtonGroup>

          {venueSelection === 'chooseForMe' && (
            <>
              <Box sx={{ marginBottom: 2 }}>
                <InputLabel shrink>Capacity</InputLabel>
                <Select
                  name="capacity"
                  variant="outlined"
                  fullWidth
                  value={capacity || ''}
                  onChange={handleCapacityChange}
                  disabled={!category}
                >
                  <MenuItem value="" disabled>
                    Choose Capacity
                  </MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={200}>200</MenuItem>
                  <MenuItem value={300}>300</MenuItem>
                </Select>
                {!category && (
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Select a category to enable capacity selection
                  </Typography>
                )}
              </Box>
              <Box>
                <InputLabel shrink>Available Venues</InputLabel>
                <Select name="venue" variant="outlined" fullWidth>
                  <MenuItem value="" disabled>
                    Choose Venue
                  </MenuItem>
                  {filteredVenuesByCapacity.map((venue) => (
                    <MenuItem key={venue.room_id} value={venue.room_id}>
                      {venue.building_name} Building {venue.location} room {venue.venue_code} has{' '}
                      {venue.venue_size} seats
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </>
          )}

          {venueSelection === 'searchVenue' && (
            <>
              <Box sx={{ marginBottom: 2 }}>
                <InputLabel shrink>Preferred Building</InputLabel>
                <Select
                  name="building"
                  variant="outlined"
                  fullWidth
                  value={building}
                  onChange={handleBuildingChange}
                >
                  <MenuItem value="" disabled>
                    Choose Building
                  </MenuItem>
                  {[...new Set(filteredVenues.map((venue) => venue.building_name))].map(
                    (buildingName) => (
                      <MenuItem key={buildingName} value={buildingName}>
                        {buildingName} Building
                      </MenuItem>
                    ),
                  )}
                </Select>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <InputLabel shrink>Room</InputLabel>
                <Select
                  name="room"
                  variant="outlined"
                  fullWidth
                  value={selectedRoom || ''}
                  onChange={handleRoomChange}
                >
                  <MenuItem value="" disabled>
                    Choose Specific Room
                  </MenuItem>
                  {filteredVenuesByBuilding.map((venue) => (
                    <MenuItem key={venue.room_id} value={venue.room_id}>
                      {venue.location} room {venue.venue_code} has {venue.venue_size} seats
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </>
          )}
        </Box>
        {}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" color="primary" sx={{ px: 4, py: 1.5, mr: 2 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ px: 4, py: 1.5 }}>
            Book
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BookVenueForm;
