import Booking from '../models/bookings-model.js';

<<<<<<< HEAD
=======
// Fetch all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

>>>>>>> 71525938d0135bf94f0922f8b4d147a80aa72480
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
    const { date, startTime, endTime, venueId, eventName, repeatFrequency, repeatUntil } = req.body;
    let userId = req.auth?.userId || 'api_user';
    console.log(userId, date, startTime, endTime, venueId, eventName, repeatFrequency, repeatUntil);

    if (!date || !startTime || !endTime || !eventName || !venueId) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    await Booking.createBooking(
      userId,
      date,
      startTime,
      endTime,
      venueId,
      eventName,
      repeatFrequency,
      repeatUntil,
    );
    res.status(201).json({ message: 'Booking created' });
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
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
