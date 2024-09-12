// controllers/booking-controller.js
import Booking from '../models/booking-model.js';

// Fetch all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  const { id } = req.params;
  const { reasonForCancellation } = req.body;

  try {
    await Booking.cancelBooking(id, reasonForCancellation);

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).send('Booking not found');
    }

    res.json(booking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).send('Error cancelling booking');
  }
};

// Update booking status from active to inactive
export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Booking.updateBookingStatus(id, status);
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).send('Booking not found');
    }

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).send('Error updating booking status');
  }
};
