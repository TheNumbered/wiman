// routes/booking-routes.js
import express from 'express';
import {
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} from '../controllers/booking-controller.js';
import { authUser } from '../middlewares/auth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authUser);

// Fetch all bookings
router.get('/bookings', getAllBookings);

// Cancel a booking
router.put('/bookings/:id/cancel', cancelBooking);

// Update booking status
router.put('/bookings/:id/status', updateBookingStatus);

export default router;
