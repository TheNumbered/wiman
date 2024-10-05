import csvParser from 'csv-parser';
import { isAfter, isBefore, isDate } from 'date-fns';
import fs from 'fs';
import Booking from '../models/bookings-model.js';
import { onBookingCancelled, onBookingConfirmed } from './push-notifications-controller.js';
// Fetch all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bookings
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.auth;
    const bookings = await Booking.getBookingsByUserId(userId);

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for this user' });
    }

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      date,
      startTime,
      endTime,
      venueId,
      eventName,
      repeatFrequency,
      repeatUntil,
      reminderTimeInMinutes,
    } = req.body;
    let userId = req.auth?.userId || 'api_user';

    if (!date || !startTime || !endTime || !eventName || !venueId) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    if (!isDate(new Date(date))) {
      throw new Error('Invalid date format');
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (!isDate(start) || !isDate(end)) {
      throw new Error('Invalid time format');
    }

    if (isAfter(start, end)) {
      throw new Error('Start time must be before end time');
    }

    if (repeatFrequency && repeatUntil) {
      const repeatUntilDate = new Date(repeatUntil);
      if (!isDate(repeatUntilDate)) {
        throw new Error('Invalid repeatUntil date format');
      }

      if (isBefore(repeatUntilDate, new Date(date))) {
        throw new Error('repeatUntil must be after the initial booking date');
      }
    }

    let nextReminder = null;
    if (userId !== 'api_user') {
      const bookingDateTime = new Date(`${date}T${startTime}`);
      const reminderTime = Number.isInteger(reminderTimeInMinutes) ? reminderTimeInMinutes : 15;
      nextReminder = new Date(bookingDateTime.getTime() - reminderTime * 60 * 1000);
    }
    const bookingId = await Booking.createBooking(
      userId,
      date,
      startTime,
      endTime,
      venueId,
      eventName,
      repeatFrequency,
      repeatUntil,
      nextReminder,
    );
    res.status(201).json({ message: 'Booking created', bookingId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get booking status
export const getBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }
    const status = await Booking.getBookingStatus(id);

    if (!status) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }
    const { reasonForCancellation } = req.body;
    await Booking.cancelBooking(id, reasonForCancellation);
    // Send notification to the user
    onBookingCancelled(id, reasonForCancellation);
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Confirm a booking
export const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }
    await Booking.confirmBooking(id);
    onBookingConfirmed(id);
    res.status(200).json({ message: 'Booking confirmed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CSV Upload Route
export const uploadCsvAndCreateBookings = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'CSV file is required' });
    }

    const bookings = [];

    // Read the uploaded CSV file
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (row) => {
        const { date, start_time, end_time, venue_id, event_name } = row;

        // Validate each row's required fields
        if (!date || !start_time || !end_time || !venue_id || !event_name) {
          throw new Error('Missing required fields in CSV');
        }

        // Convert to valid Date objects
        const start = new Date(`${date}T${start_time}`);
        const end = new Date(`${date}T${end_time}`);

        if (!isDate(start) || !isDate(end)) {
          throw new Error('Invalid time format in CSV');
        }

        if (isAfter(start, end)) {
          throw new Error('Start time must be before end time in CSV');
        }

        // Create a booking object to be inserted later
        bookings.push({
          userId: req.auth?.userId || 'api_user', // Auto-fill userId (from auth or default)
          date,
          startTime: start_time,
          endTime: end_time,
          venueId: venue_id,
          eventName: event_name,
          repeatFrequency: null, // Auto-filled (optional)
          repeatUntil: null, // Auto-filled (optional)
          nextReminder: null, // Auto-filled (optional)
          status: 'confirmed', // Auto-filled (optional)
        });
      })
      .on('end', async () => {
        try {
          // After reading the file, insert bookings
          const bookingIds = [];
          for (const booking of bookings) {
            const bookingId = await Booking.createBooking(
              booking.userId,
              booking.date,
              booking.startTime,
              booking.endTime,
              booking.venueId,
              booking.eventName,
              booking.repeatFrequency,
              booking.repeatUntil,
              booking.nextReminder,
              booking.status,
            );
            bookingIds.push(bookingId);
          }

          // Send response with booking IDs
          res.status(201).json({
            message: 'Bookings created successfully',
            bookingIds,
          });
        } catch (err) {
          console.error('Error creating bookings:', err.message);
          res.status(500).json({ error: err.message });
        }
      });
  } catch (err) {
    console.error('Error parsing CSV:', err.message);
    res.status(500).json({ error: err.message });
  }
};
