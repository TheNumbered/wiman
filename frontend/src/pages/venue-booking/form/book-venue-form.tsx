import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import EventDetails from './event-details';
import EventDateTime from './event-date-time';
import EventFrequency from './event-frequency';
import VenueSelection from './venue-selection';
import FormButtons from './form-buttons';
import { Venue } from '@/types';
import { format } from 'date-fns';
import { useUser } from '@clerk/clerk-react';
import { useCreateMutation } from '@/hooks';
import { useDebounce } from 'use-debounce';

export const BookVenueForm: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('once');
  const [repeatInterval, setRepeatInterval] = useState<number | ''>('');
  const [repeatUntil, setRepeatUntil] = useState<string | null>(null);
  const [venueSelection, setVenueSelection] = useState<string | null>('chooseForMe');
  const [capacity, setCapacity] = useState<number | ''>('');
  const [building, setBuilding] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<number | ''>('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenuesByCategory, setFilteredVenuesByCategory] = useState<Venue[]>([]);
  const [filteredVenuesByCapacity, setFilteredVenuesByCapacity] = useState<Venue[]>([]);
  const [filteredVenuesByBuilding, setFilteredVenuesByBuilding] = useState<Venue[]>([]);
  
  const [event_name, set_event_name] = useState<string>('');
  const [start_time, set_start_time] = useState<string>('');
  const [end_time, set_end_time] = useState<string>('');
  const [venue, set_venue] = useState<Venue>();
  const [event_date, set_event_date] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user } = useUser();

  const [debouncedCategory] = useDebounce(category, 300);
  const [debouncedCapacity] = useDebounce(capacity, 300);
  const [debouncedBuilding] = useDebounce(building, 300);

  const fetchVenues = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/venues');
      const data: Venue[] = await response.json();
      setVenues(data);
    } catch (error) {
      console.error('Failed to fetch venues:', error);
    }
  };

  const filterVenues = () => {
    const filtered = venues.filter(venue => venue.type === category);
    setFilteredVenuesByCategory(filtered);
  };

  const filterVenuesByCapacity = (capacity: number) => {
    let filtered = [];
    if (capacity === 50) {
      filtered = filteredVenuesByCategory.filter(venue => venue.venue_size <= 50);
    } else if (capacity === 100) {
      filtered = filteredVenuesByCategory.filter(venue => venue.venue_size > 50 && venue.venue_size <= 100);
    } else if (capacity === 200) {
      filtered = filteredVenuesByCategory.filter(venue => venue.venue_size > 100 && venue.venue_size <= 200);
    } else if (capacity === 300) {
      filtered = filteredVenuesByCategory.filter(venue => venue.venue_size > 200 && venue.venue_size <= 300);
    } else {
      filtered = filteredVenuesByCategory;
    }
    setFilteredVenuesByCapacity(filtered);
  };

  const filterVenuesByBuilding = (building: string) => {
    if (!building) {
      setFilteredVenuesByBuilding(filteredVenuesByCategory);
    } else {
      const filtered = filteredVenuesByCategory.filter(venue => venue.building_name === building);
      setFilteredVenuesByBuilding(filtered);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    if (debouncedCategory) {
      filterVenues();
    }
  }, [debouncedCategory, venues]);

  useEffect(() => {
    if (debouncedCapacity) {
      filterVenuesByCapacity(debouncedCapacity);
    } else {
      setFilteredVenuesByCapacity(filteredVenuesByCategory);
    }
  }, [debouncedCapacity, filteredVenuesByCategory]);

  useEffect(() => {
    if (debouncedBuilding) {
      filterVenuesByBuilding(debouncedBuilding);
    } else {
      setFilteredVenuesByBuilding(filteredVenuesByCategory);
    }
  }, [debouncedBuilding, filteredVenuesByCategory]);

  useEffect(() => {
    if (selectedRoom) {
      set_venue(getRoomById(selectedRoom));
    }
  }, [selectedRoom]);

  const formatDate = (date: Date) => {
    return format(new Date(date), 'yyyy-MM-dd');
  };

  const getRoomById = (roomId: number | "") => {
    return venues.find(venue => venue.room_id === roomId);
  };

  const setEventDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_event_date(e.target.value);
  };

  const setStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_start_time(e.target.value);
  };

  const setEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_end_time(e.target.value);
  };

  const validateForm = () => {
    if (!event_name || !event_date || !start_time || !end_time || !selectedRoom || !frequency || !category) {
      setValidationError('All fields are required');
      return false;
    }

    if (new Date(`1970-01-01T${start_time}:00`) >= new Date(`1970-01-01T${end_time}:00`)) {
      setValidationError('Start time must be before end time');
      return false;
    }

    setValidationError('');
    return true;
  };

  const mutation = useCreateMutation({
    resource: 'bookings',
    invalidateKeys: ['bookings'],
  });

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const room_id = selectedRoom;
    const booking_date = formatDate(new Date());
    const venue_code = venue?.venue_code;
    const user_id = user?.id;
    const repeat_until = frequency === 'once' ? null : repeatUntil;

    const formData = {
      event_name,
      user_id,
      room_id,
      venue_code,
      booking_date,
      event_date,
      start_time,
      end_time,
      category,
      frequency: frequency === 'once' ? 'once' : `${frequency} ${selectedDay}`,
      repeat_until,
    };

    try {
      await mutation.mutateAsync(formData);
      console.log('Booking successfully created');
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setEventName = (value: string) => {
    set_event_name(value);
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Book Venue</Typography>
      {validationError && <Typography color="error">{validationError}</Typography>}
      <EventDetails 
        category={category} 
        setCategory={setCategory} 
        setEventName={setEventName} 
      />
      <EventDateTime 
        setEventDate={setEventDate} 
        setStartTime={setStartTime} 
        setEndTime={setEndTime} 
      />
      <EventFrequency
        frequency={frequency}
        setFrequency={setFrequency}
        repeatInterval={repeatInterval}
        setRepeatInterval={setRepeatInterval}
        repeatUntil={repeatUntil}
        setRepeatUntil={setRepeatUntil}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <VenueSelection
        venueSelection={venueSelection}
        setVenueSelection={setVenueSelection}
        capacity={capacity}
        setCapacity={setCapacity}
        building={building}
        setBuilding={setBuilding}
        filteredVenuesByCapacity={filteredVenuesByCapacity}
        filteredVenuesByBuilding={filteredVenuesByBuilding}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        filterVenuesByBuilding={filterVenuesByBuilding}
      />
      <FormButtons 
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Paper>
  );
};
