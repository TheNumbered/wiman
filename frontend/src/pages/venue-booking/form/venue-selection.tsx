import { Venue } from '@/interfaces';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React from 'react';

interface VenueSelectionProps {
  venueSelection: string;
  setVenueSelection: (value: string) => void;
  capacity: number | '';
  setCapacity: (value: number) => void;
  building: string;
  setBuilding: (value: string) => void;
  filteredVenuesByCapacity: Venue[];
  filteredVenuesByBuilding: Venue[];
  selectedRoom: string;
  setSelectedRoom: (value: string) => void;
  filterVenuesByBuilding: (building: string) => void;
  filteredVenuesByCategory: Venue[];
  error: { capacity?: string; building?: string; selectedRoom?: string };
}

const VenueSelection: React.FC<VenueSelectionProps> = ({
  venueSelection,
  setVenueSelection,
  capacity,
  setCapacity,
  building,
  setBuilding,
  filteredVenuesByCapacity,
  filteredVenuesByBuilding,
  selectedRoom,
  setSelectedRoom,
  filterVenuesByBuilding,
  filteredVenuesByCategory,
  error,
}) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <InputLabel shrink>Venue</InputLabel>
      <ToggleButtonGroup
        value={venueSelection}
        exclusive
        //@ts-ignore
        onChange={(e, newSelection) => setVenueSelection(newSelection)}
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
            <FormControl variant="outlined" fullWidth required error={!!error.capacity}>
              <Select
                name="capacity"
                variant="outlined"
                fullWidth
                required
                value={capacity || ''}
                onChange={(e) => setCapacity(Number(e.target.value))}
              >
                <MenuItem value="" disabled>
                  Choose Capacity
                </MenuItem>
                <MenuItem value={50}>Up to 50</MenuItem>
                <MenuItem value={100}>51 to 100</MenuItem>
                <MenuItem value={200}>101 to 200</MenuItem>
                <MenuItem value={300}>201 to 300</MenuItem>
              </Select>
              {error.capacity && <FormHelperText>{error.capacity}</FormHelperText>}
            </FormControl>
          </Box>
          <Box>
            <InputLabel shrink>Available Venues</InputLabel>
            <FormControl variant="outlined" fullWidth required error={!!error.selectedRoom}>
              <Select
                variant="outlined"
                fullWidth
                required
                value={selectedRoom} // No need for || '' since the initial value is already an empty string
                onChange={(e) => setSelectedRoom(e.target.value as string)} // Ensure it's treated as a string
              >
                <MenuItem disabled>Choose Venue</MenuItem>
                {filteredVenuesByCapacity.map((venue) => (
                  <MenuItem key={venue.venueId} value={venue.venueId}>
                    {venue.buildingName} room {venue.venueId} has {venue.capacity} seats
                  </MenuItem>
                ))}
              </Select>
              {error.selectedRoom && <FormHelperText>{error.selectedRoom}</FormHelperText>}
            </FormControl>
          </Box>
        </>
      )}

      {venueSelection === 'searchVenue' && (
        <>
          <Box sx={{ marginBottom: 2 }}>
            <InputLabel shrink>Preferred Building</InputLabel>
            <FormControl variant="outlined" fullWidth required error={!!error.building}>
              <Select
                name="building"
                variant="outlined"
                fullWidth
                required
                value={building}
                onChange={(e) => {
                  setBuilding(e.target.value as string);
                  filterVenuesByBuilding(e.target.value as string);
                }}
                error={!!error.building}
              >
                <MenuItem value="" disabled>
                  Choose Building
                </MenuItem>
                {[...new Set(filteredVenuesByCategory.map((venue) => venue.buildingName))].map(
                  (buildingName) => (
                    <MenuItem key={buildingName} value={buildingName}>
                      {buildingName} Building
                    </MenuItem>
                  ),
                )}
              </Select>
              {error.building && <FormHelperText>{error.building}</FormHelperText>}
            </FormControl>
          </Box>
          <Box>
            <InputLabel shrink>Available Venues</InputLabel>
            <FormControl variant="outlined" fullWidth required error={!!error.selectedRoom}>
              <Select
                variant="outlined"
                fullWidth
                value={selectedRoom} // Use selectedRoom as a string
                onChange={(e) => setSelectedRoom(e.target.value as string)} // Ensure it's treated as a string
              >
                <MenuItem value="" disabled>
                  Choose Venue
                </MenuItem>
                {filteredVenuesByBuilding.map((venue) => (
                  <MenuItem key={venue.venueId} value={venue.venueId}>
                    {venue.venueId} has {venue.capacity} seats
                  </MenuItem>
                ))}
              </Select>
              {error.selectedRoom && <FormHelperText>{error.selectedRoom}</FormHelperText>}
            </FormControl>
          </Box>
        </>
      )}
    </Box>
  );
};

export default VenueSelection;
