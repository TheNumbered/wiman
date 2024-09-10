import { Router } from 'express';
import {
  cancelBooking,
  createBooking,
  getActiveBookings,
  getPastBookings,
} from '../controllers/bookings-controller.js';
import { authRequest } from '../middleware/auth.js';

const router = Router();
router.use(authRequest);
router.get('/bookings/active', getActiveBookings);
router.get('/bookings/past', getPastBookings);
router.put('/bookings/cancel/:id', cancelBooking);
router.post('/bookings/new', createBooking);

export default router;
