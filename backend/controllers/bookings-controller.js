import Booking from '../models/bookings-model.js';

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createBooking = async (req, res) => {
  try {
    const { user_id, room_id, booking_date, start_time, end_time, venue_code, event_name, category, event_date, frequency, repeat_until } = req.body;
    await Booking.createBooking(user_id, room_id, booking_date, start_time, end_time, venue_code, event_name, category, event_date, frequency, repeat_until);
    res.status(201).json({ message: 'Booking created' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.getBookingById(id);
    res.json(booking);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getBookingByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const booking = await Booking.getBookingByUserId(user_id);
    res.json(booking);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getBookingByRoomId = async (req, res) => {
  try {
    const { room_id } = req.params;
    const booking = await Booking.getBookingByRoomId(room_id);
    res.json(booking);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.deleteBookingById(id);
    res.status(200).json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getBookingByDate = async (req, res) => {
  try {
    const { booking_date } = req.params;
    const booking = await Booking.getBookingByDate(booking_date);
    res.json(booking);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
