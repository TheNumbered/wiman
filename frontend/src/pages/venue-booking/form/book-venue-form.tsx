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
  const [category, setCategory] = useState<string>('');
  const [building, setBuilding] = useState<string>('');
  const [capacity, setCapacity] = useState<number>(0);
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>();
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>('none');
  const [repeatOption, setRepeatOption] = useState<string>('once');
  const [repeatUntil, setRepeatUntil] = useState<string | null>('');
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [venueSelection, setVenueSelection] = useState<string>('chooseForMe');
  const [filteredVenuesByCategory, setFilteredVenuesByCategory] = useState<Venue[]>([]);
  const [filteredVenuesByBuilding, setFilteredVenuesByBuilding] = useState<Venue[]>([]);
  const [filteredVenuesByCapacity, setFilteredVenuesByCapacity] = useState<Venue[]>([]);
  const [error, setError] = useState<{
    eventName?: string;
    category?: string;
    eventDate?: string;
    startTime?: string;
    endTime?: string;
    capacity?: string;
    building?: string;
    selectedFrequency?: string;
    repeatUntil?: string;
    selectedRoom?: string;
  }>({});

  const { data: venuesData } = useGetQuery<Venue[]>({
    resource: 'api/venues',
  });
  const venues = venuesData || [];

  const { mutate: createBooking } = useCreateMutation({
    resource: 'api/bookings',
    invalidateKeys: ['api/bookings'],
    onSuccessMessage: 'Booking created successfully',
  });

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
    // console.log('Filtered venues by category:', filteredVenuesByCategory);
    // console.log('Building selected:', building);
    const result = filterVenuesByBuilding(building);
    // console.log('Filtered venues by building:', result);
    setFilteredVenuesByBuilding(result);
  }, [building, filteredVenuesByCategory]);

  useEffect(() => {
    setFilteredVenuesByCapacity(filterVenuesByCapacity(capacity));
  }, [capacity]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const adjustedRepeatFrequency = repeatOption === 'once' ? 'none' : selectedFrequency;

    const validationErrors: {
      eventName?: string;
      category?: string;
      eventDate?: string;
      startTime?: string;
      endTime?: string;
      capacity?: string;
      building?: string;
      selectedFrequency?: string;
      repeatUntil?: string;
      selectedRoom?: string;
    } = {};

    if (!eventName) {
      validationErrors.eventName = 'Event Name is required';
    }

    if (!category) {
      validationErrors.category = 'Category is required';
    }

    if (!eventDate) {
      validationErrors.eventDate = 'Start Date is required';
    }

    if (!startTime) {
      validationErrors.startTime = 'Start Time is required';
    }

    if (!endTime) {
      validationErrors.endTime = 'End Time is required';
    }

    if (venueSelection === 'chooseForMe' && !capacity) {
      validationErrors.capacity = 'Capacity is required';
    }

    if (venueSelection === 'searchVenue' && !building) {
      validationErrors.building = 'Preferred Building is required';
    }

    if (repeatOption === 'every' && selectedFrequency === 'none') {
      validationErrors.selectedFrequency = 'Repeat Interval is required';
    }

    if (repeatOption === 'every' && !repeatUntil) {
      validationErrors.repeatUntil = 'Repeat Until is required';
    }

    if (!selectedRoom) {
      validationErrors.selectedRoom = 'Venue is required';
    }

    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const formData = {
      date: eventDate,
      eventName,
      eventDate,
      startTime,
      endTime,
      venueId: selectedRoom,
      repeatFrequency: adjustedRepeatFrequency,
      repeatUntil: repeatOption === 'every' ? repeatUntil : null,
    };

    createBooking(formData);
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
        <EventDetails
          error={error}
          category={category}
          setCategory={setCategory}
          setEventName={setEventName}
        />
        <EventDateTime
          setEventDate={setEventDate}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          error={error}
        />
        <EventFrequency
          repeatUntil={repeatUntil}
          setRepeatUntil={setRepeatUntil}
          selectedFrequency={selectedFrequency}
          setSelectedFrequency={setSelectedFrequency}
          repeatOption={repeatOption}
          setRepeatOption={setRepeatOption}
          error={error}
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
          error={error}
        />
        <FormButtons handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Paper>
    </Box>
  );
};

export default BookVenueForm;
