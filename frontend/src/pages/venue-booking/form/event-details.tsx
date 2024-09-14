import { Box, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';

interface EventDetailsProps {
  category: string;
  setCategory: (value: string) => void;
  setEventName: (value: string) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  category,
  setCategory,
  setEventName,
}) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <InputLabel shrink>
        What is your event about? <span style={{ color: 'red' }}>*</span>
      </InputLabel>
      <Box sx={{ marginBottom: 2 }}>
        <InputLabel shrink>
          Title <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <TextField
          name="title"
          placeholder="Event Name"
          variant="outlined"
          fullWidth
          required
          aria-required="true"
          margin="normal"
          onChange={(e) => setEventName(e.target.value)}
        />
      </Box>
      <Box>
        <InputLabel shrink>
          Category <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <Select
          name="category"
          variant="outlined"
          fullWidth
          required
          aria-required="true"
          value={category}
          onChange={(e) => setCategory(e.target.value as string)}
        >
          <MenuItem value="">Choose Category</MenuItem>
          <MenuItem value="LECTURE">Lecture</MenuItem>
          <MenuItem value="TUTORIAL">Tutorial</MenuItem>
          <MenuItem value="LAB">Lab</MenuItem>
          <MenuItem value="MEETING">Meeting</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default EventDetails;
