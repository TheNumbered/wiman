import { useCreateMutation, useGetQuery } from '@/hooks';
import { Venue } from '@/interfaces';
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EventDateTime from './event-date-time';
import EventDetails from './event-details';
import EventFrequency from './event-frequency';
import FormButtons from './form-buttons';
import VenueSelection from './venue-selection';

export const BookVenueForm: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [category, setCategory] = useState<string>('');
  const [building, setBuilding] = useState<string>('');
  const [capacity, setCapacity] = useState<number>(0);
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>();
  const [selectedDay, setSelectedDay] = useState<string | null>('');
  const [repeatFrequency, setRepeatFrequency] = useState<string>('once');
  const [repeatInterval, setRepeatInterval] = useState<number>(0);
  const [repeatUntil, setRepeatUntil] = useState<string | null>('');
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [venueSelection, setVenueSelection] = useState<string>('chooseForMe');
  const [filteredVenuesByCategory, setFilteredVenuesByCategory] = useState<Venue[]>([]);
  const [filteredVenuesByBuilding, setFilteredVenuesByBuilding] = useState<Venue[]>([]);
  const [filteredVenuesByCapacity, setFilteredVenuesByCapacity] = useState<Venue[]>([]);

  const { data } = useGetQuery({
    resource: 'api/venues',
  });

  const mutation = useCreateMutation({
    resource: 'api/bookings',
    invalidateKeys: ['bookings'],
  });

  useEffect(() => {
    if (data) {
      //@ts-ignore
      setVenues(data);
    }
  }, [data]);

  const filterVenuesByCategory = (category: string) => {
    return venues.filter((venue) => venue.type === category);
  };

  const filterVenuesByBuilding = (building: string) => {
    if (building && filteredVenuesByCategory.length > 0) {
      return filteredVenuesByCategory.filter((venue) => venue.buildingName === building);
    }
    return [];
  };

  const filterVenuesByCapacity = (capacity: number) => {
    let filteredVenues: Venue[] = [];
    if (capacity === 50) {
      filteredVenues = filteredVenuesByCategory.filter((venue) => venue.capacity <= 50);
    } else if (capacity === 100) {
      filteredVenues = filteredVenuesByCategory.filter(
        (venue) => venue.capacity > 50 && venue.capacity <= 100,
      );
    } else if (capacity === 200) {
      filteredVenues = filteredVenuesByCategory.filter(
        (venue) => venue.capacity > 100 && venue.capacity <= 200,
      );
    } else if (capacity === 300) {
      filteredVenues = filteredVenuesByCategory.filter(
        (venue) => venue.capacity > 200 && venue.capacity <= 300,
      );
    }
    return filteredVenues;
  };

  useEffect(() => {
    setFilteredVenuesByCategory(filterVenuesByCategory(category));
  }, [category]);

  useEffect(() => {
    console.log('Filtered venues by category:', filteredVenuesByCategory);
    console.log('Building selected:', building);
    const result = filterVenuesByBuilding(building);
    console.log('Filtered venues by building:', result);
    setFilteredVenuesByBuilding(result);
  }, [building, filteredVenuesByCategory]);

  useEffect(() => {
    setFilteredVenuesByCapacity(filterVenuesByCapacity(capacity));
  }, [capacity]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const adjustedRepeatFrequency = repeatFrequency === 'once' ? 'none' : selectedDay;

    const formData = {
      date: eventDate,
      eventName,
      eventDate,
      startTime,
      endTime,
      venueId: selectedRoom,
      repeatFrequency: adjustedRepeatFrequency,
      repeatUntil: repeatFrequency === 'every' ? repeatUntil : null,
    };

    try {
      await mutation.mutateAsync(formData);
      console.log('Booking successfully created');
    } catch (error) {
      console.log(error);
    }

    console.log('Form data:', formData);
  };

  const isSubmitting = false;

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ padding: 4, maxWidth: 1300, width: '100%', height: '100%', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Book Venue
        </Typography>
        <EventDetails category={category} setCategory={setCategory} setEventName={setEventName} />
        <EventDateTime
          setEventDate={setEventDate}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
        <EventFrequency
          frequency={repeatFrequency}
          setRepeatFrequency={setRepeatFrequency}
          repeatInterval={repeatInterval}
          repeatUntil={repeatUntil}
          setRepeatUntil={setRepeatUntil}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <VenueSelection
          venueSelection={venueSelection}
          setVenueSelection={setVenueSelection}
          capacity={capacity}
          filteredVenuesByCategory={filteredVenuesByCategory}
          setCapacity={setCapacity}
          building={building}
          setBuilding={setBuilding}
          filteredVenuesByCapacity={filteredVenuesByCapacity}
          filteredVenuesByBuilding={filteredVenuesByBuilding}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          filterVenuesByBuilding={filterVenuesByBuilding}
        />
        <FormButtons handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Paper>
    </Box>
  );
};

export default BookVenueForm;
