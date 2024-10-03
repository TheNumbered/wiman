import Booking from '../models/bookings-model.js';
import NotificationService from '../services/notification.js';

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
    const { date, startTime, endTime, venueId, eventName, repeatFrequency, repeatUntil } = req.body;
    let userId = req.auth?.userId || 'api_user';

    if (!date || !startTime || !endTime || !eventName || !venueId) {
      return res.status(400).json({ error: 'Required fields are missing' });
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

    try {
      if (reasonForCancellation) {
        const updatedBooking = await Booking.getBookingById(id);
        // Send notification to the user
        const notificationService = new NotificationService();
        const userId = updatedBooking.userId;
        const content = `Your booking for ${updatedBooking.eventName} has been cancelled, reason: ${reasonForCancellation}`;
        await notificationService.pushNotification({
          heading: 'Booking Cancelled',
          content,
          userIds: [userId], // Send to the specific user
        });
      }
    } catch (err) {
      console.log(err);
    }
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

    try {
      const updatedBooking = await Booking.getBookingById(id);
      // Send notification to the user
      const notificationService = new NotificationService();
      const userId = updatedBooking.userId;
      const content = `Your booking for event: ${updatedBooking.eventName} has been confirmed`;
      await notificationService.pushNotification({
        heading: 'Booking Confirmed',
        content,
        userIds: [userId], // Send to the specific user
      });
    } catch (err) {
      console.log(err);
    }

    res.status(200).json({ message: 'Booking confirmed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
