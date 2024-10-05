import { Box, Grid, InputLabel, TextField } from '@mui/material';
import React from 'react';

interface EventDateTimeProps {
  setEventDate: (value: string) => void;
  setStartTime: (value: string) => void;
  setEndTime: (value: string) => void;
  error: { eventDate?: string; startTime?: string; endTime?: string };
}

const EventDateTime: React.FC<EventDateTimeProps> = ({
  setEventDate,
  setStartTime,
  setEndTime,
  error,
}) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <InputLabel shrink>
        When is your event? <span style={{ color: 'red' }}>*</span>
      </InputLabel>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <InputLabel shrink>
            Date <span style={{ color: 'red' }}>*</span>
          </InputLabel>
          <TextField
            required
            name="date"
            type="date"
            placeholder="dd/mm/yyyy"
            variant="outlined"
            fullWidth
            margin="normal"
            aria-required="true"
            onChange={(e) => setEventDate(e.target.value)}
            error={!!error.eventDate}
            helperText={error.eventDate || ''}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputLabel shrink>
            From <span style={{ color: 'red' }}>*</span>
          </InputLabel>
          <TextField
            required
            name="from"
            type="time"
            placeholder="hh:mm"
            variant="outlined"
            fullWidth
            margin="normal"
            aria-required="true"
            onChange={(e) => setStartTime(e.target.value)}
            error={!!error.startTime}
            helperText={error.startTime || ''}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputLabel shrink>
            Till <span style={{ color: 'red' }}>*</span>
          </InputLabel>
          <TextField
            required
            name="till"
            type="time"
            placeholder="hh:mm"
            variant="outlined"
            fullWidth
            margin="normal"
            aria-required="true"
            onChange={(e) => setEndTime(e.target.value)}
            error={!!error.endTime}
            helperText={error.endTime || ''}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventDateTime;
