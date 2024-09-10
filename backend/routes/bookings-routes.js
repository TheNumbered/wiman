import { Router } from 'express';
import {
  cancelBooking,
  createBooking,
  getActiveBookings,
  getBookingStatus,
  getPastBookings,
} from '../controllers/bookings-controller.js';
import { authRequest, authUser } from '../middleware/auth.js';

const router = Router();
router.get('/user/bookings/active', authUser, getActiveBookings);
router.get('/user/bookings/past', authUser, getPastBookings);
router.put('/bookings/cancel/:id', authRequest, cancelBooking);
router.get('/bookings/status/:id', authRequest, getBookingStatus);
router.post('/bookings', authRequest, createBooking);

export default router;
