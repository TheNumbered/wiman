import { Box, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';

interface EventDetailsProps {
  category: string;
  setCategory: (value: string) => void;
  setEventName: (value: string) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ category, setCategory, setEventName }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <InputLabel shrink>What is your event about?</InputLabel>
      <Box sx={{ marginBottom: 2 }}>
        <InputLabel shrink>Title</InputLabel>
        <TextField
          name="title"
          placeholder="Event Name"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          onChange={(e) => setEventName(e.target.value)}
        />
      </Box>
      <Box>
        <InputLabel shrink>Category</InputLabel>
        <Select
          name="category"
          variant="outlined"
          fullWidth
          required
          value={category}
          onChange={(e) => setCategory(e.target.value as string)}
        >
          <MenuItem value="">Choose Category</MenuItem>
          <MenuItem value="LECTURE">Lecture</MenuItem>
          <MenuItem value="TUTORIAL">Tutorial</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default EventDetails;
