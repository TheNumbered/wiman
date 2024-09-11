import { Box, Grid, InputLabel, TextField } from '@mui/material';
import React from 'react';

interface EventDateTimeProps {
  setEventDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStartTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEndTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EventDateTime: React.FC<EventDateTimeProps> = (
  { setEventDate, setStartTime, setEndTime }
) => {

  return (
    <Box sx={{ marginBottom: 3 }}>
      <InputLabel shrink>When is your event?</InputLabel>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <InputLabel shrink>Date</InputLabel>
          <TextField
            required
            name="date"
            type="date"
            placeholder="dd/mm/yyyy"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={setEventDate}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputLabel shrink>From</InputLabel>
          <TextField
            required
            name="from"
            type="time"
            placeholder="hh:mm"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={setStartTime}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputLabel shrink>Till</InputLabel>
          <TextField
            required
            name="till"
            type="time"
            placeholder="hh:mm"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={setEndTime}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventDateTime;
