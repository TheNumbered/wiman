import { useCreateMutation } from '@/hooks';
import { Venue } from '@/interfaces';
import { useUser } from '@clerk/clerk-react';
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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface QuickBookVenueFormProps {
  onClose: () => void;
}

export const QuickBookVenueForm: React.FC<QuickBookVenueFormProps> = ({ onClose }) => {
  const [frequency, setFrequency] = useState<string>('once'); // only 'once' or 'every'
  const [repeatInterval, setRepeatInterval] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<Venue>();
  const [repeatUntil, setRepeatUntil] = useState<string | null>('');
  const [eventDate, setEventDate] = useState<string>('');
  const User = useUser().user;
  const location = useLocation();

  const { venue } = location.state as any;

  useEffect(() => {
    if (venue) {
      setSelectedRoom(venue);
    }
  }, [venue]);

  // Handle frequency change (only 'once' or 'every')
  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(event.target.value); // Set either 'once' or 'every'
  };

  // Handle the repeat interval (for when frequency is 'every')
  const handleRepeatIntervalChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRepeatInterval(event.target.value as string); // Set daily, weekly, monthly
  };

  const handleRepeatUntilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatUntil(event.target.value); // Set repeat until date
  };

  const handleEventDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventDate(event.target.value);
  };

  const { mutate: createBooking } = useCreateMutation({
    resource: 'api/bookings',
    invalidateKeys: ['api/venues'],
    onSuccessMessage: 'Booking created successfully',
    onSucessCallback: onClose,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;
    const eventName = (formElements.namedItem('title') as HTMLInputElement)?.value || '';
    const startTime = (formElements.namedItem('from') as HTMLInputElement)?.value || '';
    const endTime = (formElements.namedItem('till') as HTMLInputElement)?.value || '';
    const venueId = selectedRoom?.venueId;
    const date = eventDate;
    const userId = User?.id;
    const repeatFrequency = frequency === 'once' ? 'none' : repeatInterval;

    const formData = {
      userId,
      eventName,
      date,
      startTime,
      endTime,
      repeatFrequency,
      repeatUntil: frequency === 'every' ? repeatUntil : null,
      venueId,
    };

    createBooking(formData);
  };

  return (
    <Box
      width="100%"
      sx={{
        maxHeight: '100vh',
        mx: 'auto',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
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
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <InputLabel shrink>When is your event?</InputLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <InputLabel shrink>Date</InputLabel>
              <TextField
                type="date"
                placeholder="dd/mm/yyyy"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleEventDateChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputLabel shrink>From</InputLabel>
              <TextField
                name="from"
                type="time"
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
                type="time"
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
          </RadioGroup>

          {frequency === 'every' && (
            <>
              <Box sx={{ mt: 2 }}>
                <InputLabel shrink>Repeat Interval</InputLabel>
                <Select
                  value={repeatInterval}
                  //@ts-ignore
                  onChange={handleRepeatIntervalChange}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Choose Interval
                  </MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </Box>

              <Box sx={{ marginTop: 2 }}>
                <InputLabel shrink>Repeat Until</InputLabel>
                <TextField
                  name="repeat_until"
                  type="date"
                  value={repeatUntil}
                  onChange={handleRepeatUntilChange}
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ px: 4, py: 1.5, mr: 2 }}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" variant="contained" color="secondary" sx={{ px: 4, py: 1.5 }}>
            Book
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default QuickBookVenueForm;
