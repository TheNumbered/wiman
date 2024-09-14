import { Router } from 'express';
import {
  cancelBooking,
  createBooking,
  getBookingStatus,
} from '../controllers/bookings-controller.js';
import { authRequest } from '../middleware/auth.js';

const router = Router();
router.use('/bookings', authRequest);
router.put('/bookings/cancel/:id', cancelBooking);
router.get('/bookings/status/:id', getBookingStatus);
router.post('/bookings', createBooking);
export default router;
