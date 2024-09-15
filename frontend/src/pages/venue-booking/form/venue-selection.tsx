import { Venue } from '@/interfaces/database';
import { Box, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
}) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <InputLabel shrink>Venue</InputLabel>
      <ToggleButtonGroup
        value={venueSelection}
        exclusive
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
          </Box>
          <Box>
            <InputLabel shrink>Available Venues</InputLabel>
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
              required
              value={building}
              onChange={(e) => {
                setBuilding(e.target.value as string);
                filterVenuesByBuilding(e.target.value as string);
              }}
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
          </Box>
          <Box>
            <InputLabel shrink>Available Venues</InputLabel>
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
          </Box>
        </>
      )}
    </Box>
  );
};

export default VenueSelection;
