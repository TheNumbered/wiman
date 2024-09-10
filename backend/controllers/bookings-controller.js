import Booking from '../models/bookings-model.js';

// Get active bookings
export const getActiveBookings = async (req, res) => {
  try {
    const { userId } = req.auth;
    const bookings = await Booking.getActiveBookingsByUserId(userId);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get past bookings
export const getPastBookings = async (req, res) => {
  try {
    const { userId } = req.auth;
    const bookings = await Booking.getPastBookingsByUserId(userId);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { userId, date, start_time, end_time, venue_id, purpose } = req.body;
    await Booking.createBooking(userId, date, start_time, end_time, venue_id, purpose);
    res.status(201).json({ message: 'Booking created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason_for_cancellation } = req.body;
    await Booking.cancelBooking(id, reason_for_cancellation);
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get booking status
export const getBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Booking.getBookingStatus(id);
    res.json({ status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
