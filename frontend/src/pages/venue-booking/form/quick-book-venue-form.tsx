import {
  Box,
  Button,
  Container,
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
import { useCreateMutation } from '@/hooks';
import { json, useLocation } from 'react-router-dom';
import { Room } from '@/types';
import {  useUser } from '@clerk/clerk-react';

export const QuickBookVenueForm: React.FC = () => {
  //@ts-ignore
  const [venueSelection, setVenueSelection] = useState<string | null>('chooseForMe');
  let [frequency, setFrequency] = useState<string>('once');
  const [category, setCategory] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  let [repeat_until, setRepeatUntil] = useState<string | null>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const User  = useUser().user;
  const location = useLocation();
  
  const venue = location.state as any;
  
  useEffect(() => {
    if (venue.venue) {
      setSelectedRoom(venue.venue);
    }
  }, [venue.venue]);

  //@ts-ignore
  const handleVenueChange = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
    if (newSelection !== null) {
      setVenueSelection(newSelection);
    }
  };

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrequency = event.target.value;
    
    // If the frequency is "every", combine it with the selected day
    if (newFrequency === 'every' && selectedDay) {
      setFrequency(`${newFrequency} ${selectedDay}`);
    } else {
      setFrequency(newFrequency);
    }
  };
  
  const handleSelectedDayChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSelectedDay = event.target.value as string;
    setSelectedDay(newSelectedDay);
  
    // If frequency is "every", update the frequency to include the new selected day
    if (frequency.startsWith('every')) {
      setFrequency(`every ${newSelectedDay}`);
    }
  };

  const handlerepeat_untilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatUntil(event.target.value);
  };

  const handleEventDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEventDate = event.target.value;
    setEventDate(newEventDate);
  }

  const mutation = useCreateMutation({
    resource: 'bookings',
    invalidateKeys: ['bookings'],
  });

  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formElements = event.currentTarget.elements;
  
    const event_name = (formElements.namedItem('title') as HTMLInputElement)?.value || '';
    const start_time = (formElements.namedItem('from') as HTMLInputElement)?.value || '';
    const end_time = (formElements.namedItem('till') as HTMLInputElement)?.value || '';
    const booking_date = formatDate(new Date());
    const room_id = selectedRoom?.room_id;
    const venue_code = selectedRoom?.venue_code;
    const event_date = eventDate;
    const user_id = User?.id;
    
    frequency = frequency === 'once' ? 'once' : frequency ;
    repeat_until = frequency === 'once' ? null : repeat_until;

    const formData = {
      user_id,
      event_name,
      category,
      event_date,
      start_time,
      end_time,
      frequency,
      repeat_until,
      room_id,
      venue_code,
      booking_date,
    };

    try {
      await mutation.mutateAsync(formData);
      console.log('Booking successfully created');
    } catch (error) {
      console.log(json(error));
    }
    
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 3,
      }}
    >
      <Box
        width="100%"
        sx={{
          maxHeight: '100vh',
          overflow: 'auto',
          mx: 'auto',
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
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
                <MenuItem value="" key="none">
                  Choose Category
                </MenuItem>
                <MenuItem value="Lecture" key="lecture">
                  Lecture
                </MenuItem>
                <MenuItem value="Tutorial" key="tutorial">
                  Tutorial
                </MenuItem>
              </Select>
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
              {frequency.startsWith('every') && (
                <>
                  <Select
                    value={selectedDay}
                    // @ts-ignore
                    onChange={handleSelectedDayChange}
                    variant="outlined"
                    sx={{ width: '150px', mx: 1, height: '55px', mt: 2 }}
                    key="repeatInterval"
                  >
                    <MenuItem value="" key="none">
                      Choose a day
                    </MenuItem>
                    <MenuItem value="Monday" key="Monday">
                      Monday
                    </MenuItem>
                    <MenuItem value="Tuesday" key="Tuesday">
                      Tuesday
                    </MenuItem>
                    <MenuItem value="Wednasday" key="Wednasday">
                      Wednesday
                    </MenuItem>
                    <MenuItem value="Thursday" key="Thursday">
                      Thursday
                    </MenuItem>
                    <MenuItem value="Friday" key="Friday">
                      Friday
                    </MenuItem>
                  </Select>
                </>
              )}
            </RadioGroup>
            {frequency.startsWith('every') && (
              <Box sx={{ marginTop: 2 }}>
                <InputLabel shrink>Repeat until</InputLabel>
                <TextField
                  name="repeat_until"
                  type="date"
                  value={repeat_until}
                  onChange={handlerepeat_untilChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ px: 4, py: 1.5, mr: 2 }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ px: 4, py: 1.5 }}
            >
              Book
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
